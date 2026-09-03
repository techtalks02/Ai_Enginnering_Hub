import { DetailedLessonContent } from "../types";

export const lesson01_3: DetailedLessonContent = {
  chapterNumber: 3,
  categoryBadge: "Foundations · 22 min read · Intermediate",
  subtitle:
    "Design extensible LLM client abstractions, custom memory buffers, and clean agentic tool classes using Object-Oriented Python patterns.",
  concept: {
    title: "1 · Concept: Object-Oriented Design in AI Architecture",
    paragraphs: [
      "Modern AI frameworks (LangChain, LlamaIndex, LiteLLM) rely on clean OOP patterns: Abstract Base Classes (ABCs), encapsulation of API credentials, polymorphic tool interfaces, and dataclass state schemas.",
      "By modeling LLM providers, embedding models, and memory buffers as classes inheriting from unified abstract interfaces, you can swap foundation models (e.g. OpenAI -> Anthropic -> Local Ollama) with zero changes to downstream business logic."
    ]
  },
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "Without OOP abstractions, switching model providers requires refactoring hundreds of raw API call sites. OOP encapsulation enables clean dependency injection and modular unit testing with mock models."
    ]
  },
  architecture: {
    title: "3 · Architecture: Polymorphic Model Provider Hierarchy",
    flowSummary:
      "Client Application → BaseLLMInterface (ABC) → Concrete Provider (OpenAI / Anthropic / Ollama) → Token Normalizer → Common Completion Schema",
    flowSteps: [
      { step: "01", label: "Abstract Base Class", desc: "Define standard async generate() and stream() protocol contracts." },
      { step: "02", label: "Provider Adapter", desc: "Encapsulate provider-specific SDK calls and authorization tokens." },
      { step: "03", label: "Token Normalizer", desc: "Map varied vendor responses into unified standardized completion schemas." },
      { step: "04", label: "Dependency Injector", desc: "Pass unified LLM client instance into agents and RAG pipelines." }
    ],
    paragraphs: [
      "Polymorphic interfaces decouple application logic from underlying vendor SDK eccentricities."
    ]
  },
  code: {
    title: "4 · Code: Unified LLM Client Architecture (ABC Pattern)",
    before: {
      filename: "hardcoded_client.py",
      language: "PYTHON",
      code: `# Hardcoded vendor calls scattered across the project
import openai

def ask_question(prompt):
    return openai.ChatCompletion.create(model="gpt-4o", messages=[{"role": "user", "content": prompt}])`,
      problems: [
        "Tightly coupled to a single vendor SDK",
        "Impossible to unit test with mock responses without patching global modules",
        "Vendor schema changes break the entire codebase"
      ]
    },
    after: {
      filename: "production_llm_abstraction.py",
      language: "PYTHON",
      code: `from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List, Dict, Any

@dataclass
class LLMResponse:
    content: str
    token_count: int
    model_name: str

class BaseLLMClient(ABC):
    """Abstract Base Class for all AI model providers."""
    
    @abstractmethod
    def generate(self, prompt: str, **kwargs) -> LLMResponse:
        pass

class OpenAILegacyClient(BaseLLMClient):
    def __init__(self, api_key: str, default_model: str = "gpt-4o"):
        self.api_key = api_key
        self.default_model = default_model
        
    def generate(self, prompt: str, **kwargs) -> LLMResponse:
        # Provider-specific execution & unified normalization
        return LLMResponse(
            content=f"OpenAI response for: {prompt[:20]}...",
            token_count=120,
            model_name=self.default_model
        )

class MockLLMClient(BaseLLMClient):
    """Zero-cost mock client for automated test suites."""
    def generate(self, prompt: str, **kwargs) -> LLMResponse:
        return LLMResponse(content="Mocked response", token_count=10, model_name="mock-v1")`,
      improvements: [
        "Unified interface allows seamless switching between OpenAI, Anthropic, or Mock clients",
        "Type-safe dataclass response schema standardizes token metrics across vendors",
        "Zero-cost deterministic unit testing using MockLLMClient"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Hot-Swapping Model Providers",
    description: "Verify that passing different provider instances to an agent pipeline works seamlessly.",
    scenarios: [
      {
        name: "Standard Production Provider",
        method: "PYTHON",
        endpoint: "client.generate()",
        payload: '{"prompt": "Summarize quarterly report"}',
        expectedStatus: 200,
        statusText: "SUCCESS",
        response: '{"content": "Quarterly summary...", "tokens": 140, "model": "gpt-4o"}',
        explanation: "Provider adapter normalized OpenAI response into standardized schema."
      },
      {
        name: "Mock Provider for CI/CD",
        method: "PYTHON",
        endpoint: "mock_client.generate()",
        payload: '{"prompt": "Test query"}',
        expectedStatus: 200,
        statusText: "SUCCESS",
        response: '{"content": "Mocked response", "tokens": 10, "model": "mock-v1"}',
        explanation: "Executed 100% offline test without spending API tokens or incurring network latency."
      }
    ]
  },
  observe: {
    title: "6 · Observe: OOP Abstraction Telemetry",
    metrics: [
      { label: "Provider Coupling", value: "0% Direct", status: "good", note: "Isolated behind ABC" },
      { label: "CI Test Speedup", value: "250x", status: "good", note: "Using mock provider" },
      { label: "Schema Drift", value: "0.00%", status: "good", note: "Normalized by dataclass" },
      { label: "Polymorphism", value: "Enabled", status: "good", note: "Interchangeable classes" }
    ],
    logs: [
      { time: "00:00:00.002", level: "INFO", tag: "Factory", message: "Instantiated OpenAILegacyClient with gpt-4o." },
      { time: "00:00:00.015", level: "INFO", tag: "Provider", message: "Response normalized to standard LLMResponse dataclass." }
    ]
  },
  production: {
    title: "7 · Production: OOP Architectural Guidelines",
    rules: [
      { title: "Define ABCs for Infrastructure", description: "Always create abstract base classes for databases, vector stores, and model providers.", impact: "Enables effortless vendor migration and testing." },
      { title: "Use Dataclasses for DTOs", description: "Wrap structured messages and responses in @dataclass or Pydantic models.", impact: "Guarantees runtime schema adherence." },
      { title: "Encapsulate Secrets in Instances", description: "Store API keys inside private class attributes, never in global module scope.", impact: "Prevents accidental credential leakage." }
    ]
  },
  challenge: {
    title: "8 · Challenge: Build an In-Memory Conversation Buffer Class",
    prompt: "Create a class 'ConversationMemory' with methods add_message(role: str, content: str) and get_formatted_history() -> str.",
    hint: "Store messages as a list of dictionaries inside self.messages and join them with newlines.",
    solutionCode: `class ConversationMemory:
    def __init__(self):
        self.messages = []
        
    def add_message(self, role: str, content: str):
        self.messages.append({"role": role, "content": content})
        
    def get_formatted_history(self) -> str:
        return "\\n".join(f"{m['role'].capitalize()}: {m['content']}" for m in self.messages)`
  },
  checklist: [
    { id: "c1", text: "Create Abstract Base Classes for swappable components", category: "Architecture" },
    { id: "c2", text: "Encapsulate API keys and credentials in class instances", category: "Security" },
    { id: "c3", text: "Standardize return schemas using typed dataclasses", category: "Typing" },
    { id: "c4", text: "Write zero-cost mock classes for CI/CD unit testing", category: "Testing" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What is the primary architectural benefit of using Abstract Base Classes (ABCs) for LLM providers?",
      options: [
        "It decouples business logic from vendor SDKs, allowing you to swap model providers or use mock classes in tests without changing application code.",
        "It compresses video files automatically.",
        "It reduces RAM consumption to 0 MB.",
        "It eliminates the need for Python decorators."
      ],
      correctIndex: 0,
      explanation: "ABCs define a rigid contract that concrete adapters must implement, creating swappable polymorphic modules."
    }
  ],
  skillsCount: 6,
  sectionsCount: 11,
  technologies: ["Python", "OOP", "Abstract Base Classes", "Dataclasses", "Design Patterns"],
  updatedDate: "2025-01-14"
};
