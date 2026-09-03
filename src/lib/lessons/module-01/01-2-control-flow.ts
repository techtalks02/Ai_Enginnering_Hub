import { DetailedLessonContent } from "../types";

export const lesson01_2: DetailedLessonContent = {
  chapterNumber: 2,
  categoryBadge: "Foundations · 18 min read · Beginner → Intermediate",
  subtitle:
    "Master branching decision logic, loop constructs, generator pipelines, and higher-order functions for autonomous AI workflows and tool dispatch loops.",
  concept: {
    title: "1 · Concept: Control Flow & First-Class Functions",
    paragraphs: [
      "In AI systems, code is rarely linear. An autonomous agent repeatedly queries LLMs, parses tool calls, validates outputs, branches on confidence scores, and loops until termination criteria are met.",
      "Python provides rich control flow primitives (if/elif/else, match/case, for, while) combined with first-class functions, closures, and decorators. Understanding function signatures (*args, **kwargs, typed callables) is the prerequisite for building robust tool routers and middleware chains."
    ]
  },
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "Agentic loops (e.g. ReAct, Plan-and-Solve) are fundamentally stateful control flow machines. Unhandled loops cause runaway token consumption and cascading system failures.",
      "Designing resilient fallback chains (e.g., trying primary LLM -> branching to fallback model on rate limit -> degrading gracefully) requires mastery of control flow and higher-order function wrappers."
    ]
  },
  architecture: {
    title: "3 · Architecture: Agentic Tool Execution & Branching Engine",
    flowSummary:
      "Agent Step → Guardrail Branch (if/elif) → Function Tool Router → Sandboxed Execution → Result Aggregation",
    flowSteps: [
      { step: "01", label: "Intent Classifier", desc: "Evaluate model output and branch via pattern matching." },
      { step: "02", label: "Tool Dispatch Router", desc: "Map function name to callable handler using dynamic dictionary dispatch." },
      { step: "03", label: "Retry & Backoff Loop", desc: "Execute with exponential backoff while attempts < max_retries." },
      { step: "04", label: "State Return Gate", desc: "Evaluate stop conditions and return final synthesized response." }
    ],
    paragraphs: [
      "Replacing brittle cascading if-else trees with structured function registries and decorators keeps your agent execution engine extensible and clean."
    ]
  },
  code: {
    title: "4 · Code: Robust Function Dispatcher & Retry Decorator",
    before: {
      filename: "naive_agent_loop.py",
      language: "PYTHON",
      code: `# Brittle endless loop with nested conditionals and no retry backoff
def run_agent(query):
    while True:
        action = call_model(query)
        if action == "search":
            res = do_search(query)
        elif action == "calculate":
            res = do_calc(query)
        else:
            return action`,
      problems: [
        "Vulnerable to infinite loops if the model fails to emit a termination token",
        "Rigid hardcoded tool routing makes adding new tools difficult",
        "Zero error handling or backoff when external APIs fail"
      ]
    },
    after: {
      filename: "production_tool_router.py",
      language: "PYTHON",
      code: `from typing import Callable, Dict, Any
import time
from functools import wraps

def retry_with_backoff(max_retries: int = 3, base_delay: float = 0.5):
    """Production retry decorator with exponential jitter backoff."""
    def decorator(func: Callable):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries - 1:
                        raise e
                    time.sleep(base_delay * (2 ** attempt))
        return wrapper
    return decorator

# Tool Registry with First-Class Callable Mapping
TOOL_REGISTRY: Dict[str, Callable[[str], Any]] = {}

def register_tool(name: str):
    def decorator(func: Callable[[str], Any]):
        TOOL_REGISTRY[name] = func
        return func
    return decorator

@register_tool("web_search")
@retry_with_backoff(max_retries=3)
def execute_web_search(query: str) -> str:
    return f"Search results for: {query}"`,
      improvements: [
        "Decorator-driven retry backoff prevents transient network dropouts from crashing the agent",
        "Clean extensible tool registry decouples business tools from core routing loops",
        "Typed callable signatures ensure runtime validation and tooling metadata"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Dynamic Dispatch & Loop Termination",
    description: "Verify that function dispatch routers execute correctly and terminate within safety bounds.",
    scenarios: [
      {
        name: "Standard Tool Dispatch",
        method: "PYTHON",
        endpoint: "router.execute",
        payload: '{"tool": "web_search", "query": "Latest LLM benchmarks"}',
        expectedStatus: 200,
        statusText: "DISPATCHED",
        response: '"Search results for: Latest LLM benchmarks"',
        explanation: "Tool router looked up registered callable and executed with zero branching overhead."
      },
      {
        name: "Unknown Tool Fallback",
        method: "PYTHON",
        endpoint: "router.execute",
        payload: '{"tool": "unregistered_tool", "query": "test"}',
        expectedStatus: 404,
        statusText: "FALLBACK_TRIGGERED",
        response: '{"error": "Tool not found", "fallback": "human_escalation"}',
        explanation: "Safely triggered fallback handler without throwing uncaught KeyError."
      }
    ]
  },
  observe: {
    title: "6 · Observe: Dispatch Telemetry & Loop Safety",
    metrics: [
      { label: "Loop Safety Gate", value: "Max 5 Iterations", status: "good", note: "Bounds runaway token spend" },
      { label: "Dispatch Overhead", value: "0.02ms", status: "good", note: "O(1) dictionary routing" },
      { label: "Retry Success Rate", value: "99.4%", status: "good", note: "Exponential backoff active" },
      { label: "Recursion Depth", value: "Bounded", status: "good", note: "Tail call & stack safe" }
    ],
    logs: [
      { time: "00:00:00.001", level: "INFO", tag: "Router", message: "Registered 8 production agent tools." },
      { time: "00:00:00.012", level: "INFO", tag: "Dispatch", message: "Dispatched 'web_search' with 0.5s backoff budget." }
    ]
  },
  production: {
    title: "7 · Production: Best Practices for Loops & Functions",
    rules: [
      { title: "Always Bound While Loops", description: "Never use unconstrained 'while True'. Always include max_iterations guardrails.", impact: "Prevents multi-thousand dollar runaway API bills." },
      { title: "Use Function Registries", description: "Replace nested if-elif statements with dictionary dispatch tables for tool execution.", impact: "Enables dynamic plugin loading and cleaner code." },
      { title: "Apply Retry Decorators", description: "Wrap all network/model calls in exponential backoff decorators.", impact: "Shields your AI service from temporary rate limits and hiccups." }
    ]
  },
  challenge: {
    title: "8 · Challenge: Build a Safe Agent Execution Loop",
    prompt: "Write a function 'run_bounded_agent(step_fn, initial_state, max_steps=5)' that executes step_fn until it returns state['done'] == True or reaches max_steps.",
    hint: "Use a standard for loop range(max_steps) and inspect state dictionary at each iteration.",
    solutionCode: `def run_bounded_agent(step_fn, state, max_steps=5):
    for step in range(max_steps):
        state = step_fn(state)
        if state.get("done", False):
            return {"status": "completed", "steps": step + 1, "state": state}
    return {"status": "max_steps_exceeded", "steps": max_steps, "state": state}`
  },
  checklist: [
    { id: "c1", text: "Guard all while loops with hard max_iteration limits", category: "Safety" },
    { id: "c2", text: "Implement dictionary-based function dispatch for tool routing", category: "Architecture" },
    { id: "c3", text: "Wrap external API calls with exponential backoff retry decorators", category: "Reliability" },
    { id: "c4", text: "Type annotate all function signatures using Callable and Dict", category: "Typing" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Why should autonomous AI agent loops always have a strict max_iterations boundary?",
      options: [
        "To prevent infinite loops and runaway API cost when a model fails to emit a termination token",
        "Because Python cannot run loops longer than 10 iterations",
        "To format JSON output automatically",
        "To compile Python into C code"
      ],
      correctIndex: 0,
      explanation: "Without a hard step counter, an agent oscillating between tools could query LLMs infinitely, incurring immense costs."
    }
  ],
  skillsCount: 6,
  sectionsCount: 11,
  technologies: ["Python", "Control Flow", "Decorators", "Tool Routing", "Agent Loops"],
  updatedDate: "2025-01-14"
};
