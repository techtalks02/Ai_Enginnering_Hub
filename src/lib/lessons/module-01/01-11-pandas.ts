import { DetailedLessonContent } from "../types";

export const lesson01_11: DetailedLessonContent = {
  chapterNumber: 11,
  categoryBadge: "Foundations · 20 min read · Beginner → Intermediate",
  subtitle:
    "Master Pandas DataFrames, vectorized filtering, groupby aggregations, and feature wrangling for clean fine-tuning dataset preparation and evaluation benchmarking.",
  concept: {
    title: "1 · Concept: Tabular Data Structures & Vectorized Wrangling",
    paragraphs: [
      "Pandas is the premier data manipulation library for tabular datasets in AI and ML engineering. Behind its high-level API, DataFrames leverage column-oriented NumPy arrays and Apache Arrow memory buffers for fast filtering, missing-data imputation, and grouped aggregations.",
      "In AI engineering workflows, Pandas is indispensable for cleaning prompt-completion training pairs, deduplicating evaluation benchmarks, analyzing token cost distributions, and calculating BLEU/ROUGE model metrics."
    ]
  },
  whyItMatters: {
    title: "2 · Why It Matters in AI Engineering",
    paragraphs: [
      "Garbage in, garbage out. If a fine-tuning dataset contains duplicated rows, corrupted prompt columns, or extreme outliers in token length, model training fails or converges poorly.",
      "Pandas allows you to audit, clean, and export structured JSONL training datasets with concise, vectorized expressions."
    ]
  },
  architecture: {
    title: "3 · Architecture: Dataset Cleansing & Benchmarking Pipeline",
    flowSummary:
      "Raw CSV / JSON Log Files → Pandas DataFrame Ingestion → Missing Value & Length Filter → Groupby Token Cost Aggregation → Clean JSONL Export",
    flowSteps: [
      { step: "01", label: "Ingestion & Schema", desc: "Load raw logs into a typed DataFrame with specified column dtypes." },
      { step: "02", label: "Vectorized Filtering", desc: "Remove records with empty completions or token lengths exceeding 4096." },
      { step: "03", label: "Groupby Analytics", desc: "Aggregate latency and token consumption metrics by model name." },
      { step: "04", label: "Fine-Tuning Export", desc: "Serialize cleaned DataFrame directly to JSON Lines (.to_json(orient='records', lines=True))." }
    ],
    paragraphs: [
      "Columnar vectorization cleans hundreds of thousands of prompt examples in seconds."
    ]
  },
  code: {
    title: "4 · Code: Cleaning Fine-Tuning Datasets with Pandas",
    before: {
      filename: "naive_cleaning.py",
      language: "PYTHON",
      code: `# Slow manual looping to clean CSV data
import csv

def clean_data(filepath):
    cleaned = []
    with open(filepath, "r") as f:
        reader = csv.DictReader(f)
        for row in reader: # Slow row-by-row Python loop
            if row["prompt"] and len(row["prompt"]) > 10:
                cleaned.append(row)
    return cleaned`,
      problems: [
        "Iterates row-by-row in Python without vectorized column operations",
        "Lacks schema casting, date parsing, or statistical validation",
        "Difficult to compute summary aggregations"
      ]
    },
    after: {
      filename: "production_pandas_pipeline.py",
      language: "PYTHON",
      code: `import pandas as pd
from pathlib import Path

def clean_and_export_finetuning_dataset(
    input_path: Path,
    output_path: Path,
    max_token_len: int = 4096
) -> pd.DataFrame:
    """Production vectorized data wrangling pipeline for LLM fine-tuning data."""
    # 1. Ingest with optimized types
    df = pd.read_csv(input_path)
    
    # 2. Vectorized cleaning: drop nulls and strip whitespace
    df = df.dropna(subset=["prompt", "completion"]).copy()
    df["prompt"] = df["prompt"].str.strip()
    df["completion"] = df["completion"].str.strip()
    
    # 3. Vectorized length filter & token length calculation
    df["prompt_char_len"] = df["prompt"].str.len()
    mask = (df["prompt_char_len"] > 10) & (df["prompt_char_len"] <= max_token_len * 4)
    cleaned_df = df[mask].copy()
    
    # 4. Export directly to JSONL format for OpenAI / HuggingFace training
    cleaned_df[["prompt", "completion"]].to_json(
        output_path, orient="records", lines=True, force_ascii=False
    )
    
    return cleaned_df`,
      improvements: [
        "Vectorized string operations (.str.strip(), .str.len()) execute at C-speed",
        "Boolean masking cleanly filters out corrupt or out-of-bounds training examples",
        "Direct export to JSONL format matching HuggingFace and OpenAI fine-tuning specifications"
      ]
    }
  },
  experiment: {
    title: "5 · Experiment: Dataset Wrangling & JSONL Export",
    description: "Verify that Pandas pipeline filters outliers and outputs valid JSONL training data.",
    scenarios: [
      {
        name: "Fine-Tuning Data Cleansing (50,000 Rows)",
        method: "PYTHON",
        endpoint: "clean_and_export_finetuning_dataset()",
        payload: '{"total_rows": 50000, "corrupt_rows": 3200}',
        expectedStatus: 200,
        statusText: "EXPORT_READY",
        response: '{"cleaned_rows": 46800, "jsonl_size_mb": 34.2, "latency_ms": 142}',
        explanation: "Processed and exported 46,800 validated training pairs in 142ms."
      }
    ]
  },
  observe: {
    title: "6 · Observe: Data Wrangling Telemetry",
    metrics: [
      { label: "Pipeline Speed", value: "142ms / 50k", status: "good", note: "Vectorized C-engine" },
      { label: "Filtered Rows", value: "3,200 Removed", status: "good", note: "Corrupt & Outlier data" },
      { label: "JSONL Export", value: "100% Valid", status: "good", note: "UTF-8 verified" },
      { label: "Memory Footprint", value: "Columnar", status: "good", note: "Zero unnecessary copies" }
    ],
    logs: [
      { time: "00:00:00.010", level: "INFO", tag: "PandasPipeline", message: "Loaded 50,000 rows into DataFrame." },
      { time: "00:00:00.142", level: "INFO", tag: "PandasPipeline", message: "Exported 46,800 clean pairs to training_data.jsonl." }
    ]
  },
  production: {
    title: "7 · Production: Pandas Best Practices for AI",
    rules: [
      { title: "Avoid .apply(axis=1) When Vectorization is Available", description: "Use native vectorized methods (.str, .dt, boolean indexing) instead of row-by-row apply().", impact: "Cuts execution times by 20x-50x." },
      { title: "Validate Datasets with Schema Assertions", description: "Assert df['prompt'].isna().sum() == 0 before starting expensive fine-tuning jobs.", impact: "Saves hours of wasted GPU training compute." }
    ]
  },
  challenge: {
    title: "8 · Challenge: Calculate Average Completion Length by Model",
    prompt: "Write a function 'average_length_by_model(df: pd.DataFrame) -> pd.Series' that computes the mean completion character length grouped by the 'model' column.",
    hint: "Calculate length column with df['completion'].str.len() and call .groupby('model')['length'].mean().",
    solutionCode: `import pandas as pd

def average_length_by_model(df: pd.DataFrame) -> pd.Series:
    df_copy = df.copy()
    df_copy["comp_len"] = df_copy["completion"].str.len()
    return df_copy.groupby("model")["comp_len"].mean()`
  },
  checklist: [
    { id: "c1", text: "Use vectorized string and boolean indexing for dataset preparation", category: "Performance" },
    { id: "c2", text: "Export cleaned training datasets to JSONL format using .to_json()", category: "Fine-Tuning" },
    { id: "c3", text: "Validate column constraints before initiating model fine-tuning", category: "Validation" }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Which method in Pandas allows exporting a DataFrame directly to the JSON Lines format used for fine-tuning LLMs?",
      options: [
        "df.to_json('data.jsonl', orient='records', lines=True)",
        "df.to_csv('data.jsonl')",
        "df.save_as_json_lines()",
        "df.dump_llm()"
      ],
      correctIndex: 0,
      explanation: "Using orient='records' and lines=True serializes each row as a standalone JSON object separated by newlines."
    }
  ],
  skillsCount: 6,
  sectionsCount: 11,
  technologies: ["Python", "Pandas", "Data Wrangling", "JSONL", "Fine-Tuning"],
  updatedDate: "2025-01-14"
};
