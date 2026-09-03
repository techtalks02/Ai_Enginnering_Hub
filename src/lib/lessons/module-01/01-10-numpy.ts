import { DetailedLessonContent } from "../types";

export const lesson01_10: DetailedLessonContent = {
  chapterNumber: 10,
  categoryBadge: "Foundations · 11 min read · Beginner → Intermediate",
  subtitle:
    "Master NumPy ndarrays, vectorized broadcasting, contiguous C-memory layouts, and cosine similarity calculations for lightning-fast vector search.",
  concept: {
    title: "1 · Concept: Contiguous Memory & SIMD Vectorization",
    paragraphs: [
      "Standard Python lists store pointers to individual Python objects scattered in heap memory. NumPy ndarrays store homogeneous, contiguous blocks of C data (e.g. float32), enabling CPU SIMD (Single Instruction, Multiple Data) parallel vector math.",
      "In AI systems, high-dimensional embedding vectors (e.g. 1536-dim vectors from OpenAI text-embedding-3) are manipulated using NumPy matrix multiplications and vectorized cosine similarity calculations."
    ]
  },
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "Calculating cosine similarity across 100,000 document embeddings using a Python for-loop takes several seconds. With vectorized NumPy matrix operations (dot product + norm broadcasting), the same computation executes in under 5 milliseconds."
    ]
  },
  architecture: {
    title: "3 · Architecture: Vector Search Similarity Engine",
    flowSummary:
      "Query Vector (1, D) → Embedding Matrix (N, D) → Vectorized Dot Product → Norm Broadcasting → Top-K Cosine Score Ranking",
    flowSteps: [
      { step: "01", label: "Contiguous Array", desc: "Stack N document embeddings into a 2D float32 NumPy array." },
      { step: "02", label: "Vectorized Dot Product", desc: "Execute matrix multiply np.dot(matrix, query_vec) using BLAS/LAPACK C libraries." },
      { step: "03", label: "Norm Broadcasting", desc: "Divide by L2 norms across axis=1 using vectorized broadcasting." },
      { step: "04", label: "Argpartition Top-K", desc: "Extract top-K highest similarity indices in O(N) time with np.argpartition." }
    ],
    paragraphs: [
      "SIMD vectorization executes 50x-100x faster than pure Python iteration."
    ]
  },
  code: {
    title: "4 · Code: Vectorized Cosine Similarity Matrix Search",
    before: {
      filename: "naive_similarity.py",
      language: "PYTHON",
      code: `# Slow pure Python loops for calculating vector similarity
import math

def slow_cosine_sim(query_vec, doc_vectors):
    scores = []
    for doc in doc_vectors: # Inefficient O(N) Python loop
        dot = sum(q * d for q, d in zip(query_vec, doc))
        norm_q = math.sqrt(sum(q * q for q in query_vec))
        norm_d = math.sqrt(sum(d * d for d in doc))
        scores.append(dot / (norm_q * norm_d))
    return scores`,
      problems: [
        "Iterates over elements using slow interpreted Python bytecode",
        "Lacks hardware SIMD CPU vectorization",
        "Suffers massive garbage collection and pointer indirection overhead"
      ]
    },
    after: {
      filename: "production_numpy_search.py",
      language: "PYTHON",
      code: `import numpy as np

def vectorized_cosine_similarity(
    query_vector: np.ndarray,
    document_matrix: np.ndarray,
    top_k: int = 5
) -> tuple[np.ndarray, np.ndarray]:
    """Production SIMD vectorized cosine similarity matrix search."""
    # Ensure float32 contiguous arrays
    q = np.asarray(query_vector, dtype=np.float32)
    docs = np.asarray(document_matrix, dtype=np.float32)
    
    # 1. Compute dot products: (N, D) x (D,) -> (N,)
    dot_products = np.dot(docs, q)
    
    # 2. Compute L2 norms with broadcasting
    q_norm = np.linalg.norm(q)
    doc_norms = np.linalg.norm(docs, axis=1)
    
    # 3. Vectorized cosine score calculation (with epsilon guard)
    scores = dot_products / (doc_norms * q_norm + 1e-9)
    
    # 4. Fast Top-K selection using argpartition (O(N))
    top_indices = np.argpartition(scores, -top_k)[-top_k:]
    sorted_top = top_indices[np.argsort(-scores[top_indices])]
    
    return sorted_top, scores[sorted_top]`,
      improvements: [
        "Contiguous C-level memory execution delivers 50x-100x speedups",
        "np.argpartition extracts top-K matches in O(N) instead of O(N log N) full sorting",
        "Broadcasting computes batch norms across thousands of vectors in parallel"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Vector Search Speed Benchmark",
    description: "Compare pure Python loops vs NumPy vectorization on 50,000 embedding vectors.",
    scenarios: [
      {
        name: "Vectorized Search (50,000 Docs x 1536-dim)",
        method: "PYTHON",
        endpoint: "vectorized_cosine_similarity()",
        payload: '{"doc_count": 50000, "dim": 1536, "top_k": 5}',
        expectedStatus: 200,
        statusText: "FAST_MATCH",
        response: '{"top_indices": [1402, 9821, 412], "latency_ms": 3.8, "speedup": "82x"}',
        explanation: "NumPy SIMD execution scanned 50,000 1536-dim embeddings in only 3.8ms."
      }
    ]
  },
  observe: {
    title: "6 · Observe: NumPy Vectorization Telemetry",
    metrics: [
      { label: "Search Latency", value: "3.8ms / 50k", status: "good", note: "SIMD parallelized" },
      { label: "Speedup vs Loop", value: "82x Faster", status: "good", note: "Compiled C kernels" },
      { label: "Memory Layout", value: "C-Contiguous", status: "good", note: "Float32 packed" },
      { label: "Top-K Complexity", value: "O(N)", status: "good", note: "Via argpartition" }
    ],
    logs: [
      { time: "00:00:00.001", level: "INFO", tag: "NumPyEngine", message: "Allocated contiguous matrix (50,000, 1536) float32." },
      { time: "00:00:00.005", level: "INFO", tag: "NumPyEngine", message: "Completed dot product matrix multiplication in 3.8ms." }
    ]
  },
  production: {
    title: "7 · Production: NumPy Guidelines for AI",
    rules: [
      { title: "Use Float32 for Embeddings", description: "Store embedding vectors as float32 instead of default float64.", impact: "Cuts RAM usage by 50% with zero noticeable loss in retrieval accuracy." },
      { title: "Use np.argpartition for Top-K", description: "Avoid full np.argsort when you only need top-K items.", impact: "Reduces sorting time from O(N log N) to linear O(N)." }
    ]
  },
  challenge: {
    title: "8 · Challenge: Normalize an Embedding Matrix",
    prompt: "Write a function 'normalize_embeddings(matrix: np.ndarray) -> np.ndarray' that normalizes each row vector to unit length (L2 norm = 1.0).",
    hint: "Calculate norms with np.linalg.norm(matrix, axis=1, keepdims=True) and divide matrix by norms.",
    solutionCode: `import numpy as np

def normalize_embeddings(matrix: np.ndarray) -> np.ndarray:
    norms = np.linalg.norm(matrix, axis=1, keepdims=True)
    return matrix / np.maximum(norms, 1e-9)`
  },
  checklist: [
    { id: "c1", text: "Store embedding vectors in C-contiguous float32 NumPy arrays", category: "Performance" },
    { id: "c2", text: "Use matrix multiplication np.dot for parallel similarity search", category: "Vector Search" },
    { id: "c3", text: "Use np.argpartition for fast O(N) top-K retrieval ranking", category: "Algorithms" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Why is NumPy matrix multiplication significantly faster than a pure Python 'for' loop?",
      options: [
        "NumPy executes vectorized operations using compiled C libraries (BLAS/LAPACK) and CPU SIMD instructions on contiguous memory buffers.",
        "NumPy uploads data to quantum servers.",
        "Python loops delete unneeded numbers.",
        "NumPy converts all data to string format."
      ],
      correctIndex: 0,
      explanation: "Contiguous memory layout and hardware-level SIMD instructions execute operations in parallel without Python interpreter overhead."
    }
  ],
  skillsCount: 6,
  sectionsCount: 11,
  technologies: ["Python", "NumPy", "Vector Search", "Cosine Similarity", "SIMD"],
  updatedDate: "2025-01-14"
};
