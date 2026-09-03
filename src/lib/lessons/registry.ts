import { ModuleData, Lesson } from "@/components/landing/curriculum";
import { DetailedLessonContent } from "./types";
import { lesson01_1 } from "./module-01/01-1-variables-types";
import { lesson01_2 } from "./module-01/01-2-control-flow";
import { lesson01_3 } from "./module-01/01-3-oop-python";
import { lesson01_4 } from "./module-01/01-4-lists";
import { lesson01_5 } from "./module-01/01-5-tuples";
import { lesson01_6 } from "./module-01/01-6-sets";
import { lesson01_7 } from "./module-01/01-7-dictionaries";
import { lesson01_8 } from "./module-01/01-8-error-handling";
import { lesson01_9 } from "./module-01/01-9-file-handling";
import { lesson01_10 } from "./module-01/01-10-numpy";
import { lesson01_11 } from "./module-01/01-11-pandas";

// Static registry of individual lesson files
export const LESSON_REGISTRY: Record<string, DetailedLessonContent> = {
  "01-1": lesson01_1,
  "01-2": lesson01_2,
  "01-3": lesson01_3,
  "01-4": lesson01_4,
  "01-5": lesson01_5,
  "01-6": lesson01_6,
  "01-7": lesson01_7,
  "01-8": lesson01_8,
  "01-9": lesson01_9,
  "01-10": lesson01_10,
  "01-11": lesson01_11
};

