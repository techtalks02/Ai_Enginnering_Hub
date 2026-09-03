import { DetailedLessonContent } from "../types";

export const lesson01_5: DetailedLessonContent = {
  chapterNumber: 5,
  categoryBadge: "Foundations · 14 min read · Beginner → Intermediate",
  subtitle:
    "Leverage immutable tuples and NamedTuples for thread-safe model configurations, fixed coordinate representations, and hashable dictionary keys.",
  concept: {
    title: "1 · Concept: Immutability, NamedTuples & Performance",
    paragraphs: [
      "Tuples are fixed-size, immutable sequences in Python. Because their contents cannot be altered after instantiation, they are memory-compact, faster to allocate than lists, and natively hashable.",
      "In AI applications, tuples and typing.NamedTuple are ideal for representing static coordinates, fixed LLM hyperparameter configurations, and multi-part dictionary cache keys."
    ]
  },
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "Mutable configurations passed across asynchronous worker threads risk accidental mutation (race conditions). Using immutable NamedTuples guarantees config integrity across distributed agents."
    ]
  },
  architecture: {
    title: "3 · Architecture: Thread-Safe Model Config & Cache Keys",
    flowSummary:
      "Immutable NamedTuple Config → Multi-Threaded Agent Workers → Semantic Cache Key (Hashable Tuple) → Cache Hit / Dispatch",
    flowSteps: [
      { step: "01", label: "Immutable Config", desc: "Instantiate typed ModelConfig(model, temp, max_tokens)." },
      { step: "02", label: "Hashable Cache Key", desc: "Form composite tuple key (prompt_hash, temperature, model_name)." },
      { step: "03", label: "Thread Dispatch", desc: "Pass config safely to multiple concurrent async workers." },
      { step: "04", label: "Cache Resolution", desc: "Lookup exact match in memory with O(1) hash resolution." }
    ],
    paragraphs: [
      "Immutability guarantees that worker threads cannot tamper with hyperparameters during active inference."
    ]
  },
  code: {
    title: "4 · Code: NamedTuple Configuration & Cache Keying",
    before: {
      filename: "mutable_config.py",
      language: "PYTHON",
      code: `# Mutable dict config vulnerable to race condition mutations
config = {"model": "gpt-4o", "temperature": 0.7}

def worker_a(cfg):
    cfg["temperature"] = 0.0 # Accidental mutation modifies global config!`,
      problems: [
        "Dictionaries can be mutated unexpectedly across threads",
        "Cannot use mutable dicts or lists as keys in caching dictionaries"
      ]
    },
    after: {
      filename: "production_namedtuple.py",
      language: "PYTHON",
      code: `from typing import NamedTuple

class ModelConfig(NamedTuple):
    model: str
    temperature: float
    max_tokens: int

# Immutable, hashable, and self-documenting
config = ModelConfig(model="gpt-4o", temperature=0.7, max_tokens=2048)

# Can safely be used as a composite cache key
cache = {}
cache_key = ("What is RAG?", config.model, config.temperature)
cache[cache_key] = "Cached explanation..."`,
      improvements: [
        "Immutable fields prevent accidental mutation during concurrent execution",
        "NamedTuple fields support dot notation with full IDE autocomplete",
        "Tuples can be used as keys in Python dictionaries for semantic caching"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Immutability Verification & Caching",
    description: "Verify that NamedTuples enforce immutability and resolve cache hits accurately.",
    scenarios: [
      {
        name: "Cache Hit Resolution",
        method: "PYTHON",
        endpoint: "cache.get()",
        payload: '{"key": ["What is RAG?", "gpt-4o", 0.7]}',
        expectedStatus: 200,
        statusText: "CACHE_HIT",
        response: '{"content": "Cached explanation...", "latency_ms": 0.01}',
        explanation: "Composite tuple key provided instant O(1) in-memory cache lookup."
      }
    ]
  },
  observe: {
    title: "6 · Observe: Tuple Memory & Allocation Metrics",
    metrics: [
      { label: "Allocation Speed", value: "3x Faster than List", status: "good", note: "Fixed allocation" },
      { label: "Immutability", value: "100% Enforced", status: "good", note: "Zero side effects" },
      { label: "Hashable", value: "Yes", status: "good", note: "Valid dict key" },
      { label: "Memory Footprint", value: "48 Bytes", status: "good", note: "Minimal overhead" }
    ],
    logs: [
      { time: "00:00:00.001", level: "INFO", tag: "Config", message: "Created immutable ModelConfig(gpt-4o, 0.7, 2048)." },
      { time: "00:00:00.002", level: "INFO", tag: "Cache", message: "Registered composite tuple cache key." }
    ]
  },
  production: {
    title: "7 · Production: Tuple Best Practices",
    rules: [
      { title: "Use NamedTuples for Configurations", description: "Prefer NamedTuple or frozen dataclasses for fixed system settings.", impact: "Guarantees thread-safety." },
      { title: "Use Tuples for Composite Cache Keys", description: "Tuples are hashable and can be used directly as dictionary keys.", impact: "Enables multi-parameter LLM caching." }
    ]
  },
  challenge: {
    title: "8 · Challenge: Build a Cache Key Generator Function",
    prompt: "Write a function 'make_cache_key(prompt: str, model: str, temp: float) -> tuple' that returns a normalized tuple key.",
    hint: "Strip and lowercase the prompt, and return (prompt.strip().lower(), model, round(temp, 2)).",
    solutionCode: `def make_cache_key(prompt: str, model: str, temp: float) -> tuple:
    return (prompt.strip().lower(), model.strip(), round(temp, 2))`
  },
  checklist: [
    { id: "c1", text: "Use immutable tuples for multi-part dictionary cache keys", category: "Caching" },
    { id: "c2", text: "Define NamedTuples for typed, self-documenting configurations", category: "Typing" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Why can a tuple be used as a dictionary key, while a list cannot?",
      options: [
        "Tuples are immutable and therefore hashable; lists are mutable and unhashable.",
        "Tuples only contain strings.",
        "Lists cannot store numbers.",
        "Dictionaries only accept tuples."
      ],
      correctIndex: 0,
      explanation: "Dictionary keys require a constant hash value throughout their lifetime. Immutability guarantees that tuples maintain a static hash."
    }
  ],
  skillsCount: 4,
  sectionsCount: 11,
  technologies: ["Python", "Tuples", "NamedTuples", "Immutability", "Caching"],
  updatedDate: "2025-01-14"
};
