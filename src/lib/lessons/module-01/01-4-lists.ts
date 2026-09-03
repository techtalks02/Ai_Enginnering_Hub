import { DetailedLessonContent } from "../types";

export const lesson01_4: DetailedLessonContent = {
  chapterNumber: 4,
  categoryBadge: "Foundations · 12 min read · Beginner → Intermediate",
  subtitle:
    "Master Python lists, memory allocations, slicing techniques, and comprehension pipelines for RAG document chunking and batch token processing.",
  concept: {
    title: "1 · Concept: Dynamic Array Mechanics & Slicing",
    paragraphs: [
      "Python lists are dynamic arrays of contiguous memory pointers. In AI engineering, lists are the workhorse data structure for chunking large documents, aggregating embedding vectors, and managing multi-turn chat buffers.",
      "Mastering list comprehensions, slicing ([start:stop:step]), sorting with custom lambda keys, and batch generator windowing ensures fast in-memory document preparation."
    ]
  },
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "When indexing thousands of PDF pages for vector search, naive list operations (like quadratic nested loops or repeated concatenation) introduce severe latency bottlenecks.",
      "List slicing and comprehension pipelines allow you to chunk text with sliding token overlaps in sub-millisecond execution times."
    ]
  },
  architecture: {
    title: "3 · Architecture: Sliding Window Text Chunker Pipeline",
    flowSummary:
      "Raw Text String → Token List Split → Sliding Window Slicing (chunks with overlap) → Batch List Array → Vector Embedding Dispatch",
    flowSteps: [
      { step: "01", label: "Token Splitting", desc: "Break raw string into a list of word/token elements." },
      { step: "02", label: "Window Slicing", desc: "Generate list slices of chunk_size with overlap_step." },
      { step: "03", label: "List Comprehension", desc: "Clean and rejoin chunks into formatted text blocks." },
      { step: "04", label: "Batch Aggregation", desc: "Group chunks into batches for parallel embedding generation." }
    ],
    paragraphs: [
      "Dynamic array slicing enables memory-efficient sliding chunk windows without copying entire documents."
    ]
  },
  code: {
    title: "4 · Code: Sliding Window Chunking with List Comprehensions",
    before: {
      filename: "naive_chunking.py",
      language: "PYTHON",
      code: `# Inefficient string splitting with slow manual loops
def chunk_text(text, size):
    words = text.split()
    chunks = []
    current = []
    for w in words:
        current.append(w)
        if len(current) == size:
            chunks.append(" ".join(current))
            current = []
    return chunks`,
      problems: [
        "Does not support sliding window overlap between adjacent chunks (loses context at boundaries)",
        "Drops leftover words when the total word count is not a multiple of size",
        "Inefficient loop overhead compared to list slicing"
      ]
    },
    after: {
      filename: "production_chunker.py",
      language: "PYTHON",
      code: `from typing import List

def sliding_window_chunks(
    text: str,
    chunk_size: int = 100,
    overlap: int = 20
) -> List[str]:
    """Production list-based sliding window text chunker for RAG pipelines."""
    words = text.split()
    step = chunk_size - overlap
    
    # List comprehension with memory-efficient array slicing
    chunks = [
        " ".join(words[i : i + chunk_size])
        for i in range(0, len(words), step)
        if words[i : i + chunk_size]
    ]
    return chunks`,
      improvements: [
        "Sliding overlap guarantees preservation of semantic context across chunk boundaries",
        "List comprehension executes compiled C-speed loops with exact bounds",
        "Captures tail segments without dropping ending sentences"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Text Chunking Benchmarks",
    description: "Verify that list slicing produces overlapping chunks with zero data loss.",
    scenarios: [
      {
        name: "Standard Document (500 Words)",
        method: "PYTHON",
        endpoint: "sliding_window_chunks()",
        payload: '{"chunk_size": 100, "overlap": 20, "word_count": 500}',
        expectedStatus: 200,
        statusText: "SUCCESS",
        response: '{"total_chunks": 7, "avg_chunk_size": 100, "execution_ms": 0.4}',
        explanation: "Sliding window generated 7 overlapping chunks in 0.4 milliseconds."
      }
    ]
  },
  observe: {
    title: "6 · Observe: List Memory & Slicing Metrics",
    metrics: [
      { label: "Slicing Speed", value: "0.4ms / 500w", status: "good", note: "Optimized pointer slicing" },
      { label: "Context Retention", value: "100%", status: "good", note: "Overlapping boundaries" },
      { label: "Memory Overhead", value: "Minimal", status: "good", note: "String interning" },
      { label: "Tail Loss", value: "0 Words", status: "good", note: "Full capture" }
    ],
    logs: [
      { time: "00:00:00.001", level: "INFO", tag: "Chunker", message: "Tokenized document into 500 words." },
      { time: "00:00:00.002", level: "INFO", tag: "Chunker", message: "Emitted 7 sliding chunks with 20% overlap." }
    ]
  },
  production: {
    title: "7 · Production: List Processing Best Practices",
    rules: [
      { title: "Use List Comprehensions", description: "Prefer '[f(x) for x in items]' over manual append loops for data transformations.", impact: "Yields 2x-3x faster execution in CPython." },
      { title: "Include Chunk Overlap in RAG", description: "Always maintain 10-20% token overlap between consecutive document chunks.", impact: "Prevents semantic cutoff across sentence boundaries." },
      { title: "Pre-allocate or Batch Large Lists", description: "When processing millions of embeddings, batch list operations to avoid memory thrashing.", impact: "Eliminates GC pause spikes." }
    ]
  },
  challenge: {
    title: "8 · Challenge: Batch a Document List into Mini-Batches",
    prompt: "Write a function 'batch_list(items: list, batch_size: int = 16)' that yields or returns chunks of list items of size batch_size.",
    hint: "Use range(0, len(items), batch_size) and slice items[i : i + batch_size].",
    solutionCode: `def batch_list(items, batch_size=16):
    return [items[i : i + batch_size] for i in range(0, len(items), batch_size)]`
  },
  checklist: [
    { id: "c1", text: "Use list slicing [start:stop:step] for sliding window chunking", category: "Syntax" },
    { id: "c2", text: "Replace manual accumulator loops with list comprehensions", category: "Performance" },
    { id: "c3", text: "Implement batch chunk generators for vector database inserts", category: "RAG" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Why is chunk overlap essential when slicing documents for RAG systems?",
      options: [
        "It prevents key information or sentences from being cut off at arbitrary chunk boundaries, ensuring semantic coherence for retrieval.",
        "It increases the file size on disk.",
        "It deletes duplicate documents automatically.",
        "It encrypts the text with AES-256."
      ],
      correctIndex: 0,
      explanation: "Without overlap, a query matching a concept split across two chunks might fail to retrieve the full context."
    }
  ],
  skillsCount: 5,
  sectionsCount: 11,
  technologies: ["Python", "Lists", "Slicing", "Chunking", "RAG"],
  updatedDate: "2025-01-14"
};