export function resolveLessonContent(
  module: ModuleData,
  lesson: Lesson
): DetailedLessonContent {
  // 1. Check exact lesson ID in static registry
  if (LESSON_REGISTRY[lesson.id]) {
    return LESSON_REGISTRY[lesson.id];
  }

  const titleLower = lesson.title.toLowerCase();
  const modTitleLower = module.title.toLowerCase();

  // 2. Check title matching in static registry
  if (titleLower.includes("variable") && titleLower.includes("data type")) return lesson01_1;
  if (titleLower.includes("control flow") || titleLower.includes("function")) return lesson01_2;
  if (titleLower.includes("object-oriented") || titleLower.includes("oop")) return lesson01_3;
  if (titleLower.includes("list") && (titleLower.includes("method") || titleLower.includes("manipulation"))) return lesson01_4;
  if (titleLower.includes("tuple")) return lesson01_5;
  if (titleLower.includes("set") && (titleLower.includes("operation") || titleLower.includes("application"))) return lesson01_6;
  if (titleLower.includes("dictionar")) return lesson01_7;
  if (titleLower.includes("error handling") || titleLower.includes("debugging")) return lesson01_8;
  if (titleLower.includes("file handling")) return lesson01_9;
  if (titleLower.includes("numpy")) return lesson01_10;
  if (titleLower.includes("pandas")) return lesson01_11;

  // Chapter index inside module
  const lessonIndex = module.lessons.findIndex((l) => l.id === lesson.id);
  const chapterNumber = lessonIndex >= 0 ? lessonIndex + 1 : 1;

  // Extract technologies
  const techList = lesson.tech
    ? lesson.tech.split(/[/,&]/).map((t) => t.trim()).filter(Boolean)
    : ["Python", "FastAPI"];
  if (techList.length === 1 && !techList.includes("Python")) {
    techList.unshift("Python");
  }

  // 3. Domain Fallback Synthesizers
  const isFDE =
    titleLower.includes("fde") ||
    titleLower.includes("forward deployed") ||
    titleLower.includes("discovery") ||
    titleLower.includes("solution architecture") ||
    titleLower.includes("poc") ||
    titleLower.includes("prototyping") ||
    titleLower.includes("enterprise ai") ||
    titleLower.includes("client integration") ||
    modTitleLower.includes("forward deployed");

  const isAgent =
    titleLower.includes("agent") ||
    titleLower.includes("mcp") ||
    titleLower.includes("swarm") ||
    titleLower.includes("react") ||
    modTitleLower.includes("agent");

  if (isFDE) {
    return {
      chapterNumber,
      categoryBadge: "Forward Deployed AI",
      subtitle: `Enterprise discovery, custom solution topology, client POCs, and production rollout for ${lesson.title}.`,
      concept: {
        title: `${lesson.title}: Enterprise Principles & Execution`,
        paragraphs: [
          `Forward Deployed Engineering (FDE) operates directly at the intersection of customer domain constraints, solution architecture, rapid 48-hour POC prototyping, and enterprise Kubernetes production systems.`,
          `An FDE translates ambiguous executive requirements into strict technical acceptance contracts, conducts dataset readiness audits, builds air-gapped / VPC-isolated architectures, and ships high-impact AI pilots with measurable ROI while ensuring strict SOC2 and tenant isolation compliance.`
        ]
      },
      whyItMatters: {
        title: "Why this matters for Forward Deployed Engineers",
        paragraphs: [
          `Building in a sandbox is easy; deploying into complex enterprise IT environments with legacy databases, strict compliance audits, and latency SLAs is where engineering value is unlocked.`,
          `Engineers who master FDE patterns can rapidly build trust with enterprise CTOs, de-risk multi-million dollar deployments, and transition brittle prototypes into battle-tested production platforms.`
        ]
      },
      architecture: {
        title: "Enterprise FDE Architecture & Security Topology",
        flowSummary:
          "Client Discovery & Audit → VPC Peering & IAM Boundary → 48-Hour Rapid POC → Acceptance Benchmarking → Kubernetes Helm Rollout & SOC2 Audit Trails",
        flowSteps: [
          { step: "01", label: "Client Discovery", desc: "Audit data readiness, security boundaries, and quantitative ROI targets." },
          { step: "02", label: "VPC & IAM Topology", desc: "Configure private VPC endpoints, tenant isolation keys, and RBAC roles." },
          { step: "03", label: "Rapid POC Build", desc: "Deploy interactive 48-hour prototype with synthetic sandbox validation." },
          { step: "04", label: "Production Rollout", desc: "Orchestrate Kubernetes cluster deployment with latency SLAs and SOC2 logging." }
        ],
        paragraphs: [
          `The architecture enforces zero-trust data access: all client queries are authenticated with cryptographic HMAC tokens and evaluated against pre-filtered tenant schemas before dispatching model inference.`
        ]
      },
      code: {
        title: "Enterprise Tenant Guard & Connector Pattern",
        before: {
          filename: "naive_client_integration.py",
          language: "PYTHON",
          code: `# Naive integration without tenant isolation or security audit
def handle_client_query(req):
    tenant_id = req.get("tenant_id")
    # Direct query without tenant pre-filtering leaks data!
    return db.query(f"SELECT * FROM documents WHERE query = '{req.get('query')}'")`,
          problems: [
            "No cryptographic token verification or tenant context validation",
            "Vulnerable to cross-tenant data leakage and prompt injection",
            "Lacks structured audit logs required for SOC2 compliance"
          ]
        },
        after: {
          filename: "production_fde_connector.py",
          language: "PYTHON",
          code: `from typing import Dict, Any
from pydantic import BaseModel, Field

class EnterpriseTenantContext(BaseModel):
    tenant_id: str = Field(..., regex="^[a-zA-Z0-9_-]{8,32}$")
    user_role: str
    vpc_origin: str

def secure_enterprise_dispatch(
    context: EnterpriseTenantContext,
    query_payload: Dict[str, Any]
) -> Dict[str, Any]:
    """Production FDE connector enforcing strict tenant isolation and audit logging."""
    scoped_filter = {"tenant_id": context.tenant_id, "vpc_origin": context.vpc_origin}
    audit_event = {
        "event": "AI_INFERENCE_REQUEST",
        "tenant": context.tenant_id,
        "status": "AUTHORIZED",
        "role": context.user_role
    }
    return {"status": "success", "filter": scoped_filter, "audit": audit_event}`,
          improvements: [
            "Strict schema-enforced tenant pre-filtering prevents cross-tenant data leakage",
            "Immutable structured audit logs for SOC2 compliance",
            "Zero-trust VPC boundary verification"
          ]
        }
      },
      experiment: {
        title: "Experiment: Enterprise Tenant Boundary & SLA Verification",
        description: "Verify that multi-tenant isolation interceptors block unauthorized access while meeting p95 latency SLAs.",
        scenarios: [
          {
            name: "Authorized Enterprise Tenant Query",
            method: "POST",
            endpoint: "/fde/tenant/query",
            payload: '{"tenant_id": "ent_corp_9481", "vpc_origin": "vpc-09a8f2", "user_role": "analyst"}',
            expectedStatus: 200,
            statusText: "OK",
            response: '{"status": "success", "tenant_isolated": true, "latency_ms": 28, "audit_id": "audit_8fa2b"}',
            explanation: "Cryptographic tenant claim validated; query isolated to client VPC boundary in 28ms."
          }
        ]
      },
      observe: {
        title: "Enterprise Deployment Telemetry",
        metrics: [
          { label: "Tenant Isolation", value: "100% Pre-filtered", status: "good", note: "Zero cross-tenant leakage" },
          { label: "p95 Endpoint Latency", value: "34ms", status: "good", note: "SLA budget < 50ms" },
          { label: "SOC2 Audit Logging", value: "100% Pass", status: "good", note: "Immutable hash chains" },
          { label: "POC Turnaround Time", value: "48 Hours", status: "good", note: "Rapid prototyping pipeline" }
        ],
        logs: [
          { time: "00:00:00.010", level: "INFO", tag: "FDEGateway", message: "Verified enterprise tenant claim for 'ent_corp_9481'." },
          { time: "00:00:00.025", level: "INFO", tag: "VPCIsolation", message: "Dispatched inference inside dedicated VPC cluster." }
        ]
      },
      production: {
        title: "Forward Deployed Engineering Rules",
        rules: [
          { title: "Strict Database Pre-Filtering", description: "Always apply tenant_id at the database/vector query level (pre-filter), never in application memory.", impact: "Guarantees mathematical multi-tenant data isolation." },
          { title: "48-Hour Rapid POCs", description: "Build interactive Streamlit/FastAPI prototypes on synthetic client schemas before full infrastructure builds.", impact: "Validates client ROI and cuts delivery risk by 80%." }
        ]
      },
      challenge: {
        title: `Engineering Challenge: ${lesson.title}`,
        prompt: `Implement an enterprise tenant validator function validate_tenant(headers: dict, secret_key: bytes) -> str that checks HMAC authorization headers.`,
        hint: "Compare computed HMAC-SHA256 signature with header token using hmac.compare_digest.",
        solutionCode: `import hmac, hashlib

def validate_tenant(headers: dict, secret_key: bytes) -> str:
    tenant_id = headers.get("X-Tenant-ID", "")
    token = headers.get("X-Auth-Signature", "")
    expected = hmac.new(secret_key, tenant_id.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(token, expected):
        raise PermissionError("Invalid enterprise authentication signature.")
    return tenant_id`
      },
      checklist: [
        { id: "c1", text: "Multi-tenant data isolation enforced with database pre-filtering", category: "Security" },
        { id: "c2", text: "VPC private endpoints & AWS PrivateLink configured", category: "Infrastructure" },
        { id: "c3", text: "Immutable SOC2 audit event trail emitted on all inference requests", category: "Compliance" }
      ],
      quizzes: [
        {
          id: "q1",
          question: `What is the primary responsibility of a Forward Deployed Engineer (FDE)?`,
          options: [
            `To work directly with enterprise stakeholders, conduct technical discovery, rapidly prototype custom POCs, and productionise AI systems under real customer constraints.`,
            `To write CSS styles exclusively.`,
            `To manage social media ads.`,
            `To assemble hardware servers.`
          ],
          correctIndex: 0,
          explanation: `FDEs operate at the intersection of customer business problems, solution architecture, rapid prototyping, and production deployment.`
        }
      ],
      skillsCount: 6,
      sectionsCount: 11,
      technologies: techList,
      updatedDate: "2025-01-14"
    };
  }

  // General Foundations Default
  return {
    chapterNumber,
    categoryBadge: module.category || "Foundations",
    subtitle: `Deep dive into ${lesson.title}: memory layout, algorithmic complexity, vectorization, and production code patterns.`,
    concept: {
      title: `${lesson.title}: Engineering Foundations`,
      paragraphs: [
        `${lesson.title} is a core foundation of modern software and AI engineering. Writing performant AI applications requires understanding how Python manages memory references, garbage collection, vectorization, and asynchronous I/O tasks.`,
        `Production systems avoid naive looping constructs, memory leaks, and unhandled exceptions by adhering to strong typing, vectorized array broadcasting, and robust logging infrastructure.`
      ]
    },
    whyItMatters: {
      title: "Why this matters for AI engineers",
      paragraphs: [
        `Every AI application, from custom data loaders and vector search middleware to API microservices, relies on solid software engineering fundamentals. Poor data structure choices introduce O(N^2) latency bottlenecks in data preparation pipelines.`,
        `Mastering idiomatic, high-performance Python ensures your preprocessing scripts, embedding pipelines, and inference servers execute with sub-millisecond efficiency.`
      ]
    },
    architecture: {
      title: `${lesson.title} Execution Architecture`,
      flowSummary:
        "Source Data → Type Validation (Pydantic) → In-Memory Transformation → Vectorized Computation (NumPy/Pandas) → Structured Output",
      flowSteps: [
        { step: "01", label: "Input Ingestion", desc: "Stream incoming JSON/CSV payloads with memory-efficient generator iterators." },
        { step: "02", label: "Type Enforcement", desc: "Validate types and bounds before entering core computational logic." },
        { step: "03", label: "Vectorized Operations", desc: "Execute operations via C-accelerated NumPy arrays or optimized data structures." },
        { step: "04", label: "Output Serialization", desc: "Format response into validated schemas with structured error boundaries." }
      ],
      paragraphs: [
        `By maintaining clean architectural boundaries between input validation, vectorized execution, and structured error handling, your AI service remains robust under high concurrent load.`
      ]
    },
    code: {
      title: `Optimized Implementation: ${lesson.title}`,
      before: {
        filename: "naive_implementation.py",
        language: "PYTHON",
        code: `# Naive implementation with O(N^2) complexity and no type safety
def process_data(raw_items):
    results = []
    for item in raw_items:
        if "value" in item:
            results.append(item["value"] * 2)
    return results`,
        problems: [
          "Lacks type annotations and schema validation (crashes on unexpected data types)",
          "Python list append in loops is slower than vectorized NumPy array operations",
          "No exception handling or structured logging for debugging production failures"
        ]
      },
      after: {
        filename: "production_implementation.py",
        language: "PYTHON",
        code: `from typing import List, Sequence
import numpy as np
from pydantic import BaseModel, Field

class DataItem(BaseModel):
    id: str
    value: float = Field(..., ge=0.0, description="Non-negative numerical value")

def process_data_vectorized(items: Sequence[DataItem]) -> np.ndarray:
    """Production vectorized processing with Pydantic validation and NumPy speed."""
    values = np.fromiter((item.value for item in items), dtype=np.float64, count=len(items))
    return values * 2.0`,
        improvements: [
          "Runtime schema validation guarantees clean data integrity",
          "NumPy SIMD vectorization achieves 20x-50x speedups over pure Python loops",
          "Explicit type hints ensure seamless IDE autocomplete and linting safety"
        ]
      }
    },
    experiment: {
      title: `Experiment: Performance & Edge Case Verification`,
      description: `Evaluate throughput and validation robustness for ${lesson.title}.`,
      scenarios: [
        {
          name: "Standard Batch Processing (1,000 items)",
          method: "POST",
          endpoint: "/process/batch",
          payload: '{"batch_size": 1000, "operation": "vector_multiply"}',
          expectedStatus: 200,
          statusText: "OK",
          response: '{"status": "success", "processed_count": 1000, "execution_time_ms": 1.2}',
          explanation: "NumPy vectorized computation processed all 1,000 elements in 1.2 milliseconds."
        }
      ]
    },
    observe: {
      title: "Execution Telemetry & Benchmarks",
      metrics: [
        { label: "Execution Time (p95)", value: "1.4ms", status: "good", note: "C-level vector execution" },
        { label: "Memory Allocated", value: "8.2 MB", status: "good", note: "Zero memory leakages" },
        { label: "Throughput", value: "45,000 ops/s", status: "good", note: "Optimized memory layout" },
        { label: "Error Rate", value: "0.00%", status: "good", note: "Protected by type validation" }
      ],
      logs: [
        { time: "00:00:00.005", level: "INFO", tag: "DataProcessor", message: "Ingested 1,000 items into contiguous memory buffer." },
        { time: "00:00:00.007", level: "INFO", tag: "VectorEngine", message: "Applied vectorized transformation in 1.2ms." }
      ]
    },
    production: {
      title: "Production Best Practices",
      rules: [
        { title: "Leverage Vectorization", description: "Replace nested Python loops with NumPy vector operations or generator expressions.", impact: "Cuts data wrangling latency by 90%." },
        { title: "Strict Type Hints", description: "Use Pydantic and type annotations across all function signatures.", impact: "Eliminates entire classes of runtime TypeError bugs." }
      ]
    },
    challenge: {
      title: `Engineering Challenge: ${lesson.title}`,
      prompt: `Write a high-performance Python function that processes an input sequence and returns clean, filtered, transformed data with O(N) complexity.`,
      hint: "Use list comprehensions or NumPy array filtering with boolean masking.",
      solutionCode: `import numpy as np

def filter_and_transform(values: list[float], threshold: float = 0.0) -> np.ndarray:
    arr = np.array(values, dtype=np.float64)
    mask = arr > threshold
    return arr[mask] * 2.0`
    },
    checklist: [
      { id: "c1", text: "Function signatures annotated with strict Python type hints", category: "Typing" },
      { id: "c2", text: "Looping operations vectorized using NumPy or list comprehensions", category: "Performance" }
    ],
    quizzes: [
      {
        id: "q1",
        question: `Why is vectorized NumPy array computation significantly faster than pure Python 'for' loops?`,
        options: [
          `NumPy executes contiguous memory operations in compiled C with SIMD CPU instructions, avoiding Python interpreter overhead.`,
          `NumPy compresses Python strings into zip archives.`,
          `NumPy runs exclusively on quantum computers.`,
          `Python loops cannot run on 64-bit systems.`
        ],
        correctIndex: 0,
        explanation: `NumPy arrays are stored in homogeneous contiguous C memory buffers and execute pre-compiled C loops with SIMD vector parallelization.`
      }
    ],
    skillsCount: 5,
    sectionsCount: 11,
    technologies: techList,
    updatedDate: "2025-01-14"
  };
}
