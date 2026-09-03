import { DetailedLessonContent } from "../types";

export const lesson01_7: DetailedLessonContent = {
  chapterNumber: 7,
  categoryBadge: "Foundations · 25 min read · Beginner → Intermediate",
  subtitle:
    "Master Python dictionaries, hash map internals, dictionary comprehensions, and safe JSON serialization for structured LLM API payloads and state management.",
  concept: {
    title: "1 · Concept: Hash Maps, Key-Value Structures & JSON Schema",
    paragraphs: [
      "Dictionaries are associative hash maps mapping unique hashable keys to arbitrary values. Dictionaries are the most critical data structure in AI engineering because almost all AI APIs (OpenAI, Anthropic, Gemini), agent state graphs, and tool parameters are structured JSON dictionaries.",
      "Understanding safe key access (.get() with defaults), dictionary merging (dict1 | dict2), dictionary comprehensions, and nested traversal prevents common production KeyError crashes."
    ]
  },
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "LLM API responses return nested dictionaries with token usage, finish reasons, tool calls, and text completions. Accessing nested fields with unsafe indexing (e.g. res['choices'][0]['message']['content']) causes crashes when an API returns an error or content filter response."
    ]
  },
  architecture: {
    title: "3 · Architecture: Defensive JSON Schema Parsing Pipeline",
    flowSummary:
      "Raw LLM JSON String → Safe json.loads() → Schema Guardrail (Pydantic / Dict Validation) → Normalized Application State",
    flowSteps: [
      { step: "01", label: "JSON Ingestion", desc: "Parse raw model completion string into a Python dictionary." },
      { step: "02", label: "Defensive Extraction", desc: "Use .get() and fallback defaults to safely navigate nested keys." },
      { step: "03", label: "State Merging", desc: "Merge delta updates into global agent state using dictionary union (|)." },
      { step: "04", label: "Serialization", desc: "Dump validated dictionary back to JSON for HTTP response delivery." }
    ],
    paragraphs: [
      "Defensive dictionary parsing ensures application resilience against unexpected API response variations."
    ]
  },
  code: {
    title: "4 · Code: Safe Nested Dictionary Parsing & Merging",
    before: {
      filename: "unsafe_dict_access.py",
      language: "PYTHON",
      code: `# Fragile direct indexing crashes on missing keys or rate limits
def extract_token_usage(api_response):
    # Crash if 'usage' key is missing in error responses!
    prompt_tokens = api_response["usage"]["prompt_tokens"]
    completion_tokens = api_response["usage"]["completion_tokens"]
    return prompt_tokens + completion_tokens`,
      problems: [
        "Throws unhandled KeyError if the API returns an error response lacking 'usage'",
        "No type validation or fallback defaults"
      ]
    },
    after: {
      filename: "production_dict_parser.py",
      language: "PYTHON",
      code: `from typing import Dict, Any, Optional

def extract_token_usage_safe(api_response: Dict[str, Any]) -> Dict[str, int]:
    """Production safe dictionary navigation with robust default fallbacks."""
    usage = api_response.get("usage", {})
    
    return {
        "prompt_tokens": usage.get("prompt_tokens", 0),
        "completion_tokens": usage.get("completion_tokens", 0),
        "total_tokens": usage.get("total_tokens", 0)
    }

def update_agent_state(current_state: Dict[str, Any], delta_state: Dict[str, Any]) -> Dict[str, Any]:
    """Immutable state update using modern Python 3.9+ dictionary union operator."""
    return current_state | delta_state`,
      improvements: [
        "Safe .get() methods guarantee zero KeyError crashes on partial API responses",
        "Dictionary union (|) provides clean immutable state updates",
        "Type hints ensure clarity across asynchronous microservices"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Safe Key Parsing on Error Responses",
    description: "Verify that defensive dictionary parsing handles degraded or partial payloads smoothly.",
    scenarios: [
      {
        name: "Partial Error Response",
        method: "PYTHON",
        endpoint: "extract_token_usage_safe()",
        payload: '{"error": {"code": "rate_limit_exceeded", "message": "Too many requests"}}',
        expectedStatus: 200,
        statusText: "SAFE_FALLBACK",
        response: '{"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}',
        explanation: "Safely returned zero token usage without raising KeyError."
      }
    ]
  },
  observe: {
    title: "6 · Observe: Dictionary Operations Telemetry",
    metrics: [
      { label: "Key Access Speed", value: "O(1) Average", status: "good", note: "Compact dict layout" },
      { label: "KeyError Rate", value: "0.00%", status: "good", note: "Protected with .get()" },
      { label: "State Immutability", value: "Enforced", status: "good", note: "Using dict union" },
      { label: "JSON Serialization", value: "Valid", status: "good", note: "Clean schema" }
    ],
    logs: [
      { time: "00:00:00.001", level: "INFO", tag: "StateEngine", message: "Merged agent state delta (3 keys updated)." }
    ]
  },
  production: {
    title: "7 · Production: Dictionary Best Practices",
    rules: [
      { title: "Always Use .get() on External JSON", description: "Never use direct bracket indexing on data originating from external APIs.", impact: "Eliminates 90% of unexpected production crashes." },
      { title: "Use Dictionary Comprehensions", description: "Filter dictionary elements with {k: v for k, v in d.items() if v is not None}.", impact: "Strips null values cleanly before sending API payloads." }
    ]
  },
  challenge: {
    title: "8 · Challenge: Clean Null Fields from API Request Dictionary",
    prompt: "Write a function 'clean_payload(payload: dict) -> dict' that removes all keys whose values are None or empty strings.",
    hint: "Use a dictionary comprehension with condition: if v is not None and v != ''.",
    solutionCode: `def clean_payload(payload: dict) -> dict:
    return {k: v for k, v in payload.items() if v is not None and v != ""}`
  },
  checklist: [
    { id: "c1", text: "Use .get() with default fallbacks for nested API responses", category: "Safety" },
    { id: "c2", text: "Use dictionary union (|) for immutable state mutations", category: "Architecture" },
    { id: "c3", text: "Strip None values using dictionary comprehensions", category: "Optimization" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What happens when you access d['missing_key'] vs d.get('missing_key', 'default') in Python?",
      options: [
        "d['missing_key'] raises a KeyError crash; d.get('missing_key', 'default') safely returns 'default'.",
        "Both return None.",
        "Both crash the Python interpreter.",
        "d.get() creates the key in the dictionary."
      ],
      correctIndex: 0,
      explanation: "Bracket indexing raises a KeyError if the key is absent, whereas .get() returns a fallback value safely."
    }
  ],
  skillsCount: 5,
  sectionsCount: 11,
  technologies: ["Python", "Dictionaries", "JSON", "State Management", "API Schemas"],
  updatedDate: "2025-01-14"
};
