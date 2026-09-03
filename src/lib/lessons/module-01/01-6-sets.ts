import { DetailedLessonContent } from "../types";

export const lesson01_6: DetailedLessonContent = {
  chapterNumber: 6,
  categoryBadge: "Foundations · 16 min read · Beginner → Intermediate",
  subtitle:
    "Master sets, hash-based membership lookups, and set mathematical operations for token deduplication, vocabulary indexing, and keyword intersection in RAG.",
  concept: {
    title: "1 · Concept: Hash Set Mechanics & Set Algebra",
    paragraphs: [
      "Sets are unordered collections of unique, hashable elements. Under the hood, Python sets are implemented as hash tables with dummy values, providing average O(1) time complexity for membership testing ('x in s'), additions, and deletions.",
      "In AI applications, set operations (union, intersection, difference, symmetric difference) are heavily utilized for deduplicating retrieved document IDs, computing Jaccard similarity between texts, and filtering out stop words."
    ]
  },
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "Checking whether a document ID has already been visited or retrieved is a common task in multi-step agent graphs and web crawlers. Checking 'id in list' is O(N), which slows down quadratically; checking 'id in set' is O(1)."
    ]
  },
  architecture: {
    title: "3 · Architecture: Multi-Source RAG Deduplication Engine",
    flowSummary:
      "Multiple Retrieval Sources (Vector DB / BM25 / Keyword) → Retrieved Doc ID Stream → Hash Set Filter (O(1) Uniqueness) → Deduplicated Context Assembly",
    flowSteps: [
      { step: "01", label: "Multi-Source Retrieval", desc: "Collect candidate document IDs from hybrid vector and keyword search." },
      { step: "02", label: "Set Intersection/Union", desc: "Filter duplicate IDs and prioritize documents appearing in both sets." },
      { step: "03", label: "Seen Document Guard", desc: "Maintain a global seen_docs set to prevent repetitive LLM context." },
      { step: "04", label: "Deduplicated Context", desc: "Pass clean unique text documents into prompt construction." }
    ],
    paragraphs: [
      "Set operations prevent duplicate documents from wasting valuable LLM context window tokens."
    ]
  },
  code: {
    title: "4 · Code: Fast Token Deduplication & Jaccard Similarity",
    before: {
      filename: "naive_dedup.py",
      language: "PYTHON",
      code: `# Slow O(N^2) list-based deduplication
def deduplicate_docs(doc_list):
    unique = []
    for doc in doc_list:
        if doc not in unique: # Slow O(N) scan inside loop!
            unique.append(doc)
    return unique`,
      problems: [
        "O(N^2) time complexity causes noticeable lag on large document collections",
        "Manual accumulator pattern is verbose and slow"
      ]
    },
    after: {
      filename: "production_set_operations.py",
      language: "PYTHON",
      code: `from typing import List, Set

def fast_deduplicate_preserve_order(doc_ids: List[str]) -> List[str]:
    """Fast O(N) deduplication preserving initial discovery ranking."""
    seen: Set[str] = set()
    return [d for d in doc_ids if not (d in seen or seen.add(d))]

def jaccard_similarity(query_tokens: List[str], doc_tokens: List[str]) -> float:
    """Compute exact Jaccard similarity via set intersection & union."""
    set_a, set_b = set(query_tokens), set(doc_tokens)
    intersection = set_a.intersection(set_b)
    union = set_a.union(set_b)
    return len(intersection) / len(union) if union else 0.0`,
      improvements: [
        "O(1) hash set membership check reduces deduplication time from O(N^2) to O(N)",
        "Set mathematical operations compute Jaccard keyword overlap with minimal code"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Set Operations & Jaccard Overlap",
    description: "Evaluate speedups and lexical similarity calculations using Python sets.",
    scenarios: [
      {
        name: "Document ID Deduplication (10,000 IDs)",
        method: "PYTHON",
        endpoint: "fast_deduplicate()",
        payload: '{"total_ids": 10000, "unique_ids": 2500}',
        expectedStatus: 200,
        statusText: "SUCCESS",
        response: '{"unique_count": 2500, "execution_ms": 1.1}',
        explanation: "Processed 10,000 document IDs in 1.1ms with O(1) hash set checks."
      }
    ]
  },
  observe: {
    title: "6 · Observe: Set Lookup & Membership Metrics",
    metrics: [
      { label: "Lookup Time", value: "O(1) Average", status: "good", note: "Hash table indexing" },
      { label: "Dedup Speedup", value: "85x vs List", status: "good", note: "Linear scaling" },
      { label: "Context Saved", value: "35% Tokens", status: "good", note: "Duplicates removed" },
      { label: "Memory Type", value: "Hash Table", status: "good", note: "Dynamic resizing" }
    ],
    logs: [
      { time: "00:00:00.001", level: "INFO", tag: "SetFilter", message: "Deduplicated 10,000 candidate IDs into 2,500 unique entries." }
    ]
  },
  production: {
    title: "7 · Production: Set Best Practices",
    rules: [
      { title: "Use Sets for Membership Testing", description: "Whenever you frequently check 'if item in collection', use a set or dict instead of a list.", impact: "Transforms O(N) bottlenecks into O(1) instantaneous lookups." },
      { title: "Use Set Algebra for Filtering", description: "Use s1 - s2 to remove stop words or unapproved domains in one line.", impact: "Improves readability and execution speed." }
    ]
  },
  challenge: {
    title: "8 · Challenge: Calculate Keyword Overlap Ratio",
    prompt: "Write a function 'keyword_overlap(keywords_a: list, keywords_b: list) -> float' that returns the fraction of keywords in a that also appear in b.",
    hint: "Convert both to sets and calculate len(set_a & set_b) / len(set_a).",
    solutionCode: `def keyword_overlap(keywords_a, keywords_b):
    set_a, set_b = set(keywords_a), set(keywords_b)
    if not set_a:
        return 0.0
    return len(set_a & set_b) / len(set_a)`
  },
  checklist: [
    { id: "c1", text: "Replace list lookups with set membership for O(1) performance", category: "Performance" },
    { id: "c2", text: "Use set intersection (&) and union (|) for text filtering", category: "RAG" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What is the average time complexity of checking 'x in my_set' in Python?",
      options: ["O(1)", "O(N)", "O(N^2)", "O(log N)"],
      correctIndex: 0,
      explanation: "Sets utilize hash tables under the hood, enabling average O(1) constant-time membership lookups."
    }
  ],
  skillsCount: 4,
  sectionsCount: 11,
  technologies: ["Python", "Sets", "Hash Tables", "Deduplication", "Jaccard Similarity"],
  updatedDate: "2025-01-14"
};
