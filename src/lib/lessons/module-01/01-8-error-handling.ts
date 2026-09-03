import { DetailedLessonContent } from "../types";

export const lesson01_8: DetailedLessonContent = {
  chapterNumber: 8,
  categoryBadge: "Foundations · 14 min read · Beginner → Intermediate",
  subtitle:
    "Implement structured logging, custom domain exceptions, circuit breakers, and OpenTelemetry observability for resilient production AI pipelines.",
  concept: {
    title: "1 · Concept: Structured Logging & Custom Exceptions",
    paragraphs: [
      "In production AI engineering, print statements are unacceptable. When a foundation model hallucinates invalid JSON, hits rate limits (HTTP 429), or vector databases timeout, your service must capture structured JSON logs with correlation IDs and handle errors via custom exception hierarchies.",
      "Custom exceptions (e.g. RateLimitException, ContextWindowExceededException) allow granular exception handling and seamless integration with fallback circuit breakers."
    ]
  },
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "Debugging non-deterministic LLM failures without structured logs is impossible. Structured JSON logs containing model latency, prompt token counts, and trace IDs allow Datadog or Prometheus to detect latency spikes and provider outages instantly."
    ]
  },
  architecture: {
    title: "3 · Architecture: Observability & Circuit Breaker Engine",
    flowSummary:
      "Inference Request → Trace Context Injector → Try-Except Guardrail → Circuit Breaker Interceptor → Structured JSON Logger",
    flowSteps: [
      { step: "01", label: "Trace Context", desc: "Attach trace_id and session_id to logger context." },
      { step: "02", label: "Exception Hierarchy", desc: "Catch specific RateLimitError or ContextLengthExceededError." },
      { step: "03", label: "Circuit Breaker", desc: "Trip circuit after 3 consecutive failures and route to backup LLM." },
      { step: "04", label: "Structured Log Stream", desc: "Emit machine-readable JSON log for APM telemetry tools." }
    ],
    paragraphs: [
      "Separating transient network errors from permanent prompt format errors enables smart retries."
    ]
  },
  code: {
    title: "4 · Code: Structured JSON Logging & Custom Exception Hierarchy",
    before: {
      filename: "naive_error_handling.py",
      language: "PYTHON",
      code: `# Print statements and generic catch-all exceptions
def call_ai_service(prompt):
    try:
        return provider.call(prompt)
    except Exception as e:
        print(f"Error occurred: {e}") # Loses stack trace & context!
        return None`,
      problems: [
        "Swallows error details and loses the stack trace",
        "Print statements cannot be parsed by log aggregators (Datadog/Grafana)",
        "Catch-all Exception hides keyboard interrupts and system exit signals"
      ]
    },
    after: {
      filename: "production_logging.py",
      language: "PYTHON",
      code: `import logging
import json
import uuid
from typing import Dict, Any

class AIInfrastructureError(Exception):
    """Base exception for all AI platform errors."""
    pass

class RateLimitExceededError(AIInfrastructureError):
    """Raised when upstream LLM API returns 429 status."""
    pass

class StructuredJsonLogger:
    """Emits machine-readable JSON logs for APM ingestion."""
    def __init__(self, service_name: str = "ai_agent_service"):
        self.service_name = service_name
        self.logger = logging.getLogger(service_name)
        self.logger.setLevel(logging.INFO)
        
    def log_event(self, level: str, event_name: str, **metadata):
        log_entry = {
            "service": self.service_name,
            "level": level.upper(),
            "event": event_name,
            "correlation_id": metadata.get("trace_id", str(uuid.uuid4())),
            **metadata
        }
        print(json.dumps(log_entry))

logger = StructuredJsonLogger()
logger.log_event("info", "LLM_INFERENCE_SUCCESS", latency_ms=124, tokens_used=450)`,
      improvements: [
        "Structured JSON format allows instant ingestion by Datadog, ELK, and CloudWatch",
        "Explicit custom exception classes enable targeted retry logic and circuit breaking",
        "Correlation IDs trace a user query across multi-agent microservices"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Error Capture & Structured Log Output",
    description: "Verify that structured loggers capture metadata accurately during simulated API errors.",
    scenarios: [
      {
        name: "Simulated Rate Limit Error",
        method: "PYTHON",
        endpoint: "logger.log_event()",
        payload: '{"event": "RATE_LIMIT_HIT", "status_code": 429, "retry_after": 2.0}',
        expectedStatus: 200,
        statusText: "LOGGED_JSON",
        response: '{"service": "ai_agent_service", "level": "WARN", "event": "RATE_LIMIT_HIT", "retry_after": 2.0}',
        explanation: "Emitted structured JSON log with error details and correlation context."
      }
    ]
  },
  observe: {
    title: "6 · Observe: Logging Telemetry & Alerting Metrics",
    metrics: [
      { label: "Log Ingestion Format", value: "JSON", status: "good", note: "Parseable by ELK/Datadog" },
      { label: "Trace Correlation", value: "100%", status: "good", note: "UUID trace IDs attached" },
      { label: "Unhandled Errors", value: "0.00%", status: "good", note: "Typed exception guards" },
      { label: "Circuit Breaker", value: "Armed", status: "good", note: "Auto-failover ready" }
    ],
    logs: [
      { time: "00:00:00.001", level: "INFO", tag: "Logger", message: "Initialized StructuredJsonLogger with correlation engine." }
    ]
  },
  production: {
    title: "7 · Production: Logging & Error Handling Rules",
    rules: [
      { title: "Never Use Print in Production", description: "Always use standard logging or structured JSON loggers.", impact: "Enables automated alerting and log indexing." },
      { title: "Attach Correlation IDs", description: "Pass a trace_id through every function call in an agent pipeline.", impact: "Allows tracing a failed agent step across thousands of requests." }
    ]
  },
  challenge: {
    title: "8 · Challenge: Build a Safe Execution Wrapper Function",
    prompt: "Write a function 'safe_execute(fn, *args, default=None)' that runs fn(*args) inside a try block, logs exceptions as warnings, and returns default on failure.",
    hint: "Use try/except Exception as e and print a structured warning dictionary.",
    solutionCode: `def safe_execute(fn, *args, default=None):
    try:
        return fn(*args)
    except Exception as e:
        print(f'{{"event": "EXECUTION_FAILURE", "error": "{str(e)}"}}')
        return default`
  },
  checklist: [
    { id: "c1", text: "Replace all print statements with structured logging", category: "Observability" },
    { id: "c2", text: "Create custom domain exceptions for AI infrastructure", category: "Reliability" },
    { id: "c3", text: "Attach correlation UUIDs to all outgoing log entries", category: "Observability" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Why is structured JSON logging preferred over plain text print statements in production AI backends?",
      options: [
        "Machine-readable JSON logs can be indexed, filtered, and aggregated by APM tools like Datadog, CloudWatch, and Elasticsearch for real-time alerting.",
        "JSON logs run faster on GPU hardware.",
        "Python cannot print plain strings in production.",
        "JSON logs compress text by 99%."
      ],
      correctIndex: 0,
      explanation: "Structured JSON enables querying metrics like latency_ms > 2000 or status == 429 effortlessly across millions of log lines."
    }
  ],
  skillsCount: 5,
  sectionsCount: 11,
  technologies: ["Python", "Logging", "Error Handling", "Exceptions", "Observability"],
  updatedDate: "2025-01-14"
};
