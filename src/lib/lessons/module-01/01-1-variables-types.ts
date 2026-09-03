import { DetailedLessonContent } from "../types";

export const lesson01_1: DetailedLessonContent = {
  chapterNumber: 1,
  categoryBadge: "Foundations · 15 min read · Beginner → Intermediate",
  subtitle:
    "Python is one of the most important foundations for AI Engineering. Before working with LLMs, RAG pipelines, AI Agents, APIs, vector databases, or ML systems, you need to be comfortable with how Python stores, organizes, transforms, and passes data.",
  concept: {
    title: "1 · Concept: Variables & Core Data Types",
    paragraphs: [
      "In this chapter, we start with two fundamental concepts: Variables — how Python stores and references values, and Data Types — what kind of values those variables contain. By the end, you'll understand not only the syntax, but also how these concepts appear in real AI engineering applications.",
      "What is a Variable? A variable is a name that refers to a value in your program (e.g. name = 'Adi', age = 25, is_engineer = True). Python doesn't require explicit type declarations—it automatically infers that 25 is an integer (type(age) returns <class 'int'>). The '=' operator signifies assignment (associating a value in memory with a label), not mathematical equality.",
      "Python Variables Are Dynamically Typed: A variable name doesn't permanently belong to one data type. Assigning value = 100 (<class 'int'>) and later value = 'Hello' (<class 'str'>) is valid. This runtime flexibility is essential when passing evolving payloads through AI pipelines.",
      "Python's Core Built-in Data Types:\n• int (42) — Whole numbers (e.g., prompt_tokens = 850, completion_tokens = 320, total_tokens = 1170)\n• float (3.14) — Decimal values (e.g., temperature = 0.7, similarity_score = 0.92)\n• str ('Hello') — Text strings (prompts, user queries, system instructions, model completions)\n• bool (True/False) — Conditional decision-making (e.g., is_authenticated = True, tool_available = True)\n• NoneType (None) — Absence of a value (e.g., tool_result = None before a tool finishes execution)\n• list ([1, 2, 3]) — Mutable ordered sequences (e.g., documents = ['Doc 1', 'Doc 2'])\n• tuple ((1, 2, 3)) — Immutable sequences (e.g., model_config = ('gpt-4o', 0.7, 4096))\n• set ({1, 2, 3}) — Unique deduplicated elements (e.g., tags = {'python', 'ai', 'rag'})\n• dict ({'name': 'Adi'}) — Key-value structures (e.g., message = {'role': 'user', 'content': 'Explain RAG'})"
    ]
  },
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "You might wonder: 'Why spend time learning variables and data types when I want to build AI applications?' Because almost every AI system is ultimately processing and transforming data.",
      "Consider the lifecycle of an AI assistant: User Question (str) → Python Variable → Prompt Construction (f-string) → API Request (dict/JSON) → Model Response (str) → Python Variable → Application UI. At every single step, Python variables and data structures are holding and mutating application state.",
      "The complete engineering foundation builds systematically: Variables → Data Types → Data Structures → Functions → APIs → AI Pipelines → AI Agents."
    ]
  },
  architecture: {
    title: "3 · Architecture: Python Data Flow in AI Applications",
    flowSummary:
      "USER Query (str) → Python Variables (Logic) → Prompt (str) / Documents (list) / Config (dict) → AI Model Inference → Model Response (str)",
    flowSteps: [
      {
        step: "01",
        label: "User Query Ingestion",
        desc: "Raw user question arrives as a string variable ('What is RAG?')."
      },
      {
        step: "02",
        label: "Prompt & Context Prep",
        desc: "Variables assemble multi-line f-string prompt, retrieved list of documents, and config dict."
      },
      {
        step: "03",
        label: "Model API Execution",
        desc: "Structured dictionary payload ({'model': 'gpt-4o', 'messages': [...]}) is sent to the LLM."
      },
      {
        step: "04",
        label: "Response Extraction",
        desc: "Model completion string is parsed, bound to a response variable, and returned to UI."
      }
    ],
    paragraphs: [
      "AI engineering is largely about moving, validating, and transforming data between components. Python's data types provide the fundamental foundation for that movement."
    ]
  },
  code: {
    title: "4 · Code: AI Configuration, Dynamic Prompts & Type Conversion",
    before: {
      filename: "naive_data_types.py",
      language: "PYTHON",
      code: `# Naive untyped variables & string concatenation
assistant_name = "AI Engineer Hub"
model = "AI Assistant"
temperature = "0.7"   # Problem: Stored as string, cannot perform numeric comparisons!
max_tokens = "1000"   # Problem: Stored as string, breaks token arithmetic!
enabled = "True"      # Problem: Stored as string, bool("False") is still True!

# Inflexible prompt concatenation
system_prompt = "You are an AI Engineering tutor.\\nExplain concepts clearly."
user_query = "What is a Python dictionary?"
prompt = system_prompt + "\\n\\nUser Question:\\n" + user_query

# Type mismatch causes runtime failure:
tokens_used = 150
# total_remaining = max_tokens - tokens_used  # TypeError: unsupported operand '-'`,
      problems: [
        "Storing numeric and boolean config values as strings causes runtime math and logic errors",
        "String concatenation with '+' is error-prone and hard to maintain across multi-line prompts",
        "Unstructured loose variables pollute the namespace instead of using structured dictionaries"
      ]
    },
    after: {
      filename: "production_ai_types.py",
      language: "PYTHON",
      code: `# 1. Properly Typed AI Assistant Configuration
assistant_name: str = "AI Engineer Hub"
model: str = "AI Assistant"
temperature: float = 0.7
max_tokens: int = 1000
enabled: bool = True

# Structured Configuration Dictionary
config = {
    "assistant_name": assistant_name,
    "model": model,
    "temperature": temperature,
    "max_tokens": max_tokens,
    "enabled": enabled
}

# 2. Dynamic Prompt Construction with Multi-line F-Strings
system_prompt = """You are an AI Engineering tutor.
Explain concepts clearly with practical examples."""

user_query = "What is a Python dictionary?"

prompt = f"""{system_prompt}

User Question:
{user_query}"""

# 3. Explicit Safe Type Conversions
raw_age = "25"
age = int(raw_age)                  # str -> int (25)
similarity = float("0.92")          # str -> float (0.92)
token_str = str(4096)               # int -> str ("4096")
is_active = bool(1)                 # int -> bool (True)

print(f"Generated Prompt:\\n{prompt}\\n")
print(f"Validated Model Config: {config}")`,
      improvements: [
        "Native primitive types (int, float, bool) guarantee exact arithmetic and conditional branching",
        "Multi-line f-strings cleanly format dynamic prompts for RAG and agent systems",
        "Structured dictionary bundles configuration state cleanly for API request payloads"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: AI Data Pipeline & Dynamic Prompt Generator",
    description:
      "Experiment with nested dictionary state mutations, dynamic f-string prompt construction, and type casting.",
    scenarios: [
      {
        name: "Dynamic Prompt Generator (RAG)",
        method: "PYTHON",
        endpoint: "prompt_generator.py",
        payload: `name = "Adi"\ntopic = "RAG"\nlevel = "beginner"\nprompt = f"Create a {level}-level explanation of {topic} for a learner named {name}."`,
        expectedStatus: 200,
        statusText: "GENERATED",
        response: `"Create a beginner-level explanation of RAG for a learner named Adi."`,
        explanation:
          "F-strings allow dynamically injecting variables into prompt templates without altering the core codebase."
      },
      {
        name: "Dynamic Prompt Switch (AI Agents)",
        method: "PYTHON",
        endpoint: "prompt_generator.py",
        payload: `topic = "AI Agents"\nprompt = f"Create a {level}-level explanation of {topic} for a learner named {name}."`,
        expectedStatus: 200,
        statusText: "GENERATED",
        response: `"Create a beginner-level explanation of AI Agents for a learner named Adi."`,
        explanation:
          "Changing only the topic variable produces a completely different prompt, illustrating dynamic prompt engineering."
      },
      {
        name: "Nested Dictionary & List Mutation",
        method: "PYTHON",
        endpoint: "state_pipeline.py",
        payload: `user = {\n  "name": "Adi",\n  "skills": ["Python", "RAG", "AI Agents"],\n  "experience": 3,\n  "active": True\n}\nuser["skills"].append("LLM Engineering")`,
        expectedStatus: 200,
        statusText: "MUTATED",
        response: `{"name": "Adi", "skills": ["Python", "RAG", "AI Agents", "LLM Engineering"], "experience": 3, "active": True}`,
        explanation:
          "Lists inside dictionaries are mutable, enabling in-place session memory and skill accumulation for AI agents."
      }
    ]
  },
  observe: {
    title: "6 · Observe: Key Observations on Python Data Behaviors",
    metrics: [
      { label: "Typing System", value: "Dynamic", status: "good", note: "Types inferred & checked at runtime" },
      { label: "Dict Key Lookup", value: "O(1) Time", status: "good", note: "Constant-time hash table access" },
      { label: "List Mutability", value: "Mutable", status: "good", note: "In-place append and modification" },
      { label: "Tuple Mutability", value: "Immutable", status: "good", note: "Guaranteed fixed configuration safety" }
    ],
    logs: [
      {
        time: "00:00:00.001",
        level: "INFO",
        tag: "Observation 1",
        message: "Python dynamically rebinds types: x = 10 (int) -> x = 'hello' (str)."
      },
      {
        time: "00:00:00.003",
        level: "INFO",
        tag: "Observation 2",
        message: "Nested structure: dict contains str keys, list values with nested str elements."
      },
      {
        time: "00:00:00.005",
        level: "INFO",
        tag: "Observation 3",
        message: "AI API request: list of message dicts [{'role': 'system'}, {'role': 'user'}] parsed successfully."
      }
    ]
  },
  production: {
    title: "7 · Production: Best Practices for Variables & State",
    rules: [
      {
        title: "Use Descriptive Variable Names",
        description:
          "Prefer 'user_query = \"What is RAG?\"' over 'x = \"What is RAG?\"'. Explicit semantic naming makes complex AI agent graphs readable and maintainable.",
        impact: "Eliminates ambiguity in prompt construction and pipeline state tracking."
      },
      {
        title: "Avoid Unnecessary Abbreviations",
        description:
          "Prefer 'retrieved_documents = []' instead of 'rd = []'. In production AI engineering, code clarity supersedes typing brevity.",
        impact: "Prevents naming collisions and eases team onboarding."
      },
      {
        title: "Keep Related Data Together",
        description:
          "Group related values into a dictionary (e.g. user = {'name': 'Adi', 'role': 'AI Engineer', 'experience': 3}) rather than fragmented loose variables.",
        impact: "Simplifies passing application state across function boundaries and API endpoints."
      },
      {
        title: "Understand Incoming API Response Schemas",
        description:
          "Never assume an API response is just a string. Production LLM responses arrive as nested dictionaries with status, metadata, token usage, and choice objects.",
        impact: "Prevents runtime AttributeError and KeyError exceptions in production services."
      }
    ]
  },
  challenge: {
    title: "8 · Challenge: Build an AI Course Configuration",
    prompt:
      "Create a Python program that stores information about an AI course in a dictionary with keys: name (str), instructor (str), duration (int), price (float), topics (list of str), and published (bool). Print each field, then use an f-string to generate a dynamic message: 'AI Engineer Hub offers [COURSE] covering [NUMBER] topics.'",
    hint: "Access dictionary keys with bracket notation course['name'] and get the list count using len(course['topics']).",
    solutionCode: `# Build an AI Course Configuration
course = {
    "name": "Python for AI Engineering",
    "instructor": "Adi",
    "duration": 30,
    "price": 999.99,
    "topics": ["Variables & Data Types", "Control Flow", "RAG Pipelines", "AI Agents"],
    "published": True
}

# Print individual fields
print("Course Name:", course["name"])
print("Instructor:", course["instructor"])
print("Duration (days):", course["duration"])
print("Price: $", course["price"])
print("Number of topics:", len(course["topics"]))
print("Published status:", course["published"])

# Bonus Challenge: Dynamic summary message using an f-string
message = f"AI Engineer Hub offers {course['name']} covering {len(course['topics'])} topics."
print("\\n" + message)`
  },
  checklist: [
    { id: "c1", text: "Explain what a Python variable is and how it references memory", category: "Core Concept" },
    { id: "c2", text: "Create and assign variables with descriptive semantic names", category: "Syntax" },
    { id: "c3", text: "Understand dynamic typing and runtime type rebinding", category: "Type System" },
    { id: "c4", text: "Identify and use integers (int) for token counts and indexing", category: "Data Types" },
    { id: "c5", text: "Identify and use floats (float) for temperature and similarity scores", category: "Data Types" },
    { id: "c6", text: "Identify and format strings (str) for prompts and completions", category: "Data Types" },
    { id: "c7", text: "Identify and evaluate booleans (bool) for conditional branching", category: "Data Types" },
    { id: "c8", text: "Understand None (NoneType) for absent/uninitialized tool outputs", category: "Data Types" },
    { id: "c9", text: "Create and modify mutable lists (list) for document collections", category: "Data Structures" },
    { id: "c10", text: "Understand immutable tuples (tuple) for fixed configurations", category: "Data Structures" },
    { id: "c11", text: "Understand sets (set) for unique deduplicated metadata tags", category: "Data Structures" },
    { id: "c12", text: "Create dictionaries (dict) for structured API payloads and schemas", category: "Data Structures" },
    { id: "c13", text: "Access and update dictionary values using key indexing", category: "Data Structures" },
    { id: "c14", text: "Work with nested lists and dictionaries (e.g., chat message history)", category: "Data Structures" },
    { id: "c15", text: "Convert between common data types (int, float, str, bool)", category: "Type Casting" },
    { id: "c16", text: "Build dynamic prompts using multi-line Python f-strings", category: "Prompting" },
    { id: "c17", text: "Recognize these data structures in real AI model API payloads", category: "AI Engineering" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What is the data type of 'temperature = 0.7' in Python?",
      options: ["float", "int", "str", "bool"],
      correctIndex: 0,
      explanation: "Numbers with decimal points are automatically inferred as 'float' in Python."
    },
    {
      id: "q2",
      question: "What is the data type of 'name = \"Python\"'?",
      options: ["str", "char", "text", "object"],
      correctIndex: 0,
      explanation: "Text enclosed in quotes is represented by the built-in 'str' (string) type."
    },
    {
      id: "q3",
      question: "Which Python data structure stores key-value pairs (e.g. {'role': 'user', 'content': 'Explain RAG'})?",
      options: ["dict", "list", "tuple", "set"],
      correctIndex: 0,
      explanation: "Dictionaries ('dict') store associations between unique keys and corresponding values."
    },
    {
      id: "q4",
      question: "What will 'skills = [\"Python\", \"RAG\"]; skills.append(\"Agents\"); print(skills)' produce?",
      options: [
        "['Python', 'RAG', 'Agents']",
        "['Agents', 'Python', 'RAG']",
        "('Python', 'RAG', 'Agents')",
        "TypeError: list is immutable"
      ],
      correctIndex: 0,
      explanation: "The .append() method mutates the list in place by appending the new element to the end."
    },
    {
      id: "q5",
      question: "What does 'result = None' represent in Python?",
      options: [
        "The variable currently has no value / represents the absence of a value",
        "An empty string \"\"",
        "The integer 0",
        "A syntax error"
      ],
      correctIndex: 0,
      explanation: "None is Python's singleton NoneType object representing the intentional absence of a value."
    },
    {
      id: "q6",
      question: "What will 'x = \"10\"; print(type(x))' output?",
      options: [
        "<class 'str'>",
        "<class 'int'>",
        "<class 'number'>",
        "<class 'float'>"
      ],
      correctIndex: 0,
      explanation: "Even though '10' contains digits, enclosing it in quotes makes it a string (<class 'str'>)."
    },
    {
      id: "q7",
      question: "Which structure is standardly used to represent an AI chat message like {'role': 'user', 'content': 'Explain RAG'}?",
      options: [
        "A Python dictionary (dict)",
        "A Python tuple",
        "A Python set",
        "A Python generator"
      ],
      correctIndex: 0,
      explanation: "AI API payloads format individual chat messages as key-value dictionaries."
    }
  ],
  skillsCount: 8,
  sectionsCount: 11,
  technologies: ["Python", "Variables", "Data Types", "Prompt Engineering", "LLM APIs"],
  updatedDate: "2025-01-14"
};
