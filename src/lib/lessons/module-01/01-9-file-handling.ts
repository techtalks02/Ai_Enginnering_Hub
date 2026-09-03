import { DetailedLessonContent } from "../types";

export const lesson01_9: DetailedLessonContent = {
  chapterNumber: 9,
  categoryBadge: "Foundations · 16 min read · Beginner → Intermediate",
  subtitle:
    "Master memory-mapped file streams, JSONL dataset ingestion, context managers, and pathlib for scalable RAG knowledge base loaders.",
  concept: {
    title: "1 · Concept: Streaming I/O & Safe Context Managers",
    paragraphs: [
      "AI pipelines constantly load multi-gigabyte datasets, read JSONL fine-tuning logs, and write vector checkpoints. Reading entire 10GB files into memory with f.read() crashes servers with Out-Of-Memory (OOM) fatal errors.",
      "By using Python context managers ('with open()') and generator line-by-line stream iterators, you can process terabytes of data with a constant, minimal RAM footprint."
    ]
  },
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "RAG document ingestion jobs run as background workers. Failing to close file descriptors causes OS resource leaks, while loading large documents all at once spikes cloud server RAM costs."
    ]
  },
  architecture: {
    title: "3 · Architecture: Streaming JSONL Dataset Ingestion Pipeline",
    flowSummary:
      "Large JSONL File on Disk → Generator Stream Iterator → Streaming JSON Parser → Batch Chunker → Memory-Bounded Vector DB Upsert",
    flowSteps: [
      { step: "01", label: "Pathlib Validation", desc: "Validate file existence and permissions with modern pathlib.Path." },
      { step: "02", label: "Generator Stream", desc: "Yield lines one-by-one with zero full-file RAM buffering." },
      { step: "03", label: "Batch Aggregator", desc: "Collect items into mini-batches of 100 records for embedding." },
      { step: "04", label: "Auto Cleanup", desc: "Context manager guarantees automatic closing of OS file handles." }
    ],
    paragraphs: [
      "Generator streaming maintains flat 25MB RAM usage regardless of whether the dataset is 100MB or 50GB."
    ]
  },
  code: {
    title: "4 · Code: Streaming JSONL Reader vs Memory-Heavy Read",
    before: {
      filename: "naive_file_loader.py",
      language: "PYTHON",
      code: `# Danger: Loads 10GB dataset completely into memory at once!
import json

def load_dataset(filepath):
    f = open(filepath, "r") # Leak risk if exception occurs!
    data = json.load(f)      # OOM crash on large files!
    return data`,
      problems: [
        "Crashes with MemoryError when dataset size exceeds available RAM",
        "Does not use a context manager ('with' statement), leaking OS file descriptors on errors"
      ]
    },
    after: {
      filename: "production_streaming_loader.py",
      language: "PYTHON",
      code: `import json
from pathlib import Path
from typing import Iterator, Dict, Any, List

def stream_jsonl_dataset(filepath: Path) -> Iterator[Dict[str, Any]]:
    """Yields parsed JSON objects line-by-line with constant O(1) memory usage."""
    if not filepath.exists():
        raise FileNotFoundError(f"Dataset path not found: {filepath}")
        
    with filepath.open("r", encoding="utf-8") as file_stream:
        for line_num, line in enumerate(file_stream, start=1):
            clean_line = line.strip()
            if not clean_line:
                continue
            try:
                yield json.loads(clean_line)
            except json.JSONDecodeError as e:
                print(f"Skipping corrupt record at line {line_num}: {e}")

def batch_stream(stream: Iterator[Any], batch_size: int = 100) -> Iterator[List[Any]]:
    """Groups streaming records into memory-bounded batches for vector indexing."""
    batch = []
    for item in stream:
        batch.append(item)
        if len(batch) >= batch_size:
            yield batch
            batch = []
    if batch:
        yield batch`,
      improvements: [
        "Generator streaming consumes fixed ~20MB RAM regardless of dataset file size",
        "Context manager guarantees automatic file handle cleanup even on unexpected exceptions",
        "Pathlib provides cross-platform safe filesystem paths"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Streaming Ingestion Memory Profiling",
    description: "Verify that streaming large JSONL files keeps server memory consumption flat.",
    scenarios: [
      {
        name: "Streaming Ingestion (100,000 Records)",
        method: "PYTHON",
        endpoint: "stream_jsonl_dataset()",
        payload: '{"total_records": 100000, "file_size_mb": 450}',
        expectedStatus: 200,
        statusText: "STREAM_SUCCESS",
        response: '{"processed_records": 100000, "peak_memory_mb": 22.4, "execution_sec": 1.8}',
        explanation: "Processed 450MB dataset with only 22.4MB peak memory utilization."
      }
    ]
  },
  observe: {
    title: "6 · Observe: File I/O & Memory Telemetry",
    metrics: [
      { label: "Memory Usage", value: "22.4 MB Flat", status: "good", note: "O(1) streaming" },
      { label: "Throughput", value: "55,000 rec/s", status: "good", note: "C-speed JSON parsing" },
      { label: "File Leaks", value: "0 Open Handles", status: "good", note: "Context manager safety" },
      { label: "Path Safety", value: "Pathlib Typed", status: "good", note: "Cross-platform" }
    ],
    logs: [
      { time: "00:00:00.001", level: "INFO", tag: "DataLoader", message: "Opened stream to knowledge_base.jsonl." },
      { time: "00:00:01.800", level: "INFO", tag: "DataLoader", message: "Streamed 100,000 records successfully; closed file." }
    ]
  },
  production: {
    title: "7 · Production: File Handling Guidelines",
    rules: [
      { title: "Always Use Context Managers", description: "Never use bare open() without a 'with' statement.", impact: "Guarantees file handle cleanup and prevents OS socket/file exhaustion." },
      { title: "Use Generators for Large Datasets", description: "Stream JSONL and CSV files line by line using 'yield'.", impact: "Eliminates Out-Of-Memory production downtime." }
    ]
  },
  challenge: {
    title: "8 · Challenge: Count Non-Empty Lines in a File Stream",
    prompt: "Write a generator function 'stream_lines(file_path: Path)' that yields non-empty stripped lines from a file using a context manager.",
    hint: "Use with file_path.open('r') as f and yield line.strip() when line.strip() is not empty.",
    solutionCode: `from pathlib import Path

def stream_lines(file_path: Path):
    with file_path.open("r", encoding="utf-8") as f:
        for line in f:
            stripped = line.strip()
            if stripped:
                yield stripped`
  },
  checklist: [
    { id: "c1", text: "Encapsulate all file operations within 'with open()' context managers", category: "Safety" },
    { id: "c2", text: "Use generator iterators (yield) for large JSONL and text file ingestion", category: "Performance" },
    { id: "c3", text: "Use pathlib.Path for cross-platform directory navigation", category: "Best Practice" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Why should large dataset files in AI pipelines be read with generator stream iterators instead of f.read()?",
      options: [
        "Generator streams read data line-by-line with constant O(1) memory usage, preventing Out-Of-Memory server crashes on multi-gigabyte files.",
        "f.read() only works with MP3 audio files.",
        "Generators compile the file into machine code.",
        "Generators automatically translate English to Spanish."
      ],
      correctIndex: 0,
      explanation: "Streaming yields one record at a time, keeping RAM consumption constant regardless of file size."
    }
  ],
  skillsCount: 5,
  sectionsCount: 11,
  technologies: ["Python", "File Handling", "Generators", "JSONL", "Pathlib"],
  updatedDate: "2025-01-14"
};
