"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Play,
  BookOpen,
  Clock,
  Lock,
  CheckCircle2,
  Target,
  FileText,
  Download,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Check,
  Layers,
  GraduationCap,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getLessonPath } from "@/lib/lesson-content";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type?: "Build" | "Learn" | "Deploy" | "Monitor" | "Security" | string;
  tech?: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | string;
  isFree?: boolean;
  link?: string;
}

export interface ModuleData {
  id: string;
  num: string;
  title: string;
  description: string;
  youWillBuild: string;
  totalDuration: string;
  lessonsCount: number;
  category: string;
  lessons: Lesson[];
}

export const MODULES_LIST: ModuleData[] = [

  {
    id: "01",
    num: "01",
    title: "Python Fundamentals",
    description: "Master Python fundamentals from variables and loops to decorators and async programming, the true language of AI engineering.",
    youWillBuild: "High-performance Python applications with custom memory management and concurrency patterns.",
    totalDuration: "3h 45m",
    lessonsCount: 11,
    category: "Foundations",
    lessons: [
      { id: "01-1", title: "Python Variables & Data Types", duration: "15:00", type: "Build", tech: "Python", isFree: true },
      { id: "01-2", title: "Control Flow & Functions", duration: "18:30", type: "Learn", tech: "Git" },
      { id: "01-3", title: "Object-Oriented Python", duration: "22:15", type: "Build", tech: "Cloud" },
      { id: "01-4", title: "Lists in Python: Methods & Manipulation", duration: "12:40", type: "Build", tech: "Security" },
      { id: "01-5", title: "Tuples in Python", duration: "14:10", type: "Build", tech: "Python" },
      { id: "01-6", title: "Sets in Python: Operations & Applications", duration: "16:20", type: "Build", tech: "Shell" },
      { id: "01-7", title: "Dictionaries in Python", duration: "25:00", type: "Build", tech: "Docker" },
      { id: "01-8", title: "Error Handling, Debugging & Logging", duration: "14:00", type: "Build", tech: "IDE" },
      { id: "01-9", title: "File Handling in Python: Reading & Writing to Files", duration: "16:45", type: "Build", tech: "Python" },
      { id: "01-10", title: "NumPy arrays", duration: "11:30", type: "Learn", tech: "Shell" },
      { id: "01-11", title: "Pandas DataFrames for Data Wrangling", duration: "20:00", type: "Learn", tech: "Linux" },

    ]
  },
  {
    id: "02",
    num: "02",
    title: "Math Foundations",
    description: "Linear algebra, calculus, probability, and statistics—the essential mathematical toolkit for understanding AI at a deeper level than just prompt engineering.",
    youWillBuild: "Linear Algebra for Machine Learning",
    totalDuration: "5h 31m",
    lessonsCount: 10,
    category: "Foundations",
    lessons: [
      { id: "02-1", title: "Linear Algebra Intuition", duration: "18:20", type: "Learn", tech: "Python", isFree: true },
      { id: "02-2", title: "Vectors, Matrices & Operations", duration: "16:45", type: "Learn", tech: "Python" },
      { id: "02-3", title: "Matrix Transformations", duration: "14:15", type: "Learn", tech: "Python" },
      { id: "02-4", title: "Calculus for Machine Learning", duration: "21:10", type: "Learn", tech: "Python" },
      { id: "02-5", title: "Vectors Matrices & Tensors", duration: "19:30", type: "Learn", tech: "Python" },
      { id: "02-6", title: "Chain Rule & Automatic Differentiation", duration: "24:00", type: "Learn", tech: "Python" },
      { id: "02-7", title: "Probability Distributions", duration: "24:00", type: "Learn", tech: "Python" },
      { id: "02-8", title: "Bayes' Theorem", duration: "24:00", type: "Learn", tech: "Python" },
      { id: "02-9", title: "Statistics for Data Science", duration: "24:00", type: "Learn", tech: "Python" },
      { id: "02-10", title: "Optimization Algorithms", duration: "24:00", type: "Learn", tech: "Python" },
      { id: "02-11", title: "Linear Systems", duration: "24:00", type: "Learn", tech: "Python" },
      { id: "02-12", title: "Graph Theory for Machine Learning", duration: "24:00", type: "Learn", tech: "Python" },

    ]
  },
  {
    id: "03",
    num: "03",
    title: "ML Fundamentals",
    description: "Linear Regression, Logistic Regression, Decision Trees, Support Vector Machines, K-Nearest Neighbors, Ensemble Methods, and Evaluation Metrics.",
    youWillBuild: "end-to-end Machine Learning pipelines from data preprocessing and feature engineering to model selection, evaluation, and deployment.",
    totalDuration: "5h 26m",
    lessonsCount: 12,
    category: "ML",
    lessons: [
      { id: "03-1", title: "What Is Machine Learning", duration: "17:40", type: "Learn", tech: "NLP" },
      { id: "03-2", title: "Linear Regression from Scratch", duration: "15:20", type: "Learn", tech: "Math" },
      { id: "03-3", title: "Logistic Regression & Classification", duration: "22:15", type: "Build", tech: "Python" },
      { id: "03-4", title: "Decision Trees and Random Forests", duration: "20:30", type: "Build", tech: "Transformers" },
      { id: "03-5", title: "Support Vector Machines", duration: "20:30", type: "Build", tech: "Transformers" },
      { id: "03-6", title: "KNN & Distance Metrics", duration: "20:30", type: "Build", tech: "Transformers" },
      { id: "03-7", title: "Unsupervised Learning : K-Means & Hierarchical Clustering , DBSCAN", duration: "20:30", type: "Build", tech: "Transformers" },
      { id: "03-8", title: "Feature Engineering & Selection", duration: "20:30", type: "Build", tech: "Transformers" },
      { id: "03-9", title: "Model Evaluation & Metrics", duration: "20:30", type: "Build", tech: "Transformers" },
      { id: "03-10", title: "Ensemble Methods: Bagging, Boosting & Stacking", duration: "20:30", type: "Build", tech: "Transformers" },
      { id: "03-11", title: "Hyperparameter Tuning", duration: "20:30", type: "Build", tech: "Transformers" },
      { id: "03-12", title: "ML Pipelines & Experimental Tracking", duration: "20:30", type: "Build", tech: "Transformers" },

    ]
  },
  {
    id: "04",
    num: "04",
    title: "Deep Learning Core",
    description: "Neural Networks, CNNs, RNNs, Transformers, Optimization Algorithms, and Evaluation Metrics.",
    youWillBuild: "end-to-end Deep Learning pipelines from data preprocessing and feature engineering to model selection, evaluation, and deployment.",
    totalDuration: "4h 53m",
    lessonsCount: 10,
    category: "Deep Learning",
    lessons: [
      { id: "04-1", title: "Introduction to Neural Networks", duration: "24:10", type: "Learn", tech: "LLM", isFree: true },
      { id: "04-2", title: "Multi-Layer Networks and Forward Pass", duration: "18:25", type: "Build", tech: "LangChain" },
      { id: "04-3", title: "Backpropagation from Scratch", duration: "19:40", type: "Build", tech: "Python" },
      { id: "04-4", title: "Activation Functions:ReLU,GeLU,Sigmoid", duration: "26:15", type: "Build", tech: "LangChain" },
      { id: "04-5", title: "Optimization Algorithms", duration: "26:15", type: "Build", tech: "LangChain" },
      { id: "04-6", title: "Convolutional Neural Networks", duration: "26:15", type: "Build", tech: "LangChain" },
      { id: "04-7", title: "Recurrent Neural Networks", duration: "26:15", type: "Build", tech: "LangChain" },
      { id: "04-8", title: "Attention & Transformer Architecture", duration: "26:15", type: "Build", tech: "LangChain" },
      { id: "04-9", title: "Deep Learning Evaluations and Model Diagnostics", duration: "26:15", type: "Build", tech: "LangChain" },
      { id: "04-10", title: "End to End Deep Learning Pipeline", duration: "26:15", type: "Build", tech: "LangChain" },
    ]
  },
  {
    id: "05",
    num: "05",
    title: "Computer Vision",
    description: "Image Processing, Convolutional Neural Networks, Object Detection, Segmentation, and Transfer Learning.",
    youWillBuild: "Computer Vision models with image classification, object detection, and image segmentation.",
    totalDuration: "4h 15m",
    lessonsCount: 18,
    category: "Computer Vision",
    lessons: [
      { id: "05-1", title: "Introduction to Computer Vision", duration: "19:00", type: "Learn", tech: "Computer Vision" },
      { id: "05-2", title: "Image Processing", duration: "22:30", type: "Build", tech: "Computer Vision" },
      { id: "05-3", title: "Convolutional Neural Networks", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-4", title: "Object Detection", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-5", title: "Image Classification", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-6", title: "Transfer Learning & Fine-Tuning", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-7", title: "Image Generation", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-8", title: "Video Understanding", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-9", title: "Vision Transformers (ViT)", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-10", title: "3D Computer Vision", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-11", title: "Real Time Vision - Edge Deployment", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-12", title: "Diffusion Models", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-13", title: "Generative Adversarial Networks", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-14", title: "Self Supervised Learning in Vision", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-15", title: "Transformers in Vision", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-16", title: "Vision-Language Models", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-17", title: "Transformers in Vision", duration: "17:15", type: "Build", tech: "Computer Vision" },
      { id: "05-18", title: "Computer Vision in Production", duration: "17:15", type: "Build", tech: "Computer Vision" },
    ]
  },
  {
    id: "06",
    num: "06",
    title: "NLP: Foundations to Advanced",
    description: "Text Processing Pipelines, Foundational Models, and Large Language Applications.",
    youWillBuild: "Build end-to-end NLP pipelines for text processing, semantic search, text classification, and large language applications.",
    totalDuration: "6h 10m",
    lessonsCount: 20,
    category: "NLP",
    lessons: [
      { id: "06-1", title: "Introduction to Natural Language Processing", duration: "20:15", type: "Learn", tech: "NLP" },
      { id: "06-2", title: "Text Preprocessing and Normalization", duration: "25:40", type: "Build", tech: "NLP" },
      { id: "06-3", title: "Tokenization and Sentence Segmentation", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-4", title: "Stemming, Lemmatization, and Stop Words", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-5", title: "Part-of-Speech Tagging", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-6", title: "Named Entity Recognition (NER)", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-7", title: "N-Grams and Language Modeling", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-8", title: "Text Classification", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-9", title: "Bag of Words and TF-IDF", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-10", title: "Sentiment Analysis", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-11", title: "Word Embeddings and Distributed Representations", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-12", title: " GloVe and FastText: Global Word Representations", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-13", title: "Neural NLP with Embeddings", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-14", title: "RNNs for Natural Language Processing", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-15", title: "LSTMs and GRUs for Sequence Modeling", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-16", title: "Attention Mechanism & Transformers based NLP", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-17", title: "Large Language Models and Pre-trained Models", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-18", title: "LLM Evaluation — RAGAS, DeepEval, G-Eval", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-19", title: "Text Generation with Pre-trained Transformers", duration: "21:10", type: "Build", tech: "NLP" },
      { id: "06-20", title: "Advanced NLP Techniques: Attention Mechanisms & Model Architectures", duration: "21:10", type: "Build", tech: "NLP" },

    ]
  },
  {
    id: "07",
    num: "07",
    title: "Transformers Deep Dive",
    description: "Encoder-decoder stacks, attention variants, scaling laws, and model compression.",
    youWillBuild: "Transformers from scratch, scaling strategies, and model optimization techniques",
    totalDuration: "6h 30m",
    lessonsCount: 10,
    category: "Transformers",
    lessons: [
      { id: "07-1", title: "Why Transformers — The Problems with RNNs", duration: "19:30", type: "Learn", tech: "RAG" },
      { id: "07-2", title: "Self-Attention from Scratch", duration: "27:10", type: "Build", tech: "Databases" },
      { id: "07-3", title: "Multi-Head Attention", duration: "24:45", type: "Build", tech: "RAG" },
      { id: "07-4", title: "Positional Encoding: Sinusoidal, RoPE, ALiBi", duration: "21:00", type: "Build", tech: "RAG" },
      { id: "07-5", title: "The Full Transformer — Encoder + Decoder", duration: "21:00", type: "Build", tech: "RAG" },
      { id: "07-6", title: "BERT — Masked Language Modeling", duration: "21:00", type: "Build", tech: "RAG" },
      { id: "07-7", title: "GPT — Causal Language Modeling", duration: "21:00", type: "Build", tech: "RAG" },
      { id: "07-8", title: "T5 — Text-to-Text Framework", duration: "21:00", type: "Build", tech: "RAG" },
      { id: "07-9", title: "Vision Transformers (ViT)", duration: "21:00", type: "Build", tech: "RAG" },
      { id: "07-10", title: "Build a Transformer from Scratch — The Capstone", duration: "21:00", type: "Build", tech: "RAG" },


    ]
  },
  {
    id: "08",
    num: "08",
    title: "Generative AI",
    description: "Generative AI from foundational concepts to modern generative models, including LLMs, diffusion models, multimodal AI, prompting, inference, generation strategies, and production applications",
    youWillBuild: "Build end-to-end generative AI applications including LLM-based applications, image generation systems, multimodal AI solutions, and production-ready generative AI pipelines",
    totalDuration: "9h 10m",
    lessonsCount: 18,
    category: "Generative AI",
    lessons: [
      { id: "08-1", title: "Generative AI: Core Concepts, Applications, and the AI Ecosystem", duration: "18:50", type: "Learn", tech: "Generative AI" },
      { id: "08-2", title: "Discriminative vs Generative Models", duration: "26:30", type: "Learn", tech: "Generative AI" },
      { id: "08-3", title: "Generative Model Architectures", duration: "16:20", type: "Learn", tech: "Generative AI" },
      { id: "08-4", title: "Large Language Models (LLMs): Evolution", duration: "16:20", type: "Learn", tech: "Generative AI" },
      { id: "08-5", title: "Language Models and Next-Token Prediction", duration: "16:20", type: "Learn", tech: "Generative AI" },
      { id: "08-6", title: "LLM Inference and Text Generation", duration: "16:20", type: "Learn", tech: "Generative AI" },
      { id: "08-7", title: "Sampling Strategies: Temperature, Top-K, and Top-P", duration: "16:20", type: "Learn", tech: "Generative AI" },
      { id: "08-8", title: "Prompt Engineering: From Zero to Production-Ready", duration: "16:20", type: "Learn", tech: "Generative AI" },
      { id: "08-9", title: "Advanced Techniques for Building Better Generative AI Applications", duration: "16:20", type: "Learn", tech: "Generative AI" },
      { id: "08-10", title: "Image Generation and Diffusion Models", duration: "16:20", type: "Learn", tech: "Generative AI" },
      { id: "08-11", title: "Multimodal Generative AI", duration: "16:20", type: "Learn", tech: "Generative AI" },
      { id: "08-12", title: "Vision-Language Models", duration: "16:20", type: "Learn", tech: "Generative AI" },
      { id: "08-13", title: "Speech and Audio Generation", duration: "16:20", type: "Learn", tech: "Generative AI" },
      { id: "08-14", title: "Generative AI APIs and Model Integration", duration: "16:20", type: "Build", tech: "Generative AI" },
      { id: "08-15", title: "Generative AI Application Architecture", duration: "16:20", type: "Build", tech: "Generative AI" },
      { id: "08-16", title: "Deploying Generative AI Models", duration: "16:20", type: "Build", tech: "Generative AI" },
      { id: "08-17", title: "Generative AI Evaluation and Safety", duration: "16:20", type: "Build", tech: "Generative AI" },
      { id: "08-18", title: "Build an End-to-End Generative AI Application", duration: "16:20", type: "Build", tech: "Generative AI" },
    ]
  },
  {
    id: "09",
    num: "09",
    title: "LLMs from Scratch",
    description: "Build Large Language Models from the ground up, covering tokenization, embeddings, attention, Transformer blocks, GPT architecture, pretraining, evaluation, instruction tuning, fine-tuning, inference, and LLM optimization.",
    youWillBuild: "a GPT-style Large Language Model from scratch using Python, NumPy, and PyTorch, including the tokenizer, embeddings, self-attention, Transformer blocks, training pipeline, text generation, instruction tuning, evaluation, and optimized inference.",
    totalDuration: "20h 45m",
    lessonsCount: 40,
    category: "LLM Engineering",
    lessons: [
      { id: "09-1", title: "What is a Large Language Model?", duration: "22:00", type: "Learn", tech: "Python", isFree: true },
      { id: "09-2", title: "How LLMs Learn Language", duration: "25:00", type: "Learn", tech: "Python" },
      { id: "09-3", title: "Language Modeling and Next-Token Prediction", duration: "28:00", type: "Build", tech: "Python", },
      { id: "09-4", title: "LLM Training vs Inference", duration: "24:00", type: "Learn", tech: "Python", },
      { id: "09-5", title: "Text Tokenization Fundamentals", duration: "28:00", type: "Build", tech: "Python", },
      { id: "09-6", title: "Character-Level Tokenization", duration: "25:00", type: "Build", tech: "Python", },
      { id: "09-7", title: "Word-Level and Subword Tokenization", duration: "30:00", type: "Build", tech: "Python", },
      { id: "09-8", title: "BPE Tokenization from Scratch", duration: "35:00", type: "Build", tech: "Python" },


      { id: "09-9", title: "Token IDs, Vocabulary, and Special Tokens", duration: "25:00", type: "Build", tech: "Python" },
      { id: "09-10", title: "Token Embeddings", duration: "30:00", type: "Build", tech: "PyTorch" },
      { id: "09-11", title: "Positional Embeddings and Position Information", duration: "30:00", type: "Build", tech: "PyTorch" },
      { id: "09-12", title: "Context Windows and Sequence Length", duration: "25:00", type: "Learn", tech: "Python" },


      { id: "09-13", title: "Attention Mechanism from First Principles", duration: "32:00", type: "Build", tech: "NumPy" },
      { id: "09-14", title: "Query, Key, and Value Matrices", duration: "30:00", type: "Build", tech: "NumPy" },
      { id: "09-15", title: "Scaled Dot-Product Attention", duration: "35:00", type: "Build", tech: "PyTorch" },
      { id: "09-16", title: "Causal Self-Attention and Attention Masks", duration: "35:00", type: "Build", tech: "PyTorch" },
      { id: "09-17", title: "Multi-Head Self-Attention", duration: "38:00", type: "Build", tech: "PyTorch" },


      { id: "09-18", title: "Feed-Forward Networks", duration: "28:00", type: "Build", tech: "PyTorch" },
      { id: "09-19", title: "Residual Connections and Layer Normalization", duration: "30:00", type: "Build", tech: "PyTorch" },
      { id: "09-20", title: "Building a Transformer Block from Scratch", duration: "40:00", type: "Build", tech: "PyTorch" },
      { id: "09-21", title: "GPT Architecture Explained", duration: "30:00", type: "Learn", tech: "PyTorch" },
      { id: "09-22", title: "Building the GPT Model", duration: "45:00", type: "Build", tech: "PyTorch" },
      { id: "09-23", title: "Language Model Head and Logits", duration: "28:00", type: "Build", tech: "PyTorch" },
      { id: "09-24", title: "Cross-Entropy Loss for Language Modeling", duration: "30:00", type: "Build", tech: "PyTorch" },
      { id: "09-25", title: "Preparing a Dataset for LLM Training", duration: "32:00", type: "Build", tech: "Python" },
      { id: "09-26", title: "Creating Batches and Training Sequences", duration: "30:00", type: "Build", tech: "PyTorch" },
      { id: "09-27", title: "Building the LLM Training Loop", duration: "40:00", type: "Build", tech: "PyTorch" },
      { id: "09-28", title: "Optimizers, Learning Rates, and Schedulers", duration: "35:00", type: "Build", tech: "PyTorch" },
      { id: "09-29", title: "Validation, Checkpoints, and Training Monitoring", duration: "32:00", type: "Build", tech: "PyTorch" },


      { id: "09-30", title: "Generating Text from a Trained LLM", duration: "30:00", type: "Build", tech: "PyTorch" },
      { id: "09-31", title: "Greedy Decoding and Sampling", duration: "28:00", type: "Build", tech: "Python" },
      { id: "09-32", title: "Temperature, Top-K, and Top-P", duration: "30:00", type: "Build", tech: "Python" },

      { id: "09-33", title: "Pretraining vs Instruction Tuning", duration: "28:00", type: "Learn", tech: "Python" },
      { id: "09-34", title: "Instruction Dataset Preparation", duration: "35:00", type: "Build", tech: "Python" },
      { id: "09-35", title: "Supervised Fine-Tuning for LLMs", duration: "40:00", type: "Build", tech: "PyTorch" },

      { id: "09-36", title: "LLM Evaluation and Perplexity", duration: "32:00", type: "Build", tech: "Python" },
      { id: "09-37", title: "LLM Memory, Compute, and Parameter Scaling", duration: "30:00", type: "Learn", tech: "PyTorch" },
      { id: "09-38", title: "Mixed Precision and Efficient Training", duration: "35:00", type: "Build", tech: "PyTorch" },
      { id: "09-39", title: "Quantization and Efficient LLM Inference", duration: "38:00", type: "Build", tech: "PyTorch" },
      { id: "09-40", title: "Build a GPT-Style LLM Completely from Scratch", duration: "90:00", type: "Build", tech: "PyTorch" },
    ]
  },
  {
    id: "10",
    num: "10",
    title: "LLM Engineering",
    description: "A complete LLM Engineering journey covering model selection, APIs, inference, prompting, structured outputs, tool calling, context management, memory, caching, observability, evaluation, security, optimization, deployment, and production LLM systems.",
    youWillBuild: "production-ready LLM applications with model routing, structured generation, tool calling, context management, memory, streaming, caching, evaluation, observability, security, and scalable inference.",
    totalDuration: "45h 40m",
    lessonsCount: 40,
    category: "LLM Engineering",
    lessons: [
      { id: "10-1", title: "Introduction to LLM Engineering", duration: "21:30", type: "Learn", tech: "LangGraph" },
      { id: "10-2", title: "LLM Application Architecture", duration: "24:10", type: "Build", tech: "LangGraph" },
      { id: "10-3", title: "LLM Models, Providers, and Model Families", duration: "23:00", type: "Learn", tech: "LangGraph" },
      { id: "10-4", title: "Choosing the Right LLM for Your Application", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-5", title: "LLM APIs from First Request to Production", duration: "30:00", type: "Build", tech: "LangGraph" },
      { id: "10-6", title: "Messages, Roles, Instructions, and Conversation", duration: "32:00", type: "Build", tech: "LangGraph" },
      { id: "10-7", title: "LLM Inference Parameters and Generation Control", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-8", title: "Streaming, Async Processing, and Concurrent Requests", duration: "30:00", type: "Build", tech: "LangGraph" },
      { id: "10-9", title: " Production Prompt Engineering", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-10", title: "System Prompts and Instruction Hierarchies", duration: "32:00", type: "Build", tech: "LangGraph" },
      { id: "10-11", title: " Context Engineering Fundamentals", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-12", title: "Context Windows, Token Budgets, and Context Compression", duration: "30:00", type: "Build", tech: "LangGraph" },
      { id: "10-13", title: "Structured Outputs and Reliable JSON Generation", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-14", title: "JSON Schema, Pydantic, and Typed LLM Responses", duration: "32:00", type: "Build", tech: "LangGraph" },
      { id: "10-15", title: "Output Validation, Parsing, and Error Recovery", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-16", title: "Building Reliable LLM Output Pipelines", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-17", title: "Function Calling and Tool Use", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-18", title: "Tool Schemas, Tool Selection, and Routing", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-19", title: "Building Custom Tools for LLM Applications", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-20", title: "Multi-Step Tool Execution and Tool Error Handling", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-21", title: "Memory and State in LLM Applications", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-22", title: "Conversation Memory and State Management", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-23", title: "Short-Term and Long-Term Memory Architecture", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-24", title: "Memory Retrieval, Summarization, and Context Injection", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-25", title: "Retries, Timeouts, Backoff, and Failure Handling", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-26", title: "Rate Limits, Concurrency, and Request Management", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-27", title: "LLM Caching and Semantic Response Reuse", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-28", title: "LLM Routing, Fallback Models, and Model Cascades", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-29", title: "LLM Evaluation Fundamentals", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-30", title: "LLM-as-a-Judge and Automated Evaluation", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-31", title: "Tracing, Logging, and LLM Observability ", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-32", title: "Production Quality Metrics and Monitoring", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-33", title: "LLM Latency and Performance Engineering", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-34", title: "Token Optimization and LLM Cost Engineering", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-35", title: "Batching, Parallelism, and High-Throughput Inference", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-36", title: "LLM Security, Prompt Injection, and Data Protection", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-37", title: "Building LLM APIs with FastAPI", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-38", title: "Production Deployment and Scalable LLM Services", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-39", title: "End-to-End Production LLM Architecture", duration: "28:00", type: "Build", tech: "LangGraph" },
      { id: "10-40", title: "Capstone: Build a Production-Ready LLM Platform", duration: "28:00", type: "Build", tech: "LangGraph" },
    ]
  },
  {
    id: "11",
    num: "11",

    title: "LLM Fine-Tuning",

    description:
      "A complete LLM Fine-Tuning journey from fundamentals to production, covering dataset engineering, supervised fine-tuning, instruction tuning, Hugging Face training, PEFT, LoRA, QLoRA, quantization, preference optimization, evaluation, model optimization, and deployment.",

    youWillBuild:
      "custom domain-specific LLMs by preparing high-quality datasets, performing supervised fine-tuning, implementing LoRA and QLoRA, optimizing training with quantization and PEFT, evaluating fine-tuned models, and deploying them for real-world applications.",

    totalDuration: "42h 30m",

    lessonsCount: 40,

    category: "LLM Fine-Tuning",

    lessons: [


      { id: "11-1", title: "Introduction to LLM Fine-Tuning", duration: "50:00", type: "Learn", tech: "Python", isFree: true },
      { id: "11-2", title: "When Should You Fine-Tune an LLM?", duration: "55:00", type: "Learn", tech: "Python", },
      { id: "11-3", title: "Prompting vs RAG vs Fine-Tuning", duration: "1:00:00", type: "Learn", tech: "Python", },
      { id: "11-4", title: "Pretraining vs Fine-Tuning vs Instruction Tuning", duration: "1:00:00", type: "Learn", tech: "Python", },
      { id: "11-5", title: "Understanding LLM Fine-Tuning Datasets", duration: "55:00", type: "Learn", tech: "Python", },
      { id: "11-6", title: "Data Collection, Cleaning, and Normalization", duration: "1:05:00", type: "Build", tech: "Python", },
      { id: "11-7", title: "Instruction Dataset Design", duration: "1:00:00", type: "Build", tech: "Python", },
      { id: "11-8", title: "Chat and Conversation Dataset Formats", duration: "55:00", type: "Build", tech: "Python", },
      { id: "11-9", title: "Dataset Quality, Diversity, Bias, and Leakage", duration: "1:00:00", type: "Build", tech: "Python", },
      { id: "11-10", title: "Train, Validation, and Test Dataset Splitting", duration: "50:00", type: "Build", tech: "Python", },
      { id: "11-11", title: "Supervised Fine-Tuning Fundamentals", duration: "1:00:00", type: "Learn", tech: "PyTorch", },
      { id: "11-12", title: "Building an SFT Training Pipeline", duration: "1:05:00", type: "Build", tech: "PyTorch", },
      { id: "11-13", title: "Tokenization and Sequence Preparation", duration: "55:00", type: "Build", tech: "Transformers", },
      { id: "11-14", title: "Labels, Loss Masking, and Training Targets", duration: "1:00:00", type: "Build", tech: "PyTorch", },
      { id: "11-15", title: "Training an LLM with PyTorch", duration: "1:10:00", type: "Build", tech: "PyTorch", },
      { id: "11-16", title: "Checkpoints, Validation, and Training Monitoring", duration: "1:00:00", type: "Build", tech: "PyTorch", },
      { id: "11-17", title: "Fine-Tuning with Hugging Face Transformers", duration: "1:00:00", type: "Build", tech: "Transformers", },
      { id: "11-18", title: "Datasets, Tokenizers, and Data Collators", duration: "1:00:00", type: "Build", tech: "Hugging Face", },
      { id: "11-19", title: "Training with Trainer and TrainingArguments", duration: "1:05:00", type: "Build", tech: "Transformers", },
      { id: "11-20", title: "Fine-Tuning a Causal Language Model", duration: "1:10:00", type: "Build", tech: "Transformers", },
      { id: "11-21", title: "Custom Fine-Tuning Loops with Accelerate", duration: "1:10:00", type: "Build", tech: "Accelerate", },
      { id: "11-22", title: "Parameter-Efficient Fine-Tuning (PEFT)", duration: "55:00", type: "Learn", tech: "PEFT", },
      { id: "11-23", title: "LoRA from First Principles", duration: "1:10:00", type: "Build", tech: "PyTorch", },
      { id: "11-24", title: "LoRA Configuration and Target Modules", duration: "1:00:00", type: "Build", tech: "PEFT", },
      { id: "11-25", title: "Training LLMs with LoRA", duration: "1:10:00", type: "Build", tech: "PEFT", },
      { id: "11-26", title: "Adapter Management, Merging, and Export", duration: "1:00:00", type: "Build", tech: "PEFT", },
      { id: "11-27", title: "Quantization Fundamentals", duration: "55:00", type: "Learn", tech: "PyTorch", },
      { id: "11-28", title: "8-bit and 4-bit Model Quantization", duration: "1:00:00", type: "Build", tech: "BitsAndBytes", },
      { id: "11-29", title: "QLoRA Architecture and Training", duration: "1:10:00", type: "Build", tech: "PEFT", },
      { id: "11-30", title: "Memory-Efficient Fine-Tuning of Large Models", duration: "1:10:00", type: "Build", tech: "PyTorch", },
      { id: "11-31", title: "GPU Memory and Training Optimization", duration: "1:05:00", type: "Build", tech: "PyTorch", },
      { id: "11-32", title: "Instruction Tuning and Model Alignment", duration: "1:00:00", type: "Build", tech: "Transformers" },
      { id: "11-33", title: "Preference Datasets and Reward Modeling", duration: "1:05:00", type: "Learn", tech: "Python" },
      { id: "11-34", title: "DPO — Direct Preference Optimization", duration: "1:15:00", type: "Build", tech: "TRL" },
      { id: "11-35", title: "Preference Optimization and Alignment Workflows", duration: "1:10:00", type: "Build", tech: "TRL", },
      { id: "11-36", title: "Evaluating Fine-Tuned LLMs", duration: "1:05:00", type: "Build", tech: "Python" },
      { id: "11-37", title: "Base Model vs Fine-Tuned Model Evaluation", duration: "1:00:00", type: "Build", tech: "Python" },
      { id: "11-38", title: "Model Merging, Export, and Inference Optimization", duration: "1:05:00", type: "Build", tech: "Transformers" },
      { id: "11-39", title: "Deploying Fine-Tuned LLMs", duration: "1:15:00", type: "Build", tech: "FastAPI" },
      { id: "11-40", title: "Capstone: Build and Deploy a Domain-Specific LLM", duration: "2:00:00", type: "Build", tech: "Python" },
    ]
  },
  {
    id: "12",
    num: "12",

    title: "RAG Engineering",

    description: "Production-grade Retrieval-Augmented Generation covering document ingestion, chunking, embeddings, vector databases, retrieval, reranking, advanced RAG architectures, evaluation, optimization, and deployment.",

    youWillBuild: "Production-ready RAG application that ingests real-world documents, performs intelligent retrieval and reranking, generates grounded answers, evaluates retrieval quality, and deploys the complete system.",

    totalDuration: "43h 50m",

    lessonsCount: 40,

    category: "RAG",

    lessons: [


      { id: "12-1", title: "Introduction to Retrieval-Augmented Generation", duration: "55:00", type: "Learn", tech: "RAG", isFree: true },

      { id: "12-2", title: "Why LLMs Need External Knowledge", duration: "50:00", type: "Learn", tech: "LLM" },

      { id: "12-3", title: "RAG vs Fine-Tuning vs Long Context", duration: "1:00:00", type: "Learn", tech: "RAG" },

      { id: "12-4", title: "RAG Architecture from End to End", duration: "1:05:00", type: "Build", tech: "Python" },



      { id: "12-5", title: "Document Loading and Data Sources", duration: "1:00:00", type: "Build", tech: "Python" },

      { id: "12-6", title: "PDF, DOCX, HTML, and Web Data Extraction", duration: "1:10:00", type: "Build", tech: "Python" },

      { id: "12-7", title: "Document Cleaning and Normalization", duration: "1:00:00", type: "Build", tech: "Python" },

      { id: "12-8", title: "Metadata Extraction and Document Enrichment", duration: "1:05:00", type: "Build", tech: "Python" },

      { id: "12-9", title: "Document Versioning and Data Freshness", duration: "1:00:00", type: "Build", tech: "RAG" },



      { id: "12-10", title: "Text Chunking Fundamentals", duration: "55:00", type: "Learn", tech: "RAG" },

      { id: "12-11", title: "Fixed-Size and Token-Based Chunking", duration: "1:00:00", type: "Build", tech: "Python" },

      { id: "12-12", title: "Recursive and Semantic Chunking", duration: "1:10:00", type: "Build", tech: "RAG" },

      { id: "12-13", title: "Parent-Child and Hierarchical Chunking", duration: "1:05:00", type: "Build", tech: "RAG" },

      { id: "12-14", title: "Chunking Strategies and Retrieval Trade-Offs", duration: "1:00:00", type: "Build", tech: "RAG" },


      { id: "12-15", title: "Embeddings Fundamentals", duration: "55:00", type: "Learn", tech: "Embeddings" },

      { id: "12-16", title: "Generating and Managing Embeddings", duration: "1:00:00", type: "Build", tech: "Python" },

      { id: "12-17", title: "Cosine Similarity, Dot Product, and Distance", duration: "1:00:00", type: "Build", tech: "NumPy" },

      { id: "12-18", title: "Choosing and Evaluating Embedding Models", duration: "1:05:00", type: "Build", tech: "Embeddings" },

      { id: "12-19", title: "Multilingual and Multimodal Embeddings", duration: "1:00:00", type: "Build", tech: "Embeddings" },


      { id: "12-20", title: "Vector Databases Fundamentals", duration: "55:00", type: "Learn", tech: "Vector DB" },

      { id: "12-21", title: "Building a Vector Search Pipeline", duration: "1:10:00", type: "Build", tech: "Vector DB" },

      { id: "12-22", title: "Indexing and Metadata Filtering", duration: "1:05:00", type: "Build", tech: "Vector DB" },

      { id: "12-23", title: "Vector Database Indexing and Scaling", duration: "1:05:00", type: "Build", tech: "Vector DB" },

      { id: "12-24", title: "Build Your First End-to-End Vector RAG", duration: "1:15:00", type: "Build", tech: "LangChain" },



      { id: "12-25", title: "Similarity Search and Top-K Retrieval", duration: "1:00:00", type: "Build", tech: "RAG" },

      { id: "12-26", title: "Hybrid Search: Vector and Keyword Retrieval", duration: "1:10:00", type: "Build", tech: "RAG" },

      { id: "12-27", title: "Query Expansion and Query Rewriting", duration: "1:05:00", type: "Build", tech: "LLM" },

      { id: "12-28", title: "Multi-Query and Query Decomposition", duration: "1:10:00", type: "Build", tech: "RAG" },

      { id: "12-29", title: "Reranking and Retrieval Optimization", duration: "1:15:00", type: "Build", tech: "Reranking" },

      { id: "12-30", title: "Context Construction and Context Compression", duration: "1:05:00", type: "Build", tech: "RAG" },

      { id: "12-31", title: "Parent-Document and Hierarchical Retrieval", duration: "1:10:00", type: "Build", tech: "RAG" },

      { id: "12-32", title: "Self-RAG and Corrective RAG", duration: "1:15:00", type: "Build", tech: "Advanced RAG" },
      { id: "12-33", title: "Graph-Based Retrieval and Knowledge Graphs", duration: "1:15:00", type: "Build", tech: "GraphRAG" },
      { id: "12-34", title: "Adaptive and Agentic Retrieval", duration: "1:15:00", type: "Build", tech: "Agentic RAG" },
      { id: "12-35", title: "Retrieval Evaluation: Precision, Recall, and Hit Rate", duration: "1:05:00", type: "Learn", tech: "Evaluation" },
      { id: "12-36", title: "Relevance, Faithfulness, and Groundedness", duration: "1:10:00", type: "Build", tech: "Evaluation" },
      { id: "12-37", title: "Evaluating Retrieval and Generation Separately", duration: "1:00:00", type: "Build", tech: "Evaluation" },
      { id: "12-38", title: "Building an Automated RAG Evaluation Pipeline", duration: "1:15:00", type: "Build", tech: "Evaluation" },
      { id: "12-39", title: "Production RAG Architecture and Optimization", duration: "1:20:00", type: "Build", tech: "Python" },
      { id: "12-40", title: "Capstone: Build and Deploy a Production-Ready RAG System", duration: "2:30:00", type: "Build", tech: "Python" },

    ]
  },
  {
    id: "13",
    num: "13",

    title: "Advanced RAG",

    description: "Advanced Retrieval-Augmented Generation covering query routing, multi-hop retrieval, hybrid search, reranking, contextual compression, hierarchical retrieval, GraphRAG, Self-RAG, Corrective RAG, Adaptive RAG, and Agentic RAG architectures.",

    youWillBuild: "Advanced RAG systems that dynamically plan retrieval, combine multiple retrieval strategies, reason across multiple documents, correct failed retrievals, use knowledge graphs, and adapt retrieval based on query complexity.",

    totalDuration: "44h 20m",

    lessonsCount: 40,

    category: "Advanced RAG",

    lessons: [

      { id: "13-1", title: "Advanced RAG Architecture", duration: "55:00", type: "Learn", tech: "Advanced RAG", isFree: true },

      { id: "13-2", title: "Limitations of Traditional RAG", duration: "50:00", type: "Learn", tech: "RAG" },

      { id: "13-3", title: "RAG Failure Modes and Retrieval Bottlenecks", duration: "1:00:00", type: "Learn", tech: "RAG" },

      { id: "13-4", title: "Designing Modular RAG Systems", duration: "1:05:00", type: "Build", tech: "RAG" },

      { id: "13-5", title: "Query Routing and Retrieval Strategy Selection", duration: "1:05:00", type: "Build", tech: "Router" },

      { id: "13-6", title: "Semantic, Keyword, and Hybrid Retrieval", duration: "1:10:00", type: "Build", tech: "Search" },

      { id: "13-7", title: "Advanced Reranking Techniques", duration: "1:10:00", type: "Build", tech: "Reranking" },

      { id: "13-8", title: "Contextual Compression and Context Optimization", duration: "1:05:00", type: "Build", tech: "RAG" },

      { id: "13-9", title: "Hierarchical and Parent-Child Retrieval", duration: "1:05:00", type: "Build", tech: "RAG" },

      { id: "13-10", title: "Metadata-Aware and Filtered Retrieval", duration: "1:00:00", type: "Build", tech: "Vector DB" },

      { id: "13-11", title: "Query Rewriting and Query Transformation", duration: "1:05:00", type: "Build", tech: "LLM" },

      { id: "13-12", title: "Multi-Query Retrieval", duration: "1:00:00", type: "Build", tech: "RAG" },

      { id: "13-13", title: "Query Decomposition for Complex Questions", duration: "1:10:00", type: "Build", tech: "LLM" },

      { id: "13-14", title: "Multi-Hop Retrieval and Reasoning", duration: "1:15:00", type: "Build", tech: "RAG" },

      { id: "13-15", title: "Recursive Retrieval and Iterative Search", duration: "1:10:00", type: "Build", tech: "RAG" },

      { id: "13-16", title: "Fusion Retrieval and Reciprocal Rank Fusion", duration: "1:05:00", type: "Build", tech: "Search" },

      { id: "13-17", title: "Knowledge Graph Fundamentals for RAG", duration: "1:00:00", type: "Learn", tech: "Knowledge Graph" },

      { id: "13-18", title: "Building Knowledge Graphs from Documents", duration: "1:15:00", type: "Build", tech: "GraphRAG" },

      { id: "13-19", title: "Graph-Based Retrieval and Traversal", duration: "1:15:00", type: "Build", tech: "GraphRAG" },

      { id: "13-20", title: "GraphRAG Architecture and Implementation", duration: "1:20:00", type: "Build", tech: "GraphRAG" },

      { id: "13-21", title: "Self-RAG Architecture", duration: "1:10:00", type: "Build", tech: "Self-RAG" },

      { id: "13-22", title: "Retrieval Decisions and Self-Reflection", duration: "1:10:00", type: "Build", tech: "Self-RAG" },

      { id: "13-23", title: "Corrective RAG Architecture", duration: "1:10:00", type: "Build", tech: "Corrective RAG" },

      { id: "13-24", title: "Retrieval Failure Detection and Correction", duration: "1:10:00", type: "Build", tech: "Corrective RAG" },

      { id: "13-25", title: "Adaptive RAG and Dynamic Retrieval", duration: "1:15:00", type: "Build", tech: "Adaptive RAG" },

      { id: "13-26", title: "RAG Routing Based on Query Complexity", duration: "1:10:00", type: "Build", tech: "Router" },

      { id: "13-27", title: "Agentic Retrieval and Retrieval Planning", duration: "1:15:00", type: "Build", tech: "Agentic RAG" },

      { id: "13-28", title: "Planning Multi-Step Retrieval Workflows", duration: "1:15:00", type: "Build", tech: "Agents" },

      { id: "13-29", title: "Tool-Augmented Retrieval", duration: "1:10:00", type: "Build", tech: "Tools" },

      { id: "13-30", title: "Web Search and External Knowledge Retrieval", duration: "1:10:00", type: "Build", tech: "Search" },

      { id: "13-31", title: "Long-Context RAG and Context Management", duration: "1:10:00", type: "Build", tech: "LLM" },

      { id: "13-32", title: "RAG with Tables, Structured Data, and SQL", duration: "1:15:00", type: "Build", tech: "SQL" },

      { id: "13-33", title: "Multimodal RAG for Images and Documents", duration: "1:15:00", type: "Build", tech: "Multimodal" },

      { id: "13-34", title: "RAG for Codebases and Technical Documentation", duration: "1:15:00", type: "Build", tech: "Code RAG" },

      { id: "13-35", title: "Advanced RAG Evaluation and Retrieval Metrics", duration: "1:10:00", type: "Build", tech: "Evaluation" },

      { id: "13-36", title: "Evaluating Multi-Hop and Agentic RAG", duration: "1:15:00", type: "Build", tech: "Evaluation" },

      { id: "13-37", title: "Debugging and Observability for Advanced RAG", duration: "1:10:00", type: "Build", tech: "Observability" },

      { id: "13-38", title: "Advanced RAG Performance and Cost Optimization", duration: "1:10:00", type: "Build", tech: "Optimization" },

      { id: "13-39", title: "Production Architecture for Advanced RAG", duration: "1:20:00", type: "Build", tech: "Production RAG" },

      { id: "13-40", title: "Capstone: Build an Adaptive Agentic RAG System", duration: "2:30:00", type: "Build", tech: "Agentic RAG" }

    ]
  },
  {
    id: "14",
    num: "14",

    title: "AI Agents",

    description: "A complete AI Agents journey from fundamentals to production, covering agent architecture, reasoning loops, tool calling, planning, memory, state management, workflows, human-in-the-loop, agent evaluation, safety, and production deployment.",

    youWillBuild: "production-ready AI agents that can understand goals, plan multi-step tasks, select and execute tools, maintain memory and state, recover from failures, interact with humans, and complete real-world workflows autonomously.",

    totalDuration: "44h 35m",

    lessonsCount: 40,

    category: "AI Agents",

    lessons: [

      { id: "14-1", title: "Introduction to AI Agents", duration: "55:00", type: "Learn", tech: "Agents", isFree: true },

      { id: "14-2", title: "LLM Applications vs AI Agents", duration: "50:00", type: "Learn", tech: "Agents" },

      { id: "14-3", title: "Anatomy of an AI Agent", duration: "1:00:00", type: "Learn", tech: "Agents" },

      { id: "14-4", title: "Agent Loops: Think, Act, Observe", duration: "1:05:00", type: "Build", tech: "Python" },



      { id: "14-5", title: "Building Your First AI Agent", duration: "1:05:00", type: "Build", tech: "Python" },

      { id: "14-6", title: "Agent State and Execution Context", duration: "1:00:00", type: "Build", tech: "Python" },

      { id: "14-7", title: "Tool Calling for AI Agents", duration: "1:05:00", type: "Build", tech: "Tools" },

      { id: "14-8", title: "Building Custom Agent Tools", duration: "1:10:00", type: "Build", tech: "Python" },


      { id: "14-9", title: "Agent Reasoning Patterns", duration: "1:00:00", type: "Learn", tech: "Agents" },

      { id: "14-10", title: "ReAct Agents and Reasoning Loops", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "14-11", title: "Task Planning and Goal Decomposition", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "14-12", title: "Plan-and-Execute Agent Architecture", duration: "1:15:00", type: "Build", tech: "Agents" },



      { id: "14-13", title: "Agent Memory Fundamentals", duration: "55:00", type: "Learn", tech: "Memory" },

      { id: "14-14", title: "Short-Term Memory and Conversation State", duration: "1:00:00", type: "Build", tech: "Python" },

      { id: "14-15", title: "Long-Term Agent Memory", duration: "1:10:00", type: "Build", tech: "Vector DB" },

      { id: "14-16", title: "Memory Retrieval and Context Management", duration: "1:10:00", type: "Build", tech: "RAG" },


      { id: "14-17", title: "Sequential Agent Workflows", duration: "1:00:00", type: "Build", tech: "LangGraph" },

      { id: "14-18", title: "Conditional Agent Workflows", duration: "1:05:00", type: "Build", tech: "LangGraph" },

      { id: "14-19", title: "Loops, Branches, and State Machines", duration: "1:10:00", type: "Build", tech: "LangGraph" },

      { id: "14-20", title: "Building Stateful Agents with LangGraph", duration: "1:20:00", type: "Build", tech: "LangGraph" },



      { id: "14-21", title: "Agents with Web Search and External APIs", duration: "1:10:00", type: "Build", tech: "Tools" },

      { id: "14-22", title: "Agents with Databases and SQL", duration: "1:10:00", type: "Build", tech: "SQL" },

      { id: "14-23", title: "Agents with Code Execution", duration: "1:15:00", type: "Build", tech: "Python" },

      { id: "14-24", title: "Multi-Step Autonomous Task Execution", duration: "1:15:00", type: "Build", tech: "Agents" },



      { id: "14-25", title: "Human-in-the-Loop Agents", duration: "1:05:00", type: "Build", tech: "LangGraph" },

      { id: "14-26", title: "Approval Workflows and Interruptions", duration: "1:00:00", type: "Build", tech: "Agents" },

      { id: "14-27", title: "Agent Failure Recovery and Retry Strategies", duration: "1:10:00", type: "Build", tech: "Python" },

      { id: "14-28", title: "Guardrails and Safe Agent Execution", duration: "1:15:00", type: "Build", tech: "Guardrails" },


      { id: "14-29", title: "AI Agent Evaluation Fundamentals", duration: "1:00:00", type: "Learn", tech: "Evaluation" },

      { id: "14-30", title: "Evaluating Tool Selection and Execution", duration: "1:05:00", type: "Build", tech: "Evaluation" },

      { id: "14-31", title: "Evaluating Planning and Task Completion", duration: "1:10:00", type: "Build", tech: "Evaluation" },

      { id: "14-32", title: "Agent Tracing, Debugging, and Observability", duration: "1:10:00", type: "Build", tech: "Observability" },

      { id: "14-33", title: "Agent Performance and Cost Optimization", duration: "1:05:00", type: "Build", tech: "Optimization" },

      { id: "14-34", title: "Agent Security and Tool Permissions", duration: "1:10:00", type: "Build", tech: "Security" },

      { id: "14-35", title: "Persistent Agent State and Checkpointing", duration: "1:10:00", type: "Build", tech: "LangGraph" },

      { id: "14-36", title: "Deploying AI Agents to Production", duration: "1:15:00", type: "Build", tech: "FastAPI" },

      { id: "14-37", title: "Scalable Agent Architecture", duration: "1:15:00", type: "Build", tech: "Python" },

      { id: "14-38", title: "Production Agent Monitoring and Reliability", duration: "1:10:00", type: "Build", tech: "Observability" },

      { id: "14-39", title: "Designing a Real-World Autonomous Agent", duration: "1:30:00", type: "Build", tech: "Agents" },

      { id: "14-40", title: "Capstone: Build a Production-Ready AI Agent", duration: "2:30:00", type: "Build", tech: "LangGraph" },

    ]
  },
  {
    id: "15",
    num: "15",

    title: "Agentic RAG",

    description: "A complete Agentic RAG journey covering retrieval planning, dynamic search, query decomposition, tool-based retrieval, iterative reasoning, corrective retrieval, multi-hop research, memory, evaluation, and production Agentic RAG systems.",

    youWillBuild: "autonomous Agentic RAG systems that can analyze user questions, decide when retrieval is required, plan multi-step searches, select retrieval tools, evaluate retrieved information, correct failed searches, and generate grounded final answers.",

    totalDuration: "45h 10m",

    lessonsCount: 40,

    category: "Agentic RAG",

    lessons: [

      { id: "15-1", title: "Introduction to Agentic RAG", duration: "55:00", type: "Learn", tech: "Agentic RAG", isFree: true },

      { id: "15-2", title: "Traditional RAG vs Agentic RAG", duration: "50:00", type: "Learn", tech: "RAG" },

      { id: "15-3", title: "Agentic RAG Architecture", duration: "1:00:00", type: "Learn", tech: "Agents" },

      { id: "15-4", title: "Retrieval Planning and Decision Making", duration: "1:05:00", type: "Build", tech: "Agents" },

      { id: "15-5", title: "Building Your First Agentic RAG System", duration: "1:15:00", type: "Build", tech: "Python" },

      { id: "15-6", title: "Query Analysis and Intent Detection", duration: "1:00:00", type: "Build", tech: "LLM" },

      { id: "15-7", title: "Dynamic Query Rewriting", duration: "1:05:00", type: "Build", tech: "LLM" },

      { id: "15-8", title: "Query Decomposition and Task Planning", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "15-9", title: "Multi-Step Retrieval Workflows", duration: "1:15:00", type: "Build", tech: "RAG" },

      { id: "15-10", title: "Tool-Based Retrieval for Agents", duration: "1:10:00", type: "Build", tech: "Tools" },

      { id: "15-11", title: "Web Search as a Retrieval Tool", duration: "1:05:00", type: "Build", tech: "Search" },

      { id: "15-12", title: "Vector Search as an Agent Tool", duration: "1:05:00", type: "Build", tech: "Vector DB" },

      { id: "15-13", title: "SQL and Structured Data Retrieval", duration: "1:10:00", type: "Build", tech: "SQL" },

      { id: "15-14", title: "Knowledge Graph Retrieval with Agents", duration: "1:15:00", type: "Build", tech: "GraphRAG" },

      { id: "15-15", title: "Multi-Source Retrieval Strategies", duration: "1:10:00", type: "Build", tech: "RAG" },

      { id: "15-16", title: "Retrieval Routing and Tool Selection", duration: "1:10:00", type: "Build", tech: "Router" },

      { id: "15-17", title: "Iterative Retrieval and Search Loops", duration: "1:15:00", type: "Build", tech: "Agents" },

      { id: "15-18", title: "Multi-Hop Retrieval and Reasoning", duration: "1:15:00", type: "Build", tech: "Agentic RAG" },

      { id: "15-19", title: "Evidence Collection and Source Tracking", duration: "1:05:00", type: "Build", tech: "RAG" },

      { id: "15-20", title: "Context Synthesis Across Multiple Sources", duration: "1:10:00", type: "Build", tech: "LLM" },

      { id: "15-21", title: "Retrieval Quality Assessment", duration: "1:00:00", type: "Build", tech: "Evaluation" },

      { id: "15-22", title: "Detecting Insufficient Retrieved Information", duration: "1:05:00", type: "Build", tech: "Evaluation" },

      { id: "15-23", title: "Corrective RAG with Agent Feedback", duration: "1:15:00", type: "Build", tech: "Corrective RAG" },

      { id: "15-24", title: "Self-Reflective Agentic RAG", duration: "1:15:00", type: "Build", tech: "Self-RAG" },

      { id: "15-25", title: "Adaptive Retrieval Strategies", duration: "1:15:00", type: "Build", tech: "Adaptive RAG" },

      { id: "15-26", title: "Research Agents and Deep Research Workflows", duration: "1:20:00", type: "Build", tech: "Agents" },

      { id: "15-27", title: "Planning Long-Horizon Research Tasks", duration: "1:15:00", type: "Build", tech: "Agents" },

      { id: "15-28", title: "Agent Memory for Retrieval and Research", duration: "1:10:00", type: "Build", tech: "Memory" },

      { id: "15-29", title: "Caching and Reusing Retrieved Knowledge", duration: "1:05:00", type: "Build", tech: "Caching" },

      { id: "15-30", title: "Agentic RAG with LangGraph", duration: "1:20:00", type: "Build", tech: "LangGraph" },

      { id: "15-31", title: "State Management and Checkpointing", duration: "1:10:00", type: "Build", tech: "LangGraph" },

      { id: "15-32", title: "Human-in-the-Loop Agentic RAG", duration: "1:05:00", type: "Build", tech: "LangGraph" },

      { id: "15-33", title: "Agentic RAG Evaluation Framework", duration: "1:15:00", type: "Build", tech: "Evaluation" },

      { id: "15-34", title: "Evaluating Retrieval, Reasoning, and Generation", duration: "1:15:00", type: "Build", tech: "Evaluation" },

      { id: "15-35", title: "Observability and Agent Trace Analysis", duration: "1:10:00", type: "Build", tech: "Observability" },

      { id: "15-36", title: "Agentic RAG Cost and Latency Optimization", duration: "1:10:00", type: "Build", tech: "Optimization" },

      { id: "15-37", title: "Security, Permissions, and Retrieval Guardrails", duration: "1:10:00", type: "Build", tech: "Security" },

      { id: "15-38", title: "Production Agentic RAG Architecture", duration: "1:20:00", type: "Build", tech: "Production RAG" },

      { id: "15-39", title: "Building an Autonomous Research Assistant", duration: "1:30:00", type: "Build", tech: "Agents" },

      { id: "15-40", title: "Capstone: Build a Production Agentic RAG System", duration: "2:30:00", type: "Build", tech: "Agentic RAG" }

    ]
  },
  {
    id: "16",
    num: "16",

    title: "MCP & Tool Use",

    description: "A complete Model Context Protocol journey covering MCP architecture, clients, servers, tools, resources, prompts, transport, tool discovery, permissions, authentication, security, integrations, and production MCP systems.",

    youWillBuild: "production-ready MCP-powered AI applications where agents can dynamically discover and securely use external tools, APIs, databases, files, and services through standardized MCP servers.",

    totalDuration: "42h 40m",

    lessonsCount: 40,

    category: "MCP",

    lessons: [


      { id: "16-1", title: "Introduction to Model Context Protocol", duration: "55:00", type: "Learn", tech: "MCP", isFree: true },

      { id: "16-2", title: "Why MCP Matters for AI Agents", duration: "50:00", type: "Learn", tech: "MCP" },

      { id: "16-3", title: "MCP Architecture and Core Components", duration: "1:00:00", type: "Learn", tech: "MCP" },

      { id: "16-4", title: "MCP Hosts, Clients, and Servers", duration: "1:00:00", type: "Learn", tech: "MCP" },


      { id: "16-5", title: "Building Your First MCP Server", duration: "1:10:00", type: "Build", tech: "MCP" },

      { id: "16-6", title: "MCP Tools and Tool Definitions", duration: "1:05:00", type: "Build", tech: "MCP" },

      { id: "16-7", title: "MCP Resources and Resource Templates", duration: "1:05:00", type: "Build", tech: "MCP" },

      { id: "16-8", title: "MCP Prompts and Prompt Templates", duration: "1:00:00", type: "Build", tech: "MCP" },

      { id: "16-9", title: "Connecting LLMs to MCP Tools", duration: "1:05:00", type: "Build", tech: "LLM" },

      { id: "16-10", title: "Tool Discovery and Dynamic Tool Selection", duration: "1:10:00", type: "Build", tech: "MCP" },

      { id: "16-11", title: "Tool Schemas and Structured Arguments", duration: "1:00:00", type: "Build", tech: "JSON Schema" },

      { id: "16-12", title: "Tool Execution, Results, and Error Handling", duration: "1:10:00", type: "Build", tech: "MCP" },

      { id: "16-13", title: "MCP Transport Fundamentals", duration: "55:00", type: "Learn", tech: "MCP" },

      { id: "16-14", title: "Local MCP Servers and STDIO", duration: "1:00:00", type: "Build", tech: "MCP" },

      { id: "16-15", title: "Remote MCP Servers and HTTP", duration: "1:05:00", type: "Build", tech: "MCP" },

      { id: "16-16", title: "Sessions, Messages, and Protocol Communication", duration: "1:05:00", type: "Build", tech: "MCP" },

      { id: "16-17", title: "MCP with REST APIs", duration: "1:05:00", type: "Build", tech: "MCP" },

      { id: "16-18", title: "MCP with Databases and SQL", duration: "1:10:00", type: "Build", tech: "SQL" },

      { id: "16-19", title: "MCP with Files and Documents", duration: "1:05:00", type: "Build", tech: "MCP" },

      { id: "16-20", title: "MCP with External SaaS Services", duration: "1:10:00", type: "Build", tech: "MCP" },


      { id: "16-21", title: "MCP and AI Agent Integration", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "16-22", title: "MCP Tools with LangGraph Agents", duration: "1:15:00", type: "Build", tech: "LangGraph" },

      { id: "16-23", title: "Dynamic Tool Discovery for Agents", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "16-24", title: "Building Tool-Using Autonomous Agents", duration: "1:20:00", type: "Build", tech: "Agents" },



      { id: "16-25", title: "MCP Security Fundamentals", duration: "1:00:00", type: "Learn", tech: "Security" },

      { id: "16-26", title: "Authentication and Authorization", duration: "1:10:00", type: "Build", tech: "Security" },

      { id: "16-27", title: "Tool Permissions and Access Control", duration: "1:05:00", type: "Build", tech: "Security" },

      { id: "16-28", title: "Secure Tool Execution and Input Validation", duration: "1:10:00", type: "Build", tech: "Security" },



      { id: "16-29", title: "Multi-Server MCP Architecture", duration: "1:10:00", type: "Build", tech: "MCP" },

      { id: "16-30", title: "MCP Server Composition and Tool Routing", duration: "1:15:00", type: "Build", tech: "MCP" },

      { id: "16-31", title: "MCP with RAG and Knowledge Systems", duration: "1:15:00", type: "Build", tech: "RAG" },

      { id: "16-32", title: "MCP for Browser and Web Automation", duration: "1:15:00", type: "Build", tech: "MCP" },

      { id: "16-33", title: "MCP for Developer and Code Tools", duration: "1:10:00", type: "Build", tech: "MCP" },

      { id: "16-34", title: "MCP for Enterprise AI Workflows", duration: "1:15:00", type: "Build", tech: "MCP" },



      { id: "16-35", title: "MCP Observability and Tool Tracing", duration: "1:05:00", type: "Build", tech: "Observability" },

      { id: "16-36", title: "MCP Error Handling, Retries, and Reliability", duration: "1:10:00", type: "Build", tech: "MCP" },

      { id: "16-37", title: "MCP Performance, Latency, and Cost Optimization", duration: "1:10:00", type: "Build", tech: "Optimization" },

      { id: "16-38", title: "Deploying and Scaling MCP Servers", duration: "1:20:00", type: "Build", tech: "Docker" },



      { id: "16-39", title: "Build a Multi-Tool MCP Agent Platform", duration: "1:30:00", type: "Build", tech: "MCP" },

      { id: "16-40", title: "Capstone: Production MCP-Powered AI Agent", duration: "2:30:00", type: "Build", tech: "MCP" }

    ]
  },
  {
    id: "17",
    num: "17",

    title: "Multi-Agent Orchestration",

    description: "A complete multi-agent systems journey covering agent collaboration, supervisor architectures, hierarchical teams, delegation, shared state, peer-to-peer collaboration, specialist agents, human-in-the-loop workflows, evaluation, security, and production orchestration with CrewAI and LangGraph.",

    youWillBuild: "a production-ready multi-agent software engineering team with specialized Product Manager, Architect, Developer, Researcher, Reviewer, Tester, and DevOps agents that collaborate to complete complex tasks.",

    totalDuration: "41h 35m",

    lessonsCount: 40,

    category: "Multi-Agent Systems",

    lessons: [

      { id: "17-1", title: "Introduction to Multi-Agent Systems", duration: "55:00", type: "Learn", tech: "Agents", isFree: true },

      { id: "17-2", title: "Single Agent vs Multi-Agent Architecture", duration: "50:00", type: "Learn", tech: "Agents" },

      { id: "17-3", title: "When Should You Use Multiple Agents?", duration: "55:00", type: "Learn", tech: "Agents" },

      { id: "17-4", title: "Multi-Agent Architecture Patterns", duration: "1:00:00", type: "Learn", tech: "Agents" },

      { id: "17-5", title: "Specialized Agent Design", duration: "1:00:00", type: "Build", tech: "Agents" },

      { id: "17-6", title: "Agent Roles, Responsibilities, and Goals", duration: "55:00", type: "Build", tech: "Agents" },

      { id: "17-7", title: "Agent-to-Agent Communication", duration: "1:05:00", type: "Build", tech: "Agents" },

      { id: "17-8", title: "Shared State and Agent Context", duration: "1:05:00", type: "Build", tech: "LangGraph" },

      { id: "17-9", title: "Supervisor Pattern", duration: "1:10:00", type: "Build", tech: "LangGraph" },

      { id: "17-10", title: "Hierarchical Multi-Agent Architecture", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "17-11", title: "Agent Delegation and Task Assignment", duration: "1:05:00", type: "Build", tech: "Agents" },

      { id: "17-12", title: "CrewAI Multi-Agent Fundamentals", duration: "1:00:00", type: "Build", tech: "CrewAI" },

      { id: "17-13", title: "CrewAI Agents, Tasks, and Crews", duration: "1:10:00", type: "Build", tech: "CrewAI" },

      { id: "17-14", title: "CrewAI Multi-Agent Delegation", duration: "1:10:00", type: "Build", tech: "CrewAI" },

      { id: "17-15", title: "Sequential Multi-Agent Workflows", duration: "1:00:00", type: "Build", tech: "CrewAI" },

      { id: "17-16", title: "Parallel Agent Execution", duration: "1:05:00", type: "Build", tech: "Agents" },

      { id: "17-17", title: "Peer-to-Peer Collaboration Swarms", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "17-18", title: "Debate and Consensus-Based Agents", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "17-19", title: "Reviewer and Critic Agent Patterns", duration: "1:05:00", type: "Build", tech: "Agents" },

      { id: "17-20", title: "Planner, Executor, and Reviewer Architecture", duration: "1:15:00", type: "Build", tech: "LangGraph" },

      { id: "17-21", title: "Multi-Agent RAG Systems", duration: "1:15:00", type: "Build", tech: "Agentic RAG" },

      { id: "17-22", title: "Researcher Agents and Information Gathering", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "17-23", title: "Coding Agents and Software Engineering Teams", duration: "1:20:00", type: "Build", tech: "Coding Agents" },

      { id: "17-24", title: "Testing and QA Agents", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "17-25", title: "Human-in-the-Loop Multi-Agent Systems", duration: "1:05:00", type: "Build", tech: "LangGraph" },

      { id: "17-26", title: "Agent Approval and Escalation Workflows", duration: "1:00:00", type: "Build", tech: "Agents" },

      { id: "17-27", title: "Failure Recovery Across Multiple Agents", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "17-28", title: "Conflict Resolution Between Agents", duration: "1:05:00", type: "Build", tech: "Agents" },

      { id: "17-29", title: "Multi-Agent Memory Architecture", duration: "1:10:00", type: "Build", tech: "Memory" },

      { id: "17-30", title: "Multi-Agent Tool and MCP Integration", duration: "1:15:00", type: "Build", tech: "MCP" },

      { id: "17-31", title: "Agent Routing and Dynamic Team Formation", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "17-32", title: "Multi-Agent Planning for Complex Tasks", duration: "1:15:00", type: "Build", tech: "Agents" },

      { id: "17-33", title: "Multi-Agent Evaluation and Task Success Metrics", duration: "1:10:00", type: "Build", tech: "Evaluation" },

      { id: "17-34", title: "Tracing and Observability for Agent Teams", duration: "1:05:00", type: "Build", tech: "Observability" },

      { id: "17-35", title: "Multi-Agent Security and Permission Boundaries", duration: "1:10:00", type: "Build", tech: "Security" },

      { id: "17-36", title: "Cost, Latency, and Parallelization Optimization", duration: "1:10:00", type: "Build", tech: "Optimization" },

      { id: "17-37", title: "Production Multi-Agent Architecture", duration: "1:20:00", type: "Build", tech: "Production AI" },

      { id: "17-38", title: "Deploying and Scaling Agent Teams", duration: "1:15:00", type: "Build", tech: "Docker" },

      { id: "17-39", title: "Build a Multi-Agent Software Engineering Team", duration: "1:40:00", type: "Build", tech: "CrewAI" },

      { id: "17-40", title: "Capstone: Production Multi-Agent Orchestration Platform", duration: "2:30:00", type: "Build", tech: "LangGraph" }

    ]
  },
  {
    id: "18",
    num: "18",

    title: "AI Evaluation",

    description: "A complete AI Evaluation journey covering LLM evaluation, RAG evaluation, agent evaluation, dataset design, automated metrics, LLM-as-a-Judge, hallucination detection, safety evaluation, regression testing, observability, and production evaluation pipelines.",

    youWillBuild: "an end-to-end AI evaluation platform that measures LLM, RAG, and agent quality using automated datasets, deterministic metrics, LLM-as-a-Judge, tracing, regression tests, and continuous evaluation pipelines.",

    totalDuration: "40h 45m",

    lessonsCount: 40,

    category: "AI Evaluation",

    lessons: [

      { id: "18-1", title: "Introduction to AI Evaluation", duration: "55:00", type: "Learn", tech: "Evaluation", isFree: true },

      { id: "18-2", title: "Why AI Systems Are Difficult to Evaluate", duration: "50:00", type: "Learn", tech: "LLM" },

      { id: "18-3", title: "Evaluating LLMs vs Traditional ML Systems", duration: "55:00", type: "Learn", tech: "Evaluation" },

      { id: "18-4", title: "Designing an AI Evaluation Strategy", duration: "1:00:00", type: "Learn", tech: "Evaluation" },

      { id: "18-5", title: "Building High-Quality Evaluation Datasets", duration: "1:05:00", type: "Build", tech: "Python" },

      { id: "18-6", title: "Golden Datasets and Ground-Truth Creation", duration: "1:00:00", type: "Build", tech: "Python" },

      { id: "18-7", title: "Test Cases and Evaluation Scenarios", duration: "1:00:00", type: "Build", tech: "Python" },

      { id: "18-8", title: "Deterministic Evaluation Metrics", duration: "1:05:00", type: "Build", tech: "Python" },

      { id: "18-9", title: "Exact Match, Accuracy, and F1 Evaluation", duration: "1:00:00", type: "Build", tech: "Python" },

      { id: "18-10", title: "BLEU, ROUGE, and Text Similarity Metrics", duration: "1:00:00", type: "Build", tech: "NLP" },

      { id: "18-11", title: "Semantic Similarity and Embedding-Based Evaluation", duration: "1:05:00", type: "Build", tech: "Embeddings" },

      { id: "18-12", title: "LLM-as-a-Judge Fundamentals", duration: "1:05:00", type: "Learn", tech: "LLM" },

      { id: "18-13", title: "Designing Effective LLM Judge Prompts", duration: "1:00:00", type: "Build", tech: "LLM" },

      { id: "18-14", title: "Pairwise and Point-Based LLM Evaluation", duration: "1:05:00", type: "Build", tech: "Evaluation" },

      { id: "18-15", title: "Judge Calibration and Evaluation Bias", duration: "1:05:00", type: "Build", tech: "Evaluation" },

      { id: "18-16", title: "Evaluating LLM Response Quality", duration: "1:05:00", type: "Build", tech: "LLM" },

      { id: "18-17", title: "Relevance, Helpfulness, and Completeness", duration: "1:00:00", type: "Build", tech: "Evaluation" },

      { id: "18-18", title: "Faithfulness and Groundedness Evaluation", duration: "1:05:00", type: "Build", tech: "RAG" },

      { id: "18-19", title: "Hallucination Detection and Evaluation", duration: "1:10:00", type: "Build", tech: "LLM" },

      { id: "18-20", title: "Evaluating Structured Outputs and Tool Calls", duration: "1:05:00", type: "Build", tech: "Agents" },

      { id: "18-21", title: "RAG Retrieval Evaluation", duration: "1:05:00", type: "Build", tech: "RAG" },

      { id: "18-22", title: "Precision, Recall, Hit Rate, and MRR", duration: "1:05:00", type: "Build", tech: "RAG" },

      { id: "18-23", title: "Context Relevance and Context Recall", duration: "1:05:00", type: "Build", tech: "RAG" },

      { id: "18-24", title: "End-to-End RAG Evaluation", duration: "1:15:00", type: "Build", tech: "RAG" },

      { id: "18-25", title: "AI Agent Evaluation Fundamentals", duration: "1:00:00", type: "Learn", tech: "Agents" },

      { id: "18-26", title: "Evaluating Agent Planning and Reasoning", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "18-27", title: "Evaluating Tool Selection and Tool Execution", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "18-28", title: "Evaluating Multi-Agent Systems", duration: "1:10:00", type: "Build", tech: "Multi-Agent" },

      { id: "18-29", title: "Agent Trajectory and Trace Evaluation", duration: "1:10:00", type: "Build", tech: "Observability" },

      { id: "18-30", title: "Safety, Toxicity, and Responsible AI Evaluation", duration: "1:05:00", type: "Build", tech: "Safety" },

      { id: "18-31", title: "Prompt Injection and Adversarial Testing", duration: "1:10:00", type: "Build", tech: "Security" },

      { id: "18-32", title: "LLM Regression Testing", duration: "1:05:00", type: "Build", tech: "Testing" },

      { id: "18-33", title: "Evaluation with Tracing and Observability", duration: "1:05:00", type: "Build", tech: "Observability" },

      { id: "18-34", title: "Online vs Offline AI Evaluation", duration: "1:00:00", type: "Learn", tech: "Evaluation" },

      { id: "18-35", title: "Building Continuous Evaluation Pipelines", duration: "1:15:00", type: "Build", tech: "CI/CD" },

      { id: "18-36", title: "Evaluation Experiments and A/B Testing", duration: "1:05:00", type: "Build", tech: "Evaluation" },

      { id: "18-37", title: "Evaluation Cost, Latency, and Scalability", duration: "1:00:00", type: "Build", tech: "Optimization" },

      { id: "18-38", title: "Production AI Quality Monitoring", duration: "1:15:00", type: "Build", tech: "Observability" },

      { id: "18-39", title: "Building an AI Evaluation Dashboard", duration: "1:30:00", type: "Build", tech: "Python" },

      { id: "18-40", title: "Capstone: Build a Production AI Evaluation Platform", duration: "2:30:00", type: "Build", tech: "Evaluation" }

    ]
  },
  {
    id: "19",
    num: "19",

    title: "AI Guardrails & Safety",

    description: "A complete AI safety and guardrails journey covering input validation, output validation, prompt injection defense, jailbreak prevention, PII protection, content safety, tool permissions, hallucination controls, policy enforcement, monitoring, red teaming, and production AI security.",

    youWillBuild: "production-ready AI systems with input and output guardrails, prompt injection protection, PII detection, content moderation, tool access controls, hallucination prevention, policy enforcement, red-team testing, and real-time safety monitoring.",

    totalDuration: "41h 20m",

    lessonsCount: 40,

    category: "AI Safety",

    lessons: [

      { id: "19-1", title: "Introduction to AI Guardrails", duration: "55:00", type: "Learn", tech: "Guardrails", isFree: true },

      { id: "19-2", title: "Why AI Applications Need Guardrails", duration: "50:00", type: "Learn", tech: "AI Safety" },

      { id: "19-3", title: "AI Safety vs Security vs Evaluation", duration: "55:00", type: "Learn", tech: "AI Safety" },

      { id: "19-4", title: "Designing a Guardrail Architecture", duration: "1:00:00", type: "Learn", tech: "Guardrails" },

      { id: "19-5", title: "Input Guardrails and Request Validation", duration: "1:05:00", type: "Build", tech: "Guardrails" },

      { id: "19-6", title: "Output Guardrails and Response Validation", duration: "1:05:00", type: "Build", tech: "Guardrails" },

      { id: "19-7", title: "Structured Output Validation", duration: "1:00:00", type: "Build", tech: "Pydantic" },

      { id: "19-8", title: "Schema Enforcement and Type Safety", duration: "1:00:00", type: "Build", tech: "Python" },

      { id: "19-9", title: "Prompt Injection Attacks", duration: "1:05:00", type: "Learn", tech: "Security" },

      { id: "19-10", title: "Defending Against Prompt Injection", duration: "1:10:00", type: "Build", tech: "Security" },

      { id: "19-11", title: "Jailbreak Attacks and Defense Strategies", duration: "1:10:00", type: "Build", tech: "Security" },

      { id: "19-12", title: "Indirect Prompt Injection", duration: "1:05:00", type: "Build", tech: "Security" },

      { id: "19-13", title: "PII Detection and Data Protection", duration: "1:05:00", type: "Build", tech: "Privacy" },

      { id: "19-14", title: "PII Masking, Redaction, and Anonymization", duration: "1:05:00", type: "Build", tech: "Privacy" },

      { id: "19-15", title: "Sensitive Data Leakage Prevention", duration: "1:00:00", type: "Build", tech: "Security" },

      { id: "19-16", title: "Content Moderation and Harmful Content Detection", duration: "1:05:00", type: "Build", tech: "Safety" },

      { id: "19-17", title: "Toxicity, Abuse, and Policy Classification", duration: "1:00:00", type: "Build", tech: "Safety" },

      { id: "19-18", title: "Hallucination Detection and Prevention", duration: "1:10:00", type: "Build", tech: "LLM" },

      { id: "19-19", title: "Grounding and Citation Guardrails", duration: "1:05:00", type: "Build", tech: "RAG" },

      { id: "19-20", title: "Confidence and Uncertainty Handling", duration: "1:00:00", type: "Build", tech: "LLM" },

      { id: "19-21", title: "Tool Calling Safety", duration: "1:05:00", type: "Build", tech: "Agents" },

      { id: "19-22", title: "Tool Permissions and Least-Privilege Access", duration: "1:05:00", type: "Build", tech: "Security" },

      { id: "19-23", title: "Preventing Dangerous Agent Actions", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "19-24", title: "Human Approval and High-Risk Actions", duration: "1:05:00", type: "Build", tech: "Agents" },

      { id: "19-25", title: "Guardrails for RAG Systems", duration: "1:05:00", type: "Build", tech: "RAG" },

      { id: "19-26", title: "Guardrails for AI Agents", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "19-27", title: "Guardrails for Multi-Agent Systems", duration: "1:10:00", type: "Build", tech: "Multi-Agent" },

      { id: "19-28", title: "Building Policy Enforcement Layers", duration: "1:05:00", type: "Build", tech: "Security" },

      { id: "19-29", title: "Rate Limits, Quotas, and Abuse Prevention", duration: "1:00:00", type: "Build", tech: "Security" },

      { id: "19-30", title: "AI Authentication and Authorization", duration: "1:05:00", type: "Build", tech: "Security" },

      { id: "19-31", title: "Red Teaming AI Applications", duration: "1:10:00", type: "Build", tech: "Red Teaming" },

      { id: "19-32", title: "Adversarial Testing and Attack Simulation", duration: "1:10:00", type: "Build", tech: "Security" },

      { id: "19-33", title: "Automated Safety Testing", duration: "1:05:00", type: "Build", tech: "Testing" },

      { id: "19-34", title: "Guardrail Evaluation and Effectiveness Metrics", duration: "1:05:00", type: "Build", tech: "Evaluation" },

      { id: "19-35", title: "AI Safety Monitoring and Observability", duration: "1:05:00", type: "Build", tech: "Observability" },

      { id: "19-36", title: "Incident Detection and Response for AI Systems", duration: "1:10:00", type: "Build", tech: "Security" },

      { id: "19-37", title: "Guardrail Performance and Latency Optimization", duration: "1:00:00", type: "Build", tech: "Optimization" },

      { id: "19-38", title: "Production AI Security Architecture", duration: "1:20:00", type: "Build", tech: "Security" },

      { id: "19-39", title: "Build a Complete AI Guardrails Pipeline", duration: "1:40:00", type: "Build", tech: "Guardrails" },

      { id: "19-40", title: "Capstone: Build a Secure Production AI Agent", duration: "2:30:00", type: "Build", tech: "AI Safety" }

    ]
  },
  {
    id: "20",
    num: "20",

    title: "Voice AI Engineering",

    description: "A complete Voice AI Engineering journey covering speech recognition, text-to-speech, audio processing, conversational AI, real-time streaming, interruption handling, voice agents, telephony, tool calling, memory, latency optimization, evaluation, safety, and production deployment.",

    youWillBuild: "production-ready real-time voice AI agents that can listen, understand, reason, speak naturally, use tools, maintain conversations, handle interruptions, connect to phone systems, and complete real-world tasks.",

    totalDuration: "43h 50m",

    lessonsCount: 40,

    category: "Voice AI",

    lessons: [

      // =====================================================
      // MODULE 01 — VOICE AI FOUNDATIONS
      // =====================================================

      { id: "20-1", title: "Introduction to Voice AI", duration: "55:00", type: "Learn", tech: "Voice AI", isFree: true },

      { id: "20-2", title: "How Conversational Voice AI Works", duration: "55:00", type: "Learn", tech: "Voice AI" },

      { id: "20-3", title: "Voice AI Architecture: Audio → STT → LLM → TTS", duration: "1:00:00", type: "Learn", tech: "Voice AI" },

      { id: "20-4", title: "Latency and Real-Time Voice Constraints", duration: "1:00:00", type: "Learn", tech: "Voice AI" },


      // =====================================================
      // MODULE 02 — AUDIO & SPEECH
      // =====================================================

      { id: "20-5", title: "Digital Audio Fundamentals", duration: "1:00:00", type: "Learn", tech: "Audio" },

      { id: "20-6", title: "Audio Formats, Sampling, and Codecs", duration: "55:00", type: "Learn", tech: "Audio" },

      { id: "20-7", title: "Noise Reduction and Audio Preprocessing", duration: "1:00:00", type: "Build", tech: "Python" },

      { id: "20-8", title: "Voice Activity Detection", duration: "1:05:00", type: "Build", tech: "Audio" },


      // =====================================================
      // MODULE 03 — SPEECH TO TEXT
      // =====================================================

      { id: "20-9", title: "Speech-to-Text Fundamentals", duration: "55:00", type: "Learn", tech: "STT" },

      { id: "20-10", title: "Building Speech Recognition with Python", duration: "1:05:00", type: "Build", tech: "Python" },

      { id: "20-11", title: "Streaming Speech Recognition", duration: "1:10:00", type: "Build", tech: "STT" },

      { id: "20-12", title: "Streaming Transcription and Partial Results", duration: "1:10:00", type: "Build", tech: "STT" },


      // =====================================================
      // MODULE 04 — TEXT TO SPEECH
      // =====================================================

      { id: "20-13", title: "Text-to-Speech Fundamentals", duration: "55:00", type: "Learn", tech: "TTS" },

      { id: "20-14", title: "Building TTS Applications", duration: "1:05:00", type: "Build", tech: "TTS" },

      { id: "20-15", title: "Streaming Text-to-Speech", duration: "1:05:00", type: "Build", tech: "TTS" },

      { id: "20-16", title: "Voice Selection, Prosody, and Natural Speech", duration: "1:00:00", type: "Build", tech: "TTS" },


      // =====================================================
      // MODULE 05 — CONVERSATIONAL VOICE AGENTS
      // =====================================================

      { id: "20-17", title: "Building Your First Voice Agent", duration: "1:15:00", type: "Build", tech: "Python" },

      { id: "20-18", title: "Connecting STT → LLM → TTS", duration: "1:15:00", type: "Build", tech: "LLM" },

      { id: "20-19", title: "Conversation State and Context Management", duration: "1:05:00", type: "Build", tech: "Agents" },

      { id: "20-20", title: "Voice Agent Memory", duration: "1:10:00", type: "Build", tech: "Memory" },


      // =====================================================
      // MODULE 06 — REAL-TIME VOICE
      // =====================================================

      { id: "20-21", title: "Real-Time Voice Streaming Architecture", duration: "1:15:00", type: "Build", tech: "WebSockets" },

      { id: "20-22", title: "WebSockets for Real-Time Voice", duration: "1:10:00", type: "Build", tech: "WebSockets" },

      { id: "20-23", title: "Turn Detection and Endpointing", duration: "1:05:00", type: "Build", tech: "Voice AI" },

      { id: "20-24", title: "Barge-In and Interruption Handling", duration: "1:10:00", type: "Build", tech: "Voice AI" },


      // =====================================================
      // MODULE 07 — VOICE AGENTS + TOOLS
      // =====================================================

      { id: "20-25", title: "Tool Calling in Voice Agents", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "20-26", title: "Voice Agents with APIs and Databases", duration: "1:10:00", type: "Build", tech: "Tools" },

      { id: "20-27", title: "Voice Agents with MCP", duration: "1:15:00", type: "Build", tech: "MCP" },

      { id: "20-28", title: "Building Autonomous Voice Workflows", duration: "1:20:00", type: "Build", tech: "Agents" },


      // =====================================================
      // MODULE 08 — TELEPHONY
      // =====================================================

      { id: "20-29", title: "Introduction to AI Telephony", duration: "55:00", type: "Learn", tech: "Telephony" },

      { id: "20-30", title: "Connecting Voice Agents to Phone Calls", duration: "1:15:00", type: "Build", tech: "Telephony" },

      { id: "20-31", title: "Inbound and Outbound Voice Agents", duration: "1:10:00", type: "Build", tech: "Telephony" },

      { id: "20-32", title: "Call Routing, Transfers, and Escalation", duration: "1:10:00", type: "Build", tech: "Telephony" },


      // =====================================================
      // MODULE 09 — PRODUCTION VOICE AI
      // =====================================================

      { id: "20-33", title: "Voice Agent Evaluation", duration: "1:05:00", type: "Build", tech: "Evaluation" },

      { id: "20-34", title: "Voice Quality and Conversation Analytics", duration: "1:05:00", type: "Build", tech: "Analytics" },

      { id: "20-35", title: "Latency Optimization for Voice Agents", duration: "1:10:00", type: "Build", tech: "Optimization" },

      { id: "20-36", title: "Voice AI Cost Optimization", duration: "1:00:00", type: "Build", tech: "Optimization" },

      { id: "20-37", title: "Voice Agent Guardrails and Safety", duration: "1:10:00", type: "Build", tech: "Guardrails" },

      { id: "20-38", title: "Observability, Logging, and Call Tracing", duration: "1:10:00", type: "Build", tech: "Observability" },


      // =====================================================
      // CAPSTONE
      // =====================================================

      { id: "20-39", title: "Build a Production Customer Support Voice Agent", duration: "1:45:00", type: "Build", tech: "Voice AI" },

      { id: "20-40", title: "Capstone: Build an Autonomous Voice Calling Agent", duration: "2:30:00", type: "Build", tech: "Voice AI" }

    ]
  },
  {
    id: "21",
    num: "21",

    title: "AI Automation",

    description: "A complete AI Automation journey covering workflow automation, event-driven AI, APIs, webhooks, AI agents, tool calling, MCP, business process automation, document automation, email automation, browser automation, scheduling, human-in-the-loop workflows, monitoring, security, and production automation systems.",

    youWillBuild: "production-ready AI automation systems that can receive events, understand information, make decisions, call tools, update databases, communicate with users, execute multi-step workflows, and operate autonomously with human approval when required.",

    totalDuration: "42h 30m",

    lessonsCount: 40,

    category: "AI Automation",

    lessons: [

      // =====================================================
      // MODULE 01 — AUTOMATION FOUNDATIONS
      // =====================================================

      { id: "21-1", title: "Introduction to AI Automation", duration: "55:00", type: "Learn", tech: "AI Automation", isFree: true },

      { id: "21-2", title: "Traditional Automation vs AI Automation", duration: "50:00", type: "Learn", tech: "Automation" },

      { id: "21-3", title: "AI Workflows vs AI Agents", duration: "55:00", type: "Learn", tech: "Agents" },

      { id: "21-4", title: "Designing End-to-End AI Automation Systems", duration: "1:00:00", type: "Learn", tech: "Automation" },


      // =====================================================
      // MODULE 02 — WORKFLOW ENGINEERING
      // =====================================================

      { id: "21-5", title: "Workflow Triggers and Actions", duration: "1:00:00", type: "Build", tech: "Automation" },

      { id: "21-6", title: "Sequential and Conditional Workflows", duration: "1:00:00", type: "Build", tech: "Python" },

      { id: "21-7", title: "Loops, Branches, and Workflow State", duration: "1:05:00", type: "Build", tech: "Workflows" },

      { id: "21-8", title: "Event-Driven AI Automation", duration: "1:10:00", type: "Build", tech: "Events" },


      // =====================================================
      // MODULE 03 — APIs & INTEGRATIONS
      // =====================================================

      { id: "21-9", title: "API-Based AI Automation", duration: "1:05:00", type: "Build", tech: "REST API" },

      { id: "21-10", title: "Webhooks and Event-Based Triggers", duration: "1:05:00", type: "Build", tech: "Webhooks" },

      { id: "21-11", title: "Connecting AI Systems to Databases", duration: "1:05:00", type: "Build", tech: "SQL" },

      { id: "21-12", title: "Connecting SaaS Applications with AI", duration: "1:10:00", type: "Build", tech: "APIs" },


      // =====================================================
      // MODULE 04 — AI + WORKFLOW AUTOMATION
      // =====================================================

      { id: "21-13", title: "LLM-Powered Workflow Decisions", duration: "1:05:00", type: "Build", tech: "LLM" },

      { id: "21-14", title: "AI Classification and Routing Workflows", duration: "1:00:00", type: "Build", tech: "LLM" },

      { id: "21-15", title: "AI-Powered Data Extraction Pipelines", duration: "1:10:00", type: "Build", tech: "LLM" },

      { id: "21-16", title: "AI Agents Inside Automation Workflows", duration: "1:15:00", type: "Build", tech: "Agents" },


      // =====================================================
      // MODULE 05 — DOCUMENT & DATA AUTOMATION
      // =====================================================

      { id: "21-17", title: "Intelligent Document Processing", duration: "1:10:00", type: "Build", tech: "Document AI" },

      { id: "21-18", title: "PDF and Document Automation", duration: "1:05:00", type: "Build", tech: "Python" },

      { id: "21-19", title: "Invoice and Receipt Processing", duration: "1:05:00", type: "Build", tech: "Document AI" },

      { id: "21-20", title: "Automated Data Extraction and Validation", duration: "1:05:00", type: "Build", tech: "Python" },


      // =====================================================
      // MODULE 06 — COMMUNICATION AUTOMATION
      // =====================================================

      { id: "21-21", title: "AI Email Automation", duration: "1:05:00", type: "Build", tech: "Email" },

      { id: "21-22", title: "Automated Email Classification and Routing", duration: "1:00:00", type: "Build", tech: "LLM" },

      { id: "21-23", title: "AI-Powered Email Response Workflows", duration: "1:10:00", type: "Build", tech: "LLM" },

      { id: "21-24", title: "AI Chat and Customer Communication Automation", duration: "1:10:00", type: "Build", tech: "Agents" },


      // =====================================================
      // MODULE 07 — BROWSER & COMPUTER AUTOMATION
      // =====================================================

      { id: "21-25", title: "Browser Automation Fundamentals", duration: "1:00:00", type: "Learn", tech: "Browser Automation" },

      { id: "21-26", title: "AI-Powered Browser Workflows", duration: "1:10:00", type: "Build", tech: "Browser Automation" },

      { id: "21-27", title: "Computer-Use Agents", duration: "1:15:00", type: "Build", tech: "Agents" },

      { id: "21-28", title: "Automating Multi-Step Web Tasks", duration: "1:15:00", type: "Build", tech: "Browser Automation" },


      // =====================================================
      // MODULE 08 — ADVANCED AI AUTOMATION
      // =====================================================

      { id: "21-29", title: "AI Automation with MCP Tools", duration: "1:15:00", type: "Build", tech: "MCP" },

      { id: "21-30", title: "Agentic Workflow Orchestration", duration: "1:15:00", type: "Build", tech: "LangGraph" },

      { id: "21-31", title: "Long-Running AI Workflows", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "21-32", title: "Human-in-the-Loop Automation", duration: "1:05:00", type: "Build", tech: "Agents" },


      // =====================================================
      // MODULE 09 — PRODUCTION AUTOMATION
      // =====================================================

      { id: "21-33", title: "Automation Reliability and Failure Recovery", duration: "1:10:00", type: "Build", tech: "Automation" },

      { id: "21-34", title: "Retries, Queues, and Background Jobs", duration: "1:10:00", type: "Build", tech: "Python" },

      { id: "21-35", title: "AI Automation Monitoring and Observability", duration: "1:05:00", type: "Build", tech: "Observability" },

      { id: "21-36", title: "Security and Permissions for AI Automation", duration: "1:10:00", type: "Build", tech: "Security" },

      { id: "21-37", title: "Cost and Performance Optimization", duration: "1:05:00", type: "Build", tech: "Optimization" },

      { id: "21-38", title: "Deploying Scalable AI Automation Systems", duration: "1:20:00", type: "Build", tech: "Docker" },


      // =====================================================
      // CAPSTONE
      // =====================================================

      { id: "21-39", title: "Build an Autonomous Business Workflow", duration: "1:45:00", type: "Build", tech: "AI Automation" },

      { id: "21-40", title: "Capstone: Build a Production AI Automation Platform", duration: "2:30:00", type: "Build", tech: "Agents" },

    ]
  },
  {
    id: "22",
    num: "22",

    title: "Production AI Systems",

    description: "A complete production AI engineering journey covering system architecture, APIs, microservices, model serving, inference optimization, databases, queues, caching, observability, security, evaluation, CI/CD, cloud deployment, scalability, reliability, cost optimization, and production AI operations.",

    youWillBuild: "production-grade AI platforms that combine LLMs, RAG, agents, MCP, databases, APIs, asynchronous workers, observability, evaluation, security, and scalable cloud infrastructure.",

    totalDuration: "46h 20m",

    lessonsCount: 40,

    category: "Production AI",

    lessons: [

      // =====================================================
      // MODULE 01 — PRODUCTION AI FOUNDATIONS
      // =====================================================

      {
        id: "22-1",
        title: "Introduction to Production AI Engineering",
        duration: "55:00",
        type: "Learn",
        tech: "Production AI",
        isFree: true
      },

      {
        id: "22-2",
        title: "Prototype vs Production AI Systems",
        duration: "50:00",
        type: "Learn",
        tech: "Architecture"
      },

      {
        id: "22-3",
        title: "Production AI System Architecture",
        duration: "1:05:00",
        type: "Learn",
        tech: "Architecture"
      },

      {
        id: "22-4",
        title: "Designing Scalable AI Applications",
        duration: "1:05:00",
        type: "Build",
        tech: "Architecture"
      },


      // =====================================================
      // MODULE 02 — BACKEND & API ENGINEERING
      // =====================================================

      {
        id: "22-5",
        title: "Building AI APIs with FastAPI",
        duration: "1:05:00",
        type: "Build",
        tech: "FastAPI"
      },

      {
        id: "22-6",
        title: "Async APIs and Concurrent AI Requests",
        duration: "1:05:00",
        type: "Build",
        tech: "Python"
      },

      {
        id: "22-7",
        title: "Streaming LLM Responses",
        duration: "1:05:00",
        type: "Build",
        tech: "Streaming"
      },

      {
        id: "22-8",
        title: "WebSockets and Real-Time AI Applications",
        duration: "1:10:00",
        type: "Build",
        tech: "WebSockets"
      },


      // =====================================================
      // MODULE 03 — DATA & STORAGE
      // =====================================================

      {
        id: "22-9",
        title: "Database Architecture for AI Applications",
        duration: "1:00:00",
        type: "Learn",
        tech: "Databases"
      },

      {
        id: "22-10",
        title: "PostgreSQL for Production AI Systems",
        duration: "1:05:00",
        type: "Build",
        tech: "PostgreSQL"
      },

      {
        id: "22-11",
        title: "Vector Databases in Production",
        duration: "1:10:00",
        type: "Build",
        tech: "Vector DB"
      },

      {
        id: "22-12",
        title: "Data Pipelines and AI Data Management",
        duration: "1:10:00",
        type: "Build",
        tech: "Data Engineering"
      },


      // =====================================================
      // MODULE 04 — LLM SERVING & INFERENCE
      // =====================================================

      {
        id: "22-13",
        title: "LLM Inference Architecture",
        duration: "1:00:00",
        type: "Learn",
        tech: "LLM"
      },

      {
        id: "22-14",
        title: "Model Serving and Inference APIs",
        duration: "1:10:00",
        type: "Build",
        tech: "Inference"
      },

      {
        id: "22-15",
        title: "Batch vs Real-Time Inference",
        duration: "1:00:00",
        type: "Build",
        tech: "Inference"
      },

      {
        id: "22-16",
        title: "Inference Optimization and Quantization",
        duration: "1:15:00",
        type: "Build",
        tech: "Optimization"
      },


      // =====================================================
      // MODULE 05 — PERFORMANCE
      // =====================================================

      {
        id: "22-17",
        title: "LLM Latency Optimization",
        duration: "1:05:00",
        type: "Build",
        tech: "Optimization"
      },

      {
        id: "22-18",
        title: "Caching Strategies for AI Applications",
        duration: "1:05:00",
        type: "Build",
        tech: "Redis"
      },

      {
        id: "22-19",
        title: "Semantic Caching for LLM Applications",
        duration: "1:05:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "22-20",
        title: "Load Balancing and Model Routing",
        duration: "1:10:00",
        type: "Build",
        tech: "Architecture"
      },


      // =====================================================
      // MODULE 06 — ASYNC & DISTRIBUTED SYSTEMS
      // =====================================================

      {
        id: "22-21",
        title: "Background Jobs for AI Workloads",
        duration: "1:05:00",
        type: "Build",
        tech: "Workers"
      },

      {
        id: "22-22",
        title: "Queues and Event-Driven AI Systems",
        duration: "1:10:00",
        type: "Build",
        tech: "Message Queue"
      },

      {
        id: "22-23",
        title: "Distributed Agent and RAG Workflows",
        duration: "1:15:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "22-24",
        title: "Long-Running and Stateful AI Jobs",
        duration: "1:10:00",
        type: "Build",
        tech: "Distributed Systems"
      },


      // =====================================================
      // MODULE 07 — OBSERVABILITY
      // =====================================================

      {
        id: "22-25",
        title: "Observability for AI Applications",
        duration: "1:00:00",
        type: "Learn",
        tech: "Observability"
      },

      {
        id: "22-26",
        title: "Logging, Metrics, and Distributed Tracing",
        duration: "1:10:00",
        type: "Build",
        tech: "Observability"
      },

      {
        id: "22-27",
        title: "LLM and Agent Trace Analysis",
        duration: "1:10:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "22-28",
        title: "Production AI Monitoring and Alerting",
        duration: "1:10:00",
        type: "Build",
        tech: "Monitoring"
      },


      // =====================================================
      // MODULE 08 — SECURITY & RELIABILITY
      // =====================================================

      {
        id: "22-29",
        title: "Production AI Security Architecture",
        duration: "1:10:00",
        type: "Build",
        tech: "Security"
      },

      {
        id: "22-30",
        title: "Authentication, Authorization, and API Security",
        duration: "1:10:00",
        type: "Build",
        tech: "Security"
      },

      {
        id: "22-31",
        title: "Secrets Management and Data Protection",
        duration: "1:05:00",
        type: "Build",
        tech: "Security"
      },

      {
        id: "22-32",
        title: "Reliability, Retries, Timeouts, and Circuit Breakers",
        duration: "1:10:00",
        type: "Build",
        tech: "Reliability"
      },


      // =====================================================
      // MODULE 09 — CI/CD & CLOUD
      // =====================================================

      {
        id: "22-33",
        title: "Testing AI Applications Before Deployment",
        duration: "1:05:00",
        type: "Build",
        tech: "Testing"
      },

      {
        id: "22-34",
        title: "CI/CD Pipelines for AI Systems",
        duration: "1:10:00",
        type: "Build",
        tech: "CI/CD"
      },

      {
        id: "22-35",
        title: "Containerizing AI Applications with Docker",
        duration: "1:10:00",
        type: "Build",
        tech: "Docker"
      },

      {
        id: "22-36",
        title: "Deploying AI Systems to Cloud Infrastructure",
        duration: "1:20:00",
        type: "Build",
        tech: "Cloud"
      },


      // =====================================================
      // MODULE 10 — PRODUCTION ARCHITECTURE & CAPSTONE
      // =====================================================

      {
        id: "22-37",
        title: "Scalable LLM, RAG, and Agent Architecture",
        duration: "1:20:00",
        type: "Build",
        tech: "Production AI"
      },

      {
        id: "22-38",
        title: "Production AI Cost Optimization",
        duration: "1:10:00",
        type: "Build",
        tech: "Optimization"
      },

      {
        id: "22-39",
        title: "Design and Build a Production AI Platform",
        duration: "2:00:00",
        type: "Build",
        tech: "Production AI"
      },

      {
        id: "22-40",
        title: "Capstone: Deploy a Scalable Production AI System",
        duration: "3:00:00",
        type: "Build",
        tech: "Production AI"
      }

    ]
  },

  {
    id: "23",
    num: "23",

    title: "AI Business Systems",

    description: "A complete journey from AI workflows to autonomous business systems covering AI-powered customer support, sales, marketing, operations, document processing, CRM automation, knowledge systems, decision automation, analytics, human-in-the-loop workflows, and production business AI.",

    youWillBuild: "real-world AI business systems that automate customer support, sales, lead qualification, document processing, internal knowledge, reporting, operations, and decision-making using LLMs, RAG, agents, MCP, automation, and production infrastructure.",

    totalDuration: "43h 30m",

    lessonsCount: 40,

    category: "AI Business Systems",

    lessons: [

      // =====================================================
      // MODULE 01 — AI BUSINESS SYSTEM FOUNDATIONS
      // =====================================================

      { id: "23-1", title: "Introduction to AI Business Systems", duration: "55:00", type: "Learn", tech: "AI Systems", isFree: true },

      { id: "23-2", title: "Identifying Business Processes for AI Automation", duration: "55:00", type: "Learn", tech: "Automation" },

      { id: "23-3", title: "AI Workflows, Agents, and Business Systems", duration: "1:00:00", type: "Learn", tech: "Agents" },

      { id: "23-4", title: "Designing AI Solutions for Real Business Problems", duration: "1:05:00", type: "Build", tech: "Architecture" },


      // =====================================================
      // MODULE 02 — AI CUSTOMER SUPPORT
      // =====================================================

      { id: "23-5", title: "Building an AI Customer Support System", duration: "1:15:00", type: "Build", tech: "Agents" },

      { id: "23-6", title: "Customer Support RAG Knowledge Base", duration: "1:10:00", type: "Build", tech: "RAG" },

      { id: "23-7", title: "Ticket Classification and Intelligent Routing", duration: "1:05:00", type: "Build", tech: "LLM" },

      { id: "23-8", title: "AI Escalation and Human Handoff", duration: "1:05:00", type: "Build", tech: "Agents" },


      // =====================================================
      // MODULE 03 — AI SALES SYSTEMS
      // =====================================================

      { id: "23-9", title: "AI Lead Qualification", duration: "1:05:00", type: "Build", tech: "Agents" },

      { id: "23-10", title: "AI Sales Assistant", duration: "1:10:00", type: "Build", tech: "Agents" },

      { id: "23-11", title: "Automated Lead Research", duration: "1:10:00", type: "Build", tech: "Agentic RAG" },

      { id: "23-12", title: "CRM Automation with AI Agents", duration: "1:15:00", type: "Build", tech: "MCP" },


      // =====================================================
      // MODULE 04 — DOCUMENT INTELLIGENCE
      // =====================================================

      { id: "23-13", title: "Enterprise Document Intelligence", duration: "1:05:00", type: "Learn", tech: "Document AI" },

      { id: "23-14", title: "Automated Contract Analysis", duration: "1:10:00", type: "Build", tech: "LLM" },

      { id: "23-15", title: "Invoice and Financial Document Automation", duration: "1:10:00", type: "Build", tech: "Document AI" },

      { id: "23-16", title: "Document Review Agents", duration: "1:15:00", type: "Build", tech: "Agents" },


      // =====================================================
      // MODULE 05 — INTERNAL KNOWLEDGE SYSTEMS
      // =====================================================

      { id: "23-17", title: "Enterprise Knowledge Assistant", duration: "1:10:00", type: "Build", tech: "RAG" },

      { id: "23-18", title: "Multi-Source Enterprise Search", duration: "1:15:00", type: "Build", tech: "Agentic RAG" },

      { id: "23-19", title: "AI Research and Knowledge Agents", duration: "1:15:00", type: "Build", tech: "Agents" },

      { id: "23-20", title: "Enterprise Knowledge Graph Systems", duration: "1:15:00", type: "Build", tech: "GraphRAG" },


      // =====================================================
      // MODULE 06 — OPERATIONS AUTOMATION
      // =====================================================

      { id: "23-21", title: "AI Operations Automation", duration: "1:05:00", type: "Build", tech: "Automation" },

      { id: "23-22", title: "AI Email and Communication Workflows", duration: "1:05:00", type: "Build", tech: "LLM" },

      { id: "23-23", title: "AI Meeting Summaries and Action Automation", duration: "1:05:00", type: "Build", tech: "LLM" },

      { id: "23-24", title: "AI Reporting and Business Intelligence", duration: "1:15:00", type: "Build", tech: "AI Analytics" },


      // =====================================================
      // MODULE 07 — DECISION SYSTEMS
      // =====================================================

      { id: "23-25", title: "AI Decision-Making Systems", duration: "1:05:00", type: "Learn", tech: "AI Systems" },

      { id: "23-26", title: "Rule-Based + LLM Decision Architecture", duration: "1:10:00", type: "Build", tech: "LLM" },

      { id: "23-27", title: "Human-in-the-Loop Business Decisions", duration: "1:05:00", type: "Build", tech: "Agents" },

      { id: "23-28", title: "Building Auditable AI Decision Pipelines", duration: "1:15:00", type: "Build", tech: "Evaluation" },


      // =====================================================
      // MODULE 08 — MCP & AGENT BUSINESS INTEGRATION
      // =====================================================

      { id: "23-29", title: "Connecting Business Systems with MCP", duration: "1:15:00", type: "Build", tech: "MCP" },

      { id: "23-30", title: "Building Cross-System AI Agents", duration: "1:15:00", type: "Build", tech: "Agents" },

      { id: "23-31", title: "Multi-Agent Business Workflows", duration: "1:20:00", type: "Build", tech: "Multi-Agent" },

      { id: "23-32", title: "Autonomous End-to-End Business Processes", duration: "1:20:00", type: "Build", tech: "Agents" },


      // =====================================================
      // MODULE 09 — GOVERNANCE & PRODUCTION
      // =====================================================

      { id: "23-33", title: "AI Governance for Business Systems", duration: "1:05:00", type: "Learn", tech: "Governance" },

      { id: "23-34", title: "AI Security and Access Control", duration: "1:10:00", type: "Build", tech: "Security" },

      { id: "23-35", title: "AI Evaluation and Business KPIs", duration: "1:10:00", type: "Build", tech: "Evaluation" },

      { id: "23-36", title: "Monitoring AI Business Workflows", duration: "1:10:00", type: "Build", tech: "Observability" },

      { id: "23-37", title: "AI Cost and ROI Optimization", duration: "1:05:00", type: "Build", tech: "Optimization" },

      { id: "23-38", title: "Scaling AI Business Systems", duration: "1:20:00", type: "Build", tech: "Production AI" },


      // =====================================================
      // CAPSTONE
      // =====================================================

      { id: "23-39", title: "Build an End-to-End AI Business Platform", duration: "2:00:00", type: "Build", tech: "AI Systems" },

      { id: "23-40", title: "Capstone: Build an Autonomous AI Business System", duration: "3:00:00", type: "Build", tech: "Agents" }

    ]
  },
  {
    id: "24",
    num: "24",

    title: "Computer Use & Browser Agents",

    description: "A complete journey from browser automation to autonomous computer-use agents covering web navigation, DOM interaction, browser control, visual agents, computer-use models, task planning, authentication, form automation, web research, error recovery, security, evaluation, and production deployment.",

    youWillBuild: "autonomous browser and computer-use agents that can navigate websites, understand pages, fill forms, perform multi-step tasks, research information, interact with business applications, recover from failures, and complete real-world workflows safely.",

    totalDuration: "42h 15m",

    lessonsCount: 40,

    category: "Computer Use AI",

    lessons: [

      // =====================================================
      // MODULE 01 — FOUNDATIONS
      // =====================================================

      {
        id: "24-1",
        title: "Introduction to Computer-Use AI",
        duration: "55:00",
        type: "Learn",
        tech: "Computer Use",
        isFree: true
      },

      {
        id: "24-2",
        title: "Browser Automation vs Browser Agents",
        duration: "50:00",
        type: "Learn",
        tech: "Browser Agents"
      },

      {
        id: "24-3",
        title: "How Computer-Use Agents Work",
        duration: "1:00:00",
        type: "Learn",
        tech: "Agents"
      },

      {
        id: "24-4",
        title: "Computer-Use Agent Architecture",
        duration: "1:00:00",
        type: "Learn",
        tech: "Architecture"
      },


      // =====================================================
      // MODULE 02 — BROWSER FUNDAMENTALS
      // =====================================================

      {
        id: "24-5",
        title: "Browser Architecture and Web Pages",
        duration: "55:00",
        type: "Learn",
        tech: "Web"
      },

      {
        id: "24-6",
        title: "DOM, Selectors, and Web Elements",
        duration: "1:00:00",
        type: "Build",
        tech: "Browser"
      },

      {
        id: "24-7",
        title: "Browser Automation with Playwright",
        duration: "1:10:00",
        type: "Build",
        tech: "Playwright"
      },

      {
        id: "24-8",
        title: "Browser Automation with Selenium",
        duration: "1:05:00",
        type: "Build",
        tech: "Selenium"
      },


      // =====================================================
      // MODULE 03 — WEB INTERACTION
      // =====================================================

      {
        id: "24-9",
        title: "Clicking, Typing, Scrolling, and Navigation",
        duration: "1:00:00",
        type: "Build",
        tech: "Playwright"
      },

      {
        id: "24-10",
        title: "Forms, Dropdowns, Tables, and Dynamic Pages",
        duration: "1:05:00",
        type: "Build",
        tech: "Playwright"
      },

      {
        id: "24-11",
        title: "Authentication and Session Management",
        duration: "1:05:00",
        type: "Build",
        tech: "Browser"
      },

      {
        id: "24-12",
        title: "Handling Popups, Captchas, and Browser Errors",
        duration: "1:10:00",
        type: "Build",
        tech: "Browser"
      },


      // =====================================================
      // MODULE 04 — AI + BROWSER
      // =====================================================

      {
        id: "24-13",
        title: "Connecting LLMs to Browser Automation",
        duration: "1:10:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "24-14",
        title: "LLM-Based Web Element Understanding",
        duration: "1:05:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "24-15",
        title: "Natural Language to Browser Actions",
        duration: "1:10:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "24-16",
        title: "Building Your First Browser Agent",
        duration: "1:20:00",
        type: "Build",
        tech: "Agents"
      },


      // =====================================================
      // MODULE 05 — COMPUTER USE AGENTS
      // =====================================================

      {
        id: "24-17",
        title: "Computer-Use Models and Visual Interaction",
        duration: "1:10:00",
        type: "Learn",
        tech: "Multimodal AI"
      },

      {
        id: "24-18",
        title: "Screenshot-Based Agent Interaction",
        duration: "1:10:00",
        type: "Build",
        tech: "Vision"
      },

      {
        id: "24-19",
        title: "Visual Grounding and UI Understanding",
        duration: "1:10:00",
        type: "Build",
        tech: "Vision"
      },

      {
        id: "24-20",
        title: "Building a Computer-Use Agent",
        duration: "1:20:00",
        type: "Build",
        tech: "Agents"
      },


      // =====================================================
      // MODULE 06 — AGENT PLANNING
      // =====================================================

      {
        id: "24-21",
        title: "Task Planning for Browser Agents",
        duration: "1:10:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "24-22",
        title: "Multi-Step Web Task Execution",
        duration: "1:15:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "24-23",
        title: "State Management Across Browser Tasks",
        duration: "1:05:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "24-24",
        title: "Planning, Execution, Verification, and Retry",
        duration: "1:15:00",
        type: "Build",
        tech: "LangGraph"
      },


      // =====================================================
      // MODULE 07 — REAL-WORLD AUTOMATION
      // =====================================================

      {
        id: "24-25",
        title: "AI Web Research Agents",
        duration: "1:15:00",
        type: "Build",
        tech: "Research Agents"
      },

      {
        id: "24-26",
        title: "Automating Business Web Applications",
        duration: "1:15:00",
        type: "Build",
        tech: "Browser Agents"
      },

      {
        id: "24-27",
        title: "Automated Form Filling and Data Entry",
        duration: "1:10:00",
        type: "Build",
        tech: "Browser Automation"
      },

      {
        id: "24-28",
        title: "Build an Autonomous Web Task Agent",
        duration: "1:30:00",
        type: "Build",
        tech: "Agents"
      },


      // =====================================================
      // MODULE 08 — SECURITY & SAFETY
      // =====================================================

      {
        id: "24-29",
        title: "Security Risks of Computer-Use Agents",
        duration: "1:00:00",
        type: "Learn",
        tech: "Security"
      },

      {
        id: "24-30",
        title: "Prompt Injection Through Web Pages",
        duration: "1:10:00",
        type: "Build",
        tech: "Security"
      },

      {
        id: "24-31",
        title: "Permission Boundaries and Safe Browser Actions",
        duration: "1:05:00",
        type: "Build",
        tech: "Security"
      },

      {
        id: "24-32",
        title: "Human Approval for High-Risk Computer Actions",
        duration: "1:05:00",
        type: "Build",
        tech: "Guardrails"
      },


      // =====================================================
      // MODULE 09 — EVALUATION & PRODUCTION
      // =====================================================

      {
        id: "24-33",
        title: "Evaluating Browser Agent Performance",
        duration: "1:05:00",
        type: "Build",
        tech: "Evaluation"
      },

      {
        id: "24-34",
        title: "Browser Agent Reliability and Error Recovery",
        duration: "1:10:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "24-35",
        title: "Observability and Browser Session Tracing",
        duration: "1:05:00",
        type: "Build",
        tech: "Observability"
      },

      {
        id: "24-36",
        title: "Scaling Browser Agents",
        duration: "1:15:00",
        type: "Build",
        tech: "Production AI"
      },

      {
        id: "24-37",
        title: "Cost and Latency Optimization",
        duration: "1:05:00",
        type: "Build",
        tech: "Optimization"
      },

      {
        id: "24-38",
        title: "Production Computer-Use Architecture",
        duration: "1:20:00",
        type: "Build",
        tech: "Production AI"
      },


      // =====================================================
      // CAPSTONE
      // =====================================================

      {
        id: "24-39",
        title: "Build an Autonomous Web Research Agent",
        duration: "2:00:00",
        type: "Build",
        tech: "Browser Agents"
      },

      {
        id: "24-40",
        title: "Capstone: Build a Production Computer-Use Agent",
        duration: "3:00:00",
        type: "Build",
        tech: "Computer Use"
      }

    ]
  },
  {
    id: "25",
    num: "25",

    title: "AI Coding Agents",

    description: "A complete AI Coding Agent journey covering code intelligence, repository understanding, planning, code generation, tool calling, terminal execution, debugging, testing, code review, Git workflows, autonomous software development, multi-agent coding teams, security, evaluation, and production deployment.",

    youWillBuild: "production-ready AI coding agents that can understand entire repositories, plan implementation tasks, modify multiple files, execute terminal commands, run tests, debug failures, review pull requests, manage Git workflows, and autonomously complete software engineering tasks.",

    totalDuration: "44h 40m",

    lessonsCount: 40,

    category: "AI Coding Agents",

    lessons: [

      // =====================================================
      // MODULE 01 — CODING AGENT FOUNDATIONS
      // =====================================================

      {
        id: "25-1",
        title: "Introduction to AI Coding Agents",
        duration: "55:00",
        type: "Learn",
        tech: "Coding Agents",
        isFree: true
      },

      {
        id: "25-2",
        title: "AI Coding Assistants vs Autonomous Coding Agents",
        duration: "55:00",
        type: "Learn",
        tech: "Agents"
      },

      {
        id: "25-3",
        title: "Architecture of AI Coding Agents",
        duration: "1:05:00",
        type: "Learn",
        tech: "Agents"
      },

      {
        id: "25-4",
        title: "Agent Loop: Observe, Plan, Act, Verify",
        duration: "1:05:00",
        type: "Build",
        tech: "Agents"
      },


      // =====================================================
      // MODULE 02 — CODEBASE UNDERSTANDING
      // =====================================================

      {
        id: "25-5",
        title: "Understanding Software Repositories with AI",
        duration: "1:05:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "25-6",
        title: "Repository Indexing and Code Search",
        duration: "1:10:00",
        type: "Build",
        tech: "Code Search"
      },

      {
        id: "25-7",
        title: "Code Embeddings and Semantic Search",
        duration: "1:10:00",
        type: "Build",
        tech: "Embeddings"
      },

      {
        id: "25-8",
        title: "Building a Codebase RAG System",
        duration: "1:20:00",
        type: "Build",
        tech: "RAG"
      },


      // =====================================================
      // MODULE 03 — CODE GENERATION
      // =====================================================

      {
        id: "25-9",
        title: "LLM-Based Code Generation",
        duration: "1:00:00",
        type: "Learn",
        tech: "LLM"
      },

      {
        id: "25-10",
        title: "Generating Functions, Classes, and Modules",
        duration: "1:05:00",
        type: "Build",
        tech: "Python"
      },

      {
        id: "25-11",
        title: "Multi-File Code Generation",
        duration: "1:10:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "25-12",
        title: "Safe Code Editing and Patch Generation",
        duration: "1:10:00",
        type: "Build",
        tech: "Coding Agents"
      },


      // =====================================================
      // MODULE 04 — PLANNING & REASONING
      // =====================================================

      {
        id: "25-13",
        title: "Software Engineering Planning with LLMs",
        duration: "1:05:00",
        type: "Learn",
        tech: "Agents"
      },

      {
        id: "25-14",
        title: "Breaking Requirements into Coding Tasks",
        duration: "1:05:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "25-15",
        title: "Implementation Planning Across Large Codebases",
        duration: "1:10:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "25-16",
        title: "Planning → Coding → Testing Agent Workflow",
        duration: "1:20:00",
        type: "Build",
        tech: "LangGraph"
      },


      // =====================================================
      // MODULE 05 — TOOLS & TERMINAL
      // =====================================================

      {
        id: "25-17",
        title: "Tool Calling for Coding Agents",
        duration: "1:05:00",
        type: "Build",
        tech: "Tools"
      },

      {
        id: "25-18",
        title: "Building a Safe Terminal Tool",
        duration: "1:10:00",
        type: "Build",
        tech: "Python"
      },

      {
        id: "25-19",
        title: "File System Tools and Code Modification",
        duration: "1:10:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "25-20",
        title: "MCP Tools for AI Coding Agents",
        duration: "1:15:00",
        type: "Build",
        tech: "MCP"
      },


      // =====================================================
      // MODULE 06 — TESTING & DEBUGGING
      // =====================================================

      {
        id: "25-21",
        title: "AI-Generated Unit Tests",
        duration: "1:05:00",
        type: "Build",
        tech: "Testing"
      },

      {
        id: "25-22",
        title: "Test Execution and Failure Analysis",
        duration: "1:10:00",
        type: "Build",
        tech: "Python"
      },

      {
        id: "25-23",
        title: "Autonomous Debugging Agents",
        duration: "1:20:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "25-24",
        title: "Build a Self-Correcting Coding Agent",
        duration: "1:30:00",
        type: "Build",
        tech: "Agents"
      },


      // =====================================================
      // MODULE 07 — SOFTWARE ENGINEERING WORKFLOWS
      // =====================================================

      {
        id: "25-25",
        title: "Git and GitHub Integration for Coding Agents",
        duration: "1:05:00",
        type: "Build",
        tech: "GitHub"
      },

      {
        id: "25-26",
        title: "AI Agents for Pull Requests",
        duration: "1:10:00",
        type: "Build",
        tech: "GitHub"
      },

      {
        id: "25-27",
        title: "Automated Code Review Agents",
        duration: "1:10:00",
        type: "Build",
        tech: "Code Review"
      },

      {
        id: "25-28",
        title: "Issue-to-Code Autonomous Workflows",
        duration: "1:20:00",
        type: "Build",
        tech: "Coding Agents"
      },


      // =====================================================
      // MODULE 08 — ADVANCED CODING AGENTS
      // =====================================================

      {
        id: "25-29",
        title: "Long-Running Coding Agents",
        duration: "1:10:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "25-30",
        title: "Context Management for Large Codebases",
        duration: "1:15:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "25-31",
        title: "Memory for Coding Agents",
        duration: "1:10:00",
        type: "Build",
        tech: "Memory"
      },

      {
        id: "25-32",
        title: "Multi-Agent Software Engineering Teams",
        duration: "1:25:00",
        type: "Build",
        tech: "Multi-Agent"
      },


      // =====================================================
      // MODULE 09 — SECURITY & EVALUATION
      // =====================================================

      {
        id: "25-33",
        title: "Security Risks of Autonomous Coding Agents",
        duration: "1:05:00",
        type: "Learn",
        tech: "Security"
      },

      {
        id: "25-34",
        title: "Sandboxing and Permission Control",
        duration: "1:10:00",
        type: "Build",
        tech: "Security"
      },

      {
        id: "25-35",
        title: "Evaluating AI-Generated Code",
        duration: "1:10:00",
        type: "Build",
        tech: "Evaluation"
      },

      {
        id: "25-36",
        title: "Coding Agent Benchmarks and Reliability",
        duration: "1:10:00",
        type: "Build",
        tech: "Evaluation"
      },


      // =====================================================
      // MODULE 10 — PRODUCTION & CAPSTONE
      // =====================================================

      {
        id: "25-37",
        title: "Observability for Coding Agents",
        duration: "1:05:00",
        type: "Build",
        tech: "Observability"
      },

      {
        id: "25-38",
        title: "Production Architecture for Coding Agents",
        duration: "1:20:00",
        type: "Build",
        tech: "Production AI"
      },

      {
        id: "25-39",
        title: "Build an Autonomous Software Developer",
        duration: "2:00:00",
        type: "Build",
        tech: "Coding Agents"
      },

      {
        id: "25-40",
        title: "Capstone: Build a Production AI Coding Platform",
        duration: "3:00:00",
        type: "Build",
        tech: "AI Engineering"
      }

    ]
  },
  {
    id: "26",
    num: "26",

    title: "Multimodal AI Engineering",

    description: "A complete Multimodal AI journey covering vision-language models, image understanding, OCR, document intelligence, image generation, audio understanding, video intelligence, multimodal embeddings, multimodal RAG, vision agents, tool use, evaluation, safety, optimization, and production deployment.",

    youWillBuild: "production-ready multimodal AI applications that can understand images, documents, audio, and video, reason across multiple modalities, retrieve multimodal knowledge, generate content, use tools, and operate as intelligent vision and media agents.",

    totalDuration: "44h 25m",

    lessonsCount: 40,

    category: "Multimodal AI",

    lessons: [

      // =====================================================
      // MODULE 01 — MULTIMODAL FOUNDATIONS
      // =====================================================

      {
        id: "26-1",
        title: "Introduction to Multimodal AI",
        duration: "55:00",
        type: "Learn",
        tech: "Multimodal AI",
        isFree: true
      },

      {
        id: "26-2",
        title: "How Multimodal Models Work",
        duration: "1:00:00",
        type: "Learn",
        tech: "Multimodal"
      },

      {
        id: "26-3",
        title: "Text, Image, Audio, and Video Modalities",
        duration: "55:00",
        type: "Learn",
        tech: "Multimodal"
      },

      {
        id: "26-4",
        title: "Multimodal AI Architecture",
        duration: "1:05:00",
        type: "Learn",
        tech: "Architecture"
      },


      // =====================================================
      // MODULE 02 — COMPUTER VISION
      // =====================================================

      {
        id: "26-5",
        title: "Computer Vision Fundamentals",
        duration: "1:00:00",
        type: "Learn",
        tech: "Computer Vision"
      },

      {
        id: "26-6",
        title: "Image Classification with Deep Learning",
        duration: "1:05:00",
        type: "Build",
        tech: "PyTorch"
      },

      {
        id: "26-7",
        title: "Object Detection and Localization",
        duration: "1:10:00",
        type: "Build",
        tech: "Computer Vision"
      },

      {
        id: "26-8",
        title: "Image Segmentation and Visual Understanding",
        duration: "1:10:00",
        type: "Build",
        tech: "Computer Vision"
      },


      // =====================================================
      // MODULE 03 — VISION LANGUAGE MODELS
      // =====================================================

      {
        id: "26-9",
        title: "Vision-Language Models Fundamentals",
        duration: "1:00:00",
        type: "Learn",
        tech: "VLM"
      },

      {
        id: "26-10",
        title: "Image Understanding with Vision-Language Models",
        duration: "1:10:00",
        type: "Build",
        tech: "VLM"
      },

      {
        id: "26-11",
        title: "Visual Question Answering",
        duration: "1:05:00",
        type: "Build",
        tech: "VLM"
      },

      {
        id: "26-12",
        title: "Visual Reasoning and Grounding",
        duration: "1:15:00",
        type: "Build",
        tech: "Vision"
      },


      // =====================================================
      // MODULE 04 — OCR & DOCUMENT AI
      // =====================================================

      {
        id: "26-13",
        title: "OCR and Document Understanding",
        duration: "1:00:00",
        type: "Learn",
        tech: "OCR"
      },

      {
        id: "26-14",
        title: "Extracting Structured Data from Documents",
        duration: "1:10:00",
        type: "Build",
        tech: "Document AI"
      },

      {
        id: "26-15",
        title: "Tables, Forms, and Complex Document Parsing",
        duration: "1:10:00",
        type: "Build",
        tech: "Document AI"
      },

      {
        id: "26-16",
        title: "Building a Multimodal Document Intelligence System",
        duration: "1:20:00",
        type: "Build",
        tech: "VLM"
      },


      // =====================================================
      // MODULE 05 — IMAGE GENERATION
      // =====================================================

      {
        id: "26-17",
        title: "Generative Image Models",
        duration: "1:00:00",
        type: "Learn",
        tech: "Generative AI"
      },

      {
        id: "26-18",
        title: "Text-to-Image Generation",
        duration: "1:05:00",
        type: "Build",
        tech: "Image Generation"
      },

      {
        id: "26-19",
        title: "Image-to-Image Generation and Editing",
        duration: "1:10:00",
        type: "Build",
        tech: "Image Generation"
      },

      {
        id: "26-20",
        title: "Controllable Image Generation",
        duration: "1:10:00",
        type: "Build",
        tech: "Generative AI"
      },


      // =====================================================
      // MODULE 06 — AUDIO & SPEECH
      // =====================================================

      {
        id: "26-21",
        title: "Audio Intelligence Fundamentals",
        duration: "55:00",
        type: "Learn",
        tech: "Audio AI"
      },

      {
        id: "26-22",
        title: "Speech Recognition and Audio Understanding",
        duration: "1:05:00",
        type: "Build",
        tech: "Speech AI"
      },

      {
        id: "26-23",
        title: "Audio Classification and Event Detection",
        duration: "1:05:00",
        type: "Build",
        tech: "Audio AI"
      },

      {
        id: "26-24",
        title: "Multimodal Voice and Vision Applications",
        duration: "1:15:00",
        type: "Build",
        tech: "Voice AI"
      },


      // =====================================================
      // MODULE 07 — VIDEO INTELLIGENCE
      // =====================================================

      {
        id: "26-25",
        title: "Video Understanding with AI",
        duration: "1:00:00",
        type: "Learn",
        tech: "Video AI"
      },

      {
        id: "26-26",
        title: "Video Summarization and Scene Understanding",
        duration: "1:10:00",
        type: "Build",
        tech: "Video AI"
      },

      {
        id: "26-27",
        title: "Video Question Answering",
        duration: "1:10:00",
        type: "Build",
        tech: "VLM"
      },

      {
        id: "26-28",
        title: "Building a Video Intelligence Pipeline",
        duration: "1:20:00",
        type: "Build",
        tech: "Video AI"
      },


      // =====================================================
      // MODULE 08 — MULTIMODAL RAG & AGENTS
      // =====================================================

      {
        id: "26-29",
        title: "Multimodal Embeddings and Search",
        duration: "1:10:00",
        type: "Build",
        tech: "Embeddings"
      },

      {
        id: "26-30",
        title: "Multimodal RAG Architecture",
        duration: "1:15:00",
        type: "Build",
        tech: "RAG"
      },

      {
        id: "26-31",
        title: "Vision Agents and Multimodal Tool Calling",
        duration: "1:20:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "26-32",
        title: "Building an Autonomous Multimodal Agent",
        duration: "1:30:00",
        type: "Build",
        tech: "Agents"
      },


      // =====================================================
      // MODULE 09 — EVALUATION & PRODUCTION
      // =====================================================

      {
        id: "26-33",
        title: "Multimodal AI Evaluation",
        duration: "1:05:00",
        type: "Build",
        tech: "Evaluation"
      },

      {
        id: "26-34",
        title: "Vision and Multimodal Hallucination Detection",
        duration: "1:10:00",
        type: "Build",
        tech: "Evaluation"
      },

      {
        id: "26-35",
        title: "Multimodal AI Safety and Content Guardrails",
        duration: "1:10:00",
        type: "Build",
        tech: "Guardrails"
      },

      {
        id: "26-36",
        title: "Multimodal Model Optimization and Cost Control",
        duration: "1:10:00",
        type: "Build",
        tech: "Optimization"
      },

      {
        id: "26-37",
        title: "Multimodal AI Observability",
        duration: "1:05:00",
        type: "Build",
        tech: "Observability"
      },

      {
        id: "26-38",
        title: "Production Multimodal AI Architecture",
        duration: "1:20:00",
        type: "Build",
        tech: "Production AI"
      },


      // =====================================================
      // CAPSTONE
      // =====================================================

      {
        id: "26-39",
        title: "Build a Multimodal Knowledge Assistant",
        duration: "2:00:00",
        type: "Build",
        tech: "Multimodal RAG"
      },

      {
        id: "26-40",
        title: "Capstone: Build a Production Multimodal AI Agent",
        duration: "3:00:00",
        type: "Build",
        tech: "Multimodal Agents"
      }

    ]
  },

  {
    id: "27",
    num: "27",

    title: "AI Search & Deep Research",

    description: "A complete AI Search and Deep Research journey covering search systems, web retrieval, query understanding, ranking, reranking, browsing agents, research planning, source verification, citation generation, multimodal search, knowledge synthesis, deep research agents, evaluation, security, and production deployment.",

    youWillBuild: "production-ready AI research systems that can understand complex questions, generate search strategies, browse multiple sources, retrieve relevant information, verify claims, resolve conflicting evidence, synthesize findings, and produce citation-backed research reports.",

    totalDuration: "45h 10m",

    lessonsCount: 40,

    category: "AI Search & Deep Research",

    lessons: [

      // =====================================================
      // MODULE 01 — AI SEARCH FOUNDATIONS
      // =====================================================

      {
        id: "27-1",
        title: "Introduction to AI Search",
        duration: "55:00",
        type: "Learn",
        tech: "AI Search",
        isFree: true
      },

      {
        id: "27-2",
        title: "Search Engines vs AI Search Systems",
        duration: "55:00",
        type: "Learn",
        tech: "Search"
      },

      {
        id: "27-3",
        title: "Architecture of Modern AI Search",
        duration: "1:05:00",
        type: "Learn",
        tech: "Architecture"
      },

      {
        id: "27-4",
        title: "Information Retrieval Fundamentals",
        duration: "1:05:00",
        type: "Learn",
        tech: "Information Retrieval"
      },


      // =====================================================
      // MODULE 02 — SEARCH & RETRIEVAL
      // =====================================================

      {
        id: "27-5",
        title: "Keyword Search and Inverted Indexes",
        duration: "1:00:00",
        type: "Build",
        tech: "Search"
      },

      {
        id: "27-6",
        title: "Semantic Search with Embeddings",
        duration: "1:10:00",
        type: "Build",
        tech: "Embeddings"
      },

      {
        id: "27-7",
        title: "Hybrid Search: Keyword + Semantic",
        duration: "1:10:00",
        type: "Build",
        tech: "Hybrid Search"
      },

      {
        id: "27-8",
        title: "Reranking and Retrieval Optimization",
        duration: "1:15:00",
        type: "Build",
        tech: "Reranking"
      },


      // =====================================================
      // MODULE 03 — QUERY UNDERSTANDING
      // =====================================================

      {
        id: "27-9",
        title: "Query Understanding for AI Search",
        duration: "1:00:00",
        type: "Learn",
        tech: "LLM"
      },

      {
        id: "27-10",
        title: "Query Rewriting and Expansion",
        duration: "1:05:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "27-11",
        title: "Query Decomposition for Complex Questions",
        duration: "1:10:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "27-12",
        title: "Multi-Query and Parallel Retrieval",
        duration: "1:15:00",
        type: "Build",
        tech: "RAG"
      },


      // =====================================================
      // MODULE 04 — WEB SEARCH
      // =====================================================

      {
        id: "27-13",
        title: "Building AI-Powered Web Search",
        duration: "1:10:00",
        type: "Build",
        tech: "Web Search"
      },

      {
        id: "27-14",
        title: "Web Crawling and Content Extraction",
        duration: "1:10:00",
        type: "Build",
        tech: "Web Crawling"
      },

      {
        id: "27-15",
        title: "Search Result Filtering and Ranking",
        duration: "1:05:00",
        type: "Build",
        tech: "Search"
      },

      {
        id: "27-16",
        title: "Building a Real-Time AI Search Engine",
        duration: "1:25:00",
        type: "Build",
        tech: "AI Search"
      },


      // =====================================================
      // MODULE 05 — RESEARCH AGENTS
      // =====================================================

      {
        id: "27-17",
        title: "Introduction to Deep Research Agents",
        duration: "1:00:00",
        type: "Learn",
        tech: "Research Agents"
      },

      {
        id: "27-18",
        title: "Research Planning and Task Decomposition",
        duration: "1:10:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "27-19",
        title: "Autonomous Web Browsing for Research",
        duration: "1:15:00",
        type: "Build",
        tech: "Browser Agents"
      },

      {
        id: "27-20",
        title: "Build a Deep Research Agent",
        duration: "1:30:00",
        type: "Build",
        tech: "Agents"
      },


      // =====================================================
      // MODULE 06 — SOURCE VERIFICATION
      // =====================================================

      {
        id: "27-21",
        title: "Source Quality and Reliability",
        duration: "1:00:00",
        type: "Learn",
        tech: "Research"
      },

      {
        id: "27-22",
        title: "Fact Verification with Multiple Sources",
        duration: "1:10:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "27-23",
        title: "Conflict Detection Between Sources",
        duration: "1:10:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "27-24",
        title: "Evidence-Based Answer Generation",
        duration: "1:15:00",
        type: "Build",
        tech: "RAG"
      },


      // =====================================================
      // MODULE 07 — CITATIONS & SYNTHESIS
      // =====================================================

      {
        id: "27-25",
        title: "Citation Generation and Source Attribution",
        duration: "1:05:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "27-26",
        title: "Claim-Level Evidence Linking",
        duration: "1:10:00",
        type: "Build",
        tech: "Research"
      },

      {
        id: "27-27",
        title: "Research Summarization and Knowledge Synthesis",
        duration: "1:15:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "27-28",
        title: "Generating Structured Research Reports",
        duration: "1:10:00",
        type: "Build",
        tech: "Agents"
      },


      // =====================================================
      // MODULE 08 — ADVANCED DEEP RESEARCH
      // =====================================================

      {
        id: "27-29",
        title: "Iterative Research and Self-Reflection",
        duration: "1:15:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "27-30",
        title: "Parallel Research Agents",
        duration: "1:20:00",
        type: "Build",
        tech: "Multi-Agent"
      },

      {
        id: "27-31",
        title: "Research Memory and Knowledge Accumulation",
        duration: "1:10:00",
        type: "Build",
        tech: "Memory"
      },

      {
        id: "27-32",
        title: "Multimodal Deep Research",
        duration: "1:20:00",
        type: "Build",
        tech: "Multimodal AI"
      },


      // =====================================================
      // MODULE 09 — EVALUATION & SECURITY
      // =====================================================

      {
        id: "27-33",
        title: "Evaluating AI Search Quality",
        duration: "1:05:00",
        type: "Build",
        tech: "Evaluation"
      },

      {
        id: "27-34",
        title: "Research Agent Hallucination Detection",
        duration: "1:10:00",
        type: "Build",
        tech: "Evaluation"
      },

      {
        id: "27-35",
        title: "Search and Web-Agent Security",
        duration: "1:10:00",
        type: "Build",
        tech: "Security"
      },

      {
        id: "27-36",
        title: "Prompt Injection and Untrusted Web Content",
        duration: "1:10:00",
        type: "Build",
        tech: "Guardrails"
      },


      // =====================================================
      // MODULE 10 — PRODUCTION & CAPSTONE
      // =====================================================

      {
        id: "27-37",
        title: "Observability for Research Agents",
        duration: "1:05:00",
        type: "Build",
        tech: "Observability"
      },

      {
        id: "27-38",
        title: "Scaling and Cost Optimization for AI Search",
        duration: "1:15:00",
        type: "Build",
        tech: "Optimization"
      },

      {
        id: "27-39",
        title: "Build a Production AI Search Platform",
        duration: "2:15:00",
        type: "Build",
        tech: "AI Search"
      },

      {
        id: "27-40",
        title: "Capstone: Build an Autonomous Deep Research System",
        duration: "3:00:00",
        type: "Build",
        tech: "Research Agents"
      }

    ]
  },
  {
    id: "28",
    num: "28",

    title: "LLMOps & AI Infrastructure",

    description: "A complete LLMOps journey covering model lifecycle management, inference infrastructure, model serving, GPU workloads, prompt management, datasets, evaluation pipelines, observability, experiment tracking, model routing, caching, CI/CD, deployment, scaling, security, cost optimization, and reliable AI infrastructure.",

    youWillBuild: "production-grade LLM infrastructure with automated evaluation, model deployment, inference services, prompt and dataset versioning, observability, model routing, scalable GPU workloads, CI/CD pipelines, and complete LLMOps workflows.",

    totalDuration: "46h 35m",

    lessonsCount: 40,

    category: "LLMOps & AI Infrastructure",

    lessons: [

      // =====================================================
      // MODULE 01 — LLMOps FOUNDATIONS
      // =====================================================

      {
        id: "28-1",
        title: "Introduction to LLMOps",
        duration: "55:00",
        type: "Learn",
        tech: "LLMOps",
        isFree: true
      },

      {
        id: "28-2",
        title: "MLops vs LLMOps vs AI Engineering",
        duration: "55:00",
        type: "Learn",
        tech: "LLMOps"
      },

      {
        id: "28-3",
        title: "Production LLM System Architecture",
        duration: "1:05:00",
        type: "Learn",
        tech: "Architecture"
      },

      {
        id: "28-4",
        title: "Designing the LLM Lifecycle",
        duration: "1:05:00",
        type: "Build",
        tech: "LLMOps"
      },


      // =====================================================
      // MODULE 02 — MODEL MANAGEMENT
      // =====================================================

      {
        id: "28-5",
        title: "Model Selection and Model Registry",
        duration: "1:00:00",
        type: "Build",
        tech: "Models"
      },

      {
        id: "28-6",
        title: "Open-Source LLM Deployment",
        duration: "1:10:00",
        type: "Build",
        tech: "Open Source LLM"
      },

      {
        id: "28-7",
        title: "Model Versioning and Lifecycle Management",
        duration: "1:05:00",
        type: "Build",
        tech: "MLOps"
      },

      {
        id: "28-8",
        title: "Model Routing and Multi-Model Architecture",
        duration: "1:15:00",
        type: "Build",
        tech: "LLM"
      },


      // =====================================================
      // MODULE 03 — DATA & DATASETS
      // =====================================================

      {
        id: "28-9",
        title: "Building LLM Training and Evaluation Datasets",
        duration: "1:05:00",
        type: "Build",
        tech: "Datasets"
      },

      {
        id: "28-10",
        title: "Dataset Versioning and Data Lineage",
        duration: "1:05:00",
        type: "Build",
        tech: "Data Engineering"
      },

      {
        id: "28-11",
        title: "Synthetic Data Generation for LLMs",
        duration: "1:10:00",
        type: "Build",
        tech: "Generative AI"
      },

      {
        id: "28-12",
        title: "Data Quality and Validation Pipelines",
        duration: "1:10:00",
        type: "Build",
        tech: "Data Engineering"
      },


      // =====================================================
      // MODULE 04 — PROMPT & CONFIG MANAGEMENT
      // =====================================================

      {
        id: "28-13",
        title: "Prompt Management in Production",
        duration: "1:00:00",
        type: "Learn",
        tech: "Prompt Engineering"
      },

      {
        id: "28-14",
        title: "Prompt Versioning and Experimentation",
        duration: "1:05:00",
        type: "Build",
        tech: "LLMOps"
      },

      {
        id: "28-15",
        title: "Configuration Management for AI Systems",
        duration: "1:00:00",
        type: "Build",
        tech: "DevOps"
      },

      {
        id: "28-16",
        title: "Automated Prompt Evaluation Pipelines",
        duration: "1:15:00",
        type: "Build",
        tech: "Evaluation"
      },


      // =====================================================
      // MODULE 05 — INFERENCE INFRASTRUCTURE
      // =====================================================

      {
        id: "28-17",
        title: "LLM Inference Fundamentals",
        duration: "1:00:00",
        type: "Learn",
        tech: "Inference"
      },

      {
        id: "28-18",
        title: "Model Serving with vLLM",
        duration: "1:15:00",
        type: "Build",
        tech: "vLLM"
      },

      {
        id: "28-19",
        title: "High-Throughput LLM Inference",
        duration: "1:15:00",
        type: "Build",
        tech: "Inference"
      },

      {
        id: "28-20",
        title: "Quantization, Batching, and KV Cache Optimization",
        duration: "1:20:00",
        type: "Build",
        tech: "Optimization"
      },


      // =====================================================
      // MODULE 06 — GPU & DISTRIBUTED INFRASTRUCTURE
      // =====================================================

      {
        id: "28-21",
        title: "GPU Infrastructure for AI Applications",
        duration: "1:05:00",
        type: "Learn",
        tech: "GPU"
      },

      {
        id: "28-22",
        title: "GPU Memory and Compute Optimization",
        duration: "1:10:00",
        type: "Build",
        tech: "CUDA"
      },

      {
        id: "28-23",
        title: "Distributed LLM Inference",
        duration: "1:20:00",
        type: "Build",
        tech: "Distributed Systems"
      },

      {
        id: "28-24",
        title: "Autoscaling AI Inference Infrastructure",
        duration: "1:20:00",
        type: "Build",
        tech: "Kubernetes"
      },


      // =====================================================
      // MODULE 07 — EVALUATION & OBSERVABILITY
      // =====================================================

      {
        id: "28-25",
        title: "LLM Evaluation Pipelines",
        duration: "1:10:00",
        type: "Build",
        tech: "Evaluation"
      },

      {
        id: "28-26",
        title: "Offline and Online Evaluation",
        duration: "1:10:00",
        type: "Build",
        tech: "Evaluation"
      },

      {
        id: "28-27",
        title: "LLM Tracing and Observability",
        duration: "1:10:00",
        type: "Build",
        tech: "Observability"
      },

      {
        id: "28-28",
        title: "Production AI Monitoring and Alerting",
        duration: "1:10:00",
        type: "Build",
        tech: "Monitoring"
      },


      // =====================================================
      // MODULE 08 — CI/CD & AUTOMATION
      // =====================================================

      {
        id: "28-29",
        title: "CI/CD for LLM Applications",
        duration: "1:05:00",
        type: "Build",
        tech: "CI/CD"
      },

      {
        id: "28-30",
        title: "Automated Testing for LLM Systems",
        duration: "1:10:00",
        type: "Build",
        tech: "Testing"
      },

      {
        id: "28-31",
        title: "Continuous Evaluation and Regression Testing",
        duration: "1:10:00",
        type: "Build",
        tech: "Evaluation"
      },

      {
        id: "28-32",
        title: "Automated Model and Prompt Deployment",
        duration: "1:15:00",
        type: "Build",
        tech: "DevOps"
      },


      // =====================================================
      // MODULE 09 — SECURITY & COST
      // =====================================================

      {
        id: "28-33",
        title: "LLMOps Security Architecture",
        duration: "1:05:00",
        type: "Learn",
        tech: "Security"
      },

      {
        id: "28-34",
        title: "Secrets, Access Control, and Data Protection",
        duration: "1:05:00",
        type: "Build",
        tech: "Security"
      },

      {
        id: "28-35",
        title: "LLM Cost Monitoring and FinOps",
        duration: "1:10:00",
        type: "Build",
        tech: "FinOps"
      },

      {
        id: "28-36",
        title: "Inference Cost and Performance Optimization",
        duration: "1:15:00",
        type: "Build",
        tech: "Optimization"
      },


      // =====================================================
      // MODULE 10 — PRODUCTION LLMOPS
      // =====================================================

      {
        id: "28-37",
        title: "Building an End-to-End LLMOps Pipeline",
        duration: "1:30:00",
        type: "Build",
        tech: "LLMOps"
      },

      {
        id: "28-38",
        title: "Cloud-Native AI Infrastructure",
        duration: "1:20:00",
        type: "Build",
        tech: "Cloud"
      },

      {
        id: "28-39",
        title: "Build a Production LLM Platform",
        duration: "2:15:00",
        type: "Build",
        tech: "LLMOps"
      },

      {
        id: "28-40",
        title: "Capstone: Build a Scalable LLMOps Platform",
        duration: "3:00:00",
        type: "Build",
        tech: "AI Infrastructure"
      }

    ]
  },
  {
    id: "29",
    num: "29",

    title: "AI Product Engineering",

    description: "A complete AI Product Engineering journey covering product architecture, frontend development, backend APIs, AI service integration, authentication, databases, streaming, RAG, agents, payments, subscriptions, analytics, notifications, testing, security, deployment, and scalable AI product development.",

    youWillBuild: "complete production-ready AI products with modern frontend and backend architecture, authentication, AI agents, RAG, real-time streaming, databases, subscriptions, payments, analytics, observability, and scalable cloud deployment.",

    totalDuration: "48h 20m",

    lessonsCount: 40,

    category: "AI Product Engineering",

    lessons: [

      // =====================================================
      // MODULE 01 — AI PRODUCT FOUNDATIONS
      // =====================================================

      {
        id: "29-1",
        title: "Introduction to AI Product Engineering",
        duration: "55:00",
        type: "Learn",
        tech: "AI Product",
        isFree: true
      },

      {
        id: "29-2",
        title: "From AI Prototype to Production Product",
        duration: "1:00:00",
        type: "Learn",
        tech: "Product Engineering"
      },

      {
        id: "29-3",
        title: "AI Product Architecture and System Design",
        duration: "1:10:00",
        type: "Learn",
        tech: "Architecture"
      },

      {
        id: "29-4",
        title: "Designing AI-First Product Experiences",
        duration: "1:00:00",
        type: "Learn",
        tech: "Product Design"
      },


      // =====================================================
      // MODULE 02 — FRONTEND ENGINEERING
      // =====================================================

      {
        id: "29-5",
        title: "Building AI Product Interfaces",
        duration: "1:05:00",
        type: "Build",
        tech: "React"
      },

      {
        id: "29-6",
        title: "Modern Frontend Architecture with Next.js",
        duration: "1:10:00",
        type: "Build",
        tech: "Next.js"
      },

      {
        id: "29-7",
        title: "AI Chat Interfaces and Streaming UI",
        duration: "1:15:00",
        type: "Build",
        tech: "React"
      },

      {
        id: "29-8",
        title: "Building Responsive AI Experiences",
        duration: "1:05:00",
        type: "Build",
        tech: "Frontend"
      },


      // =====================================================
      // MODULE 03 — BACKEND ENGINEERING
      // =====================================================

      {
        id: "29-9",
        title: "Backend Architecture for AI Products",
        duration: "1:05:00",
        type: "Learn",
        tech: "Backend"
      },

      {
        id: "29-10",
        title: "Building Production APIs with FastAPI",
        duration: "1:10:00",
        type: "Build",
        tech: "FastAPI"
      },

      {
        id: "29-11",
        title: "Connecting Frontend and AI Backend",
        duration: "1:10:00",
        type: "Build",
        tech: "API"
      },

      {
        id: "29-12",
        title: "Async Processing and Background AI Jobs",
        duration: "1:10:00",
        type: "Build",
        tech: "Python"
      },


      // =====================================================
      // MODULE 04 — AI APPLICATION LAYER
      // =====================================================

      {
        id: "29-13",
        title: "Integrating LLM APIs into Products",
        duration: "1:00:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "29-14",
        title: "Structured AI Outputs and Application State",
        duration: "1:05:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "29-15",
        title: "Adding RAG to AI Products",
        duration: "1:15:00",
        type: "Build",
        tech: "RAG"
      },

      {
        id: "29-16",
        title: "Adding AI Agents and Tool Calling",
        duration: "1:20:00",
        type: "Build",
        tech: "Agents"
      },


      // =====================================================
      // MODULE 05 — DATABASE & STATE
      // =====================================================

      {
        id: "29-17",
        title: "Database Design for AI Products",
        duration: "1:05:00",
        type: "Learn",
        tech: "PostgreSQL"
      },

      {
        id: "29-18",
        title: "User Data, Conversations, and Application State",
        duration: "1:10:00",
        type: "Build",
        tech: "PostgreSQL"
      },

      {
        id: "29-19",
        title: "Vector Storage and AI Knowledge Data",
        duration: "1:10:00",
        type: "Build",
        tech: "Vector DB"
      },

      {
        id: "29-20",
        title: "Caching and High-Performance Data Access",
        duration: "1:05:00",
        type: "Build",
        tech: "Redis"
      },


      // =====================================================
      // MODULE 06 — AUTHENTICATION & USERS
      // =====================================================

      {
        id: "29-21",
        title: "Authentication Architecture for AI Products",
        duration: "1:00:00",
        type: "Learn",
        tech: "Authentication"
      },

      {
        id: "29-22",
        title: "User Registration, Login, and Sessions",
        duration: "1:05:00",
        type: "Build",
        tech: "Auth"
      },

      {
        id: "29-23",
        title: "Role-Based Access Control",
        duration: "1:05:00",
        type: "Build",
        tech: "Security"
      },

      {
        id: "29-24",
        title: "Multi-Tenant AI Applications",
        duration: "1:15:00",
        type: "Build",
        tech: "SaaS"
      },


      // =====================================================
      // MODULE 07 — AI PRODUCT MONETIZATION
      // =====================================================

      {
        id: "29-25",
        title: "SaaS Architecture for AI Products",
        duration: "1:05:00",
        type: "Learn",
        tech: "SaaS"
      },

      {
        id: "29-26",
        title: "Subscriptions and Usage-Based Billing",
        duration: "1:10:00",
        type: "Build",
        tech: "Payments"
      },

      {
        id: "29-27",
        title: "AI Usage Tracking and Credit Systems",
        duration: "1:10:00",
        type: "Build",
        tech: "Billing"
      },

      {
        id: "29-28",
        title: "Building an AI SaaS Pricing System",
        duration: "1:10:00",
        type: "Build",
        tech: "SaaS"
      },


      // =====================================================
      // MODULE 08 — REAL-TIME & PRODUCT FEATURES
      // =====================================================

      {
        id: "29-29",
        title: "Real-Time AI Streaming with WebSockets",
        duration: "1:10:00",
        type: "Build",
        tech: "WebSockets"
      },

      {
        id: "29-30",
        title: "Notifications and Event-Driven AI Features",
        duration: "1:05:00",
        type: "Build",
        tech: "Events"
      },

      {
        id: "29-31",
        title: "File Uploads and AI Document Processing",
        duration: "1:15:00",
        type: "Build",
        tech: "Document AI"
      },

      {
        id: "29-32",
        title: "Building Collaborative AI Workspaces",
        duration: "1:20:00",
        type: "Build",
        tech: "AI SaaS"
      },


      // =====================================================
      // MODULE 09 — SECURITY, TESTING & OBSERVABILITY
      // =====================================================

      {
        id: "29-33",
        title: "Security for AI Products",
        duration: "1:10:00",
        type: "Build",
        tech: "Security"
      },

      {
        id: "29-34",
        title: "Prompt Injection and AI Application Security",
        duration: "1:10:00",
        type: "Build",
        tech: "Guardrails"
      },

      {
        id: "29-35",
        title: "Testing AI Product Features",
        duration: "1:10:00",
        type: "Build",
        tech: "Testing"
      },

      {
        id: "29-36",
        title: "Analytics, Logging, and AI Observability",
        duration: "1:10:00",
        type: "Build",
        tech: "Observability"
      },


      // =====================================================
      // MODULE 10 — DEPLOYMENT & CAPSTONE
      // =====================================================

      {
        id: "29-37",
        title: "Dockerizing the Complete AI Product",
        duration: "1:10:00",
        type: "Build",
        tech: "Docker"
      },

      {
        id: "29-38",
        title: "CI/CD and Cloud Deployment",
        duration: "1:20:00",
        type: "Build",
        tech: "Cloud"
      },

      {
        id: "29-39",
        title: "Build an End-to-End AI SaaS Product",
        duration: "2:30:00",
        type: "Build",
        tech: "AI Product"
      },

      {
        id: "29-40",
        title: "Capstone: Launch a Production AI Product",
        duration: "3:30:00",
        type: "Build",
        tech: "AI Engineering"
      }

    ]
  },
  {
    id: "30",
    num: "30",

    title: "AI Engineering Capstone",

    description: "A complete end-to-end AI Engineering capstone covering system design, LLMs, RAG, Agentic RAG, AI agents, MCP, multi-agent orchestration, multimodal AI, voice AI, AI search, coding agents, automation, LLMOps, security, evaluation, observability, SaaS architecture, deployment, and production scaling.",

    youWillBuild: "a production-grade autonomous AI platform that combines LLMs, RAG, Agentic RAG, tool calling, MCP, multi-agent systems, multimodal intelligence, voice interaction, web research, automation, memory, evaluation, observability, authentication, billing, and scalable cloud infrastructure.",

    totalDuration: "60h 00m",

    lessonsCount: 40,

    category: "AI Engineering Capstone",

    lessons: [

      // =====================================================
      // MODULE 01 — SYSTEM DESIGN
      // =====================================================

      {
        id: "30-1",
        title: "Capstone Overview: Building a Production AI Platform",
        duration: "1:00:00",
        type: "Learn",
        tech: "AI Engineering",
        isFree: true
      },

      {
        id: "30-2",
        title: "AI Platform Requirements and Architecture",
        duration: "1:10:00",
        type: "Learn",
        tech: "System Design"
      },

      {
        id: "30-3",
        title: "Designing the End-to-End AI Architecture",
        duration: "1:20:00",
        type: "Build",
        tech: "Architecture"
      },

      {
        id: "30-4",
        title: "Technology Selection and Project Structure",
        duration: "1:10:00",
        type: "Build",
        tech: "AI Engineering"
      },


      // =====================================================
      // MODULE 02 — LLM CORE
      // =====================================================

      {
        id: "30-5",
        title: "Production LLM Integration",
        duration: "1:10:00",
        type: "Build",
        tech: "LLM"
      },

      {
        id: "30-6",
        title: "Prompt Architecture and Structured Generation",
        duration: "1:10:00",
        type: "Build",
        tech: "Prompt Engineering"
      },

      {
        id: "30-7",
        title: "Context Management and Long-Term Memory",
        duration: "1:20:00",
        type: "Build",
        tech: "Memory"
      },

      {
        id: "30-8",
        title: "Model Routing and Intelligent Inference",
        duration: "1:15:00",
        type: "Build",
        tech: "LLMOps"
      },


      // =====================================================
      // MODULE 03 — RAG & KNOWLEDGE
      // =====================================================

      {
        id: "30-9",
        title: "Production RAG Architecture",
        duration: "1:20:00",
        type: "Build",
        tech: "RAG"
      },

      {
        id: "30-10",
        title: "Agentic RAG and Adaptive Retrieval",
        duration: "1:25:00",
        type: "Build",
        tech: "Agentic RAG"
      },

      {
        id: "30-11",
        title: "Hybrid Search and Reranking",
        duration: "1:15:00",
        type: "Build",
        tech: "Search"
      },

      {
        id: "30-12",
        title: "Knowledge Graph and Graph RAG Integration",
        duration: "1:20:00",
        type: "Build",
        tech: "Graph RAG"
      },


      // =====================================================
      // MODULE 04 — AGENTS
      // =====================================================

      {
        id: "30-13",
        title: "Building the Core AI Agent",
        duration: "1:20:00",
        type: "Build",
        tech: "Agents"
      },

      {
        id: "30-14",
        title: "Tool Calling and Agent Planning",
        duration: "1:20:00",
        type: "Build",
        tech: "Tool Calling"
      },

      {
        id: "30-15",
        title: "MCP-Based Tool Ecosystem",
        duration: "1:20:00",
        type: "Build",
        tech: "MCP"
      },

      {
        id: "30-16",
        title: "Multi-Agent Supervisor Architecture",
        duration: "1:30:00",
        type: "Build",
        tech: "Multi-Agent"
      },


      // =====================================================
      // MODULE 05 — COMPUTER & CODING AGENTS
      // =====================================================

      {
        id: "30-17",
        title: "Computer Use Agent Integration",
        duration: "1:20:00",
        type: "Build",
        tech: "Computer Use"
      },

      {
        id: "30-18",
        title: "Browser Automation and Web Interaction",
        duration: "1:20:00",
        type: "Build",
        tech: "Browser Agents"
      },

      {
        id: "30-19",
        title: "AI Coding Agent Integration",
        duration: "1:30:00",
        type: "Build",
        tech: "Coding Agents"
      },

      {
        id: "30-20",
        title: "Autonomous Software Engineering Workflow",
        duration: "1:40:00",
        type: "Build",
        tech: "AI Agents"
      },


      // =====================================================
      // MODULE 06 — MULTIMODAL & VOICE
      // =====================================================

      {
        id: "30-21",
        title: "Multimodal AI Integration",
        duration: "1:20:00",
        type: "Build",
        tech: "Multimodal AI"
      },

      {
        id: "30-22",
        title: "Vision-Based Agent Reasoning",
        duration: "1:20:00",
        type: "Build",
        tech: "Vision"
      },

      {
        id: "30-23",
        title: "Voice AI Interface",
        duration: "1:20:00",
        type: "Build",
        tech: "Voice AI"
      },

      {
        id: "30-24",
        title: "Real-Time Voice + Vision Agent",
        duration: "1:40:00",
        type: "Build",
        tech: "Multimodal Agents"
      },


      // =====================================================
      // MODULE 07 — RESEARCH & AUTOMATION
      // =====================================================

      {
        id: "30-25",
        title: "Deep Research Agent",
        duration: "1:25:00",
        type: "Build",
        tech: "Research Agents"
      },

      {
        id: "30-26",
        title: "Multi-Source Research and Verification",
        duration: "1:20:00",
        type: "Build",
        tech: "AI Search"
      },

      {
        id: "30-27",
        title: "AI Automation and Workflow Orchestration",
        duration: "1:25:00",
        type: "Build",
        tech: "Automation"
      },

      {
        id: "30-28",
        title: "Event-Driven Autonomous AI Workflows",
        duration: "1:30:00",
        type: "Build",
        tech: "Automation"
      },


      // =====================================================
      // MODULE 08 — PRODUCT ENGINEERING
      // =====================================================

      {
        id: "30-29",
        title: "Production Frontend for the AI Platform",
        duration: "1:30:00",
        type: "Build",
        tech: "Next.js"
      },

      {
        id: "30-30",
        title: "Production Backend and AI API Layer",
        duration: "1:30:00",
        type: "Build",
        tech: "FastAPI"
      },

      {
        id: "30-31",
        title: "Authentication, Organizations, and Permissions",
        duration: "1:20:00",
        type: "Build",
        tech: "Security"
      },

      {
        id: "30-32",
        title: "Subscriptions, Credits, and AI Usage Billing",
        duration: "1:20:00",
        type: "Build",
        tech: "SaaS"
      },


      // =====================================================
      // MODULE 09 — PRODUCTION ENGINEERING
      // =====================================================

      {
        id: "30-33",
        title: "AI Evaluation and Quality Gates",
        duration: "1:20:00",
        type: "Build",
        tech: "Evaluation"
      },

      {
        id: "30-34",
        title: "Guardrails and AI Security",
        duration: "1:25:00",
        type: "Build",
        tech: "Guardrails"
      },

      {
        id: "30-35",
        title: "Observability, Tracing, and Monitoring",
        duration: "1:20:00",
        type: "Build",
        tech: "Observability"
      },

      {
        id: "30-36",
        title: "Reliability, Failure Recovery, and Human-in-the-Loop",
        duration: "1:25:00",
        type: "Build",
        tech: "Production AI"
      },


      // =====================================================
      // MODULE 10 — DEPLOYMENT & FINAL CAPSTONE
      // =====================================================

      {
        id: "30-37",
        title: "Containerizing the AI Platform",
        duration: "1:15:00",
        type: "Build",
        tech: "Docker"
      },

      {
        id: "30-38",
        title: "Cloud Deployment and Infrastructure Scaling",
        duration: "1:30:00",
        type: "Build",
        tech: "Cloud"
      },

      {
        id: "30-39",
        title: "Production Launch: Complete AI Platform",
        duration: "3:00:00",
        type: "Build",
        tech: "AI Engineering"
      },

      {
        id: "30-40",
        title: "Final Capstone: Build an Autonomous AI Company Platform",
        duration: "5:00:00",
        type: "Build",
        tech: "AI Engineering"
      }

    ]
  },
];

export interface CourseMaterialItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  originalPrice: string;
  price: string;
  discount: string;
  badge: string;
  features: string[];
  buyLink: string;
}

const COURSE_MATERIALS: CourseMaterialItem[] = [
  {
    id: "mat-01",
    title: "AI Engineer: Zero to Production",
    subtitle: "The Complete AI Engineering Mastery Program (6 Volumes · 3,084 Pages)",
    description: "A complete, hands-on AI Engineering journey covering Mathematics, ML, Deep Learning, Transformers, LLMs, RAG, AI Agents, Multi-Agent Systems, and Production AI.",
    image: "/assets/python_essentials_cover.png",
    originalPrice: "₹1,599",
    price: "₹599",
    discount: "62% OFF",
    badge: "Flagship · 6 Volumes",
    features: [
      "Vol 1-6: Foundations to Production AI",
      "3,084 Pages of deep technical guides",
      "LangGraph, MCP & Multi-Agent systems",
      "Immediate digital download & lifetime access"
    ],
    buyLink: "https://superprofile.bio/vp/ai-engineer--zero-to-production"
  },
  {
    id: "mat-02",
    title: "AI Agents Handbook (Beginner to Advanced)",
    subtitle: "Master Multi-Agent Architectures & LLM Engineering",
    description: "Everything you need to go from writing software to engineering intelligent agentic systems, MCP tools, memory loops, and production deployments.",
    image: "/assets/ai_roadmap_cover.png",
    originalPrice: "₹499",
    price: "₹199",
    discount: "60% OFF",
    badge: "Most Popular · Complete Guide",
    features: [
      "Supervisor-Worker & Multi-Agent Swarms",
      "Model Context Protocol (MCP) integrations",
      "LangGraph & CrewAI workflows",
      "Production deployment recipes"
    ],
    buyLink: "https://superprofile.bio/vp/complete-ai-agent-handbook---400--handwritten-pages--diagrams-architectures"
  }
];

export function CurriculumSection() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalModule, setActiveModalModule] = useState<ModuleData | null>(null);
  const [modalSearchQuery, setModalSearchQuery] = useState<string>("");
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});

  // Load completed lessons from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("techtalks_completed_lessons");
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save completed lessons to localStorage
  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const updated = { ...prev, [lessonId]: !prev[lessonId] };
      try {
        localStorage.setItem("techtalks_completed_lessons", JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  };

  // Keyboard shortcut ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalModule(null);
      }
    };
    if (activeModalModule) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalModule]);

  // Categories list
  const CATEGORIES = [
    "All",
    "Foundations",
    "Deep Learning & NLP",
    "LLM Engineering",
    "RAG & Retrieval",
    "AI Agents & MCP",
    "Evaluation & Safety",
    "Voice & Systems",
  ];

  // Filter modules based on category and search query
  const filteredModules = useMemo(() => {
    return MODULES_LIST.filter((m) => {
      // Category match
      let categoryMatch = true;
      if (selectedCategory !== "All") {
        const cat = m.category.toLowerCase();
        if (selectedCategory === "Foundations") {
          categoryMatch = cat.includes("foundations") || cat.includes("python") || cat.includes("math") || cat.includes("ml") || cat.includes("tooling");
        } else if (selectedCategory === "Deep Learning & NLP") {
          categoryMatch = cat.includes("deep learning") || cat.includes("computer vision") || cat.includes("nlp") || cat.includes("transformers") || cat.includes("generative ai");
        } else if (selectedCategory === "LLM Engineering") {
          categoryMatch = cat.includes("llm") || cat.includes("fine-tuning") || cat.includes("langgraph");
        } else if (selectedCategory === "RAG & Retrieval") {
          categoryMatch = cat.includes("rag");
        } else if (selectedCategory === "AI Agents & MCP") {
          categoryMatch = cat.includes("agent") || cat.includes("mcp");
        } else if (selectedCategory === "Evaluation & Safety") {
          categoryMatch = cat.includes("eval") || cat.includes("safety") || cat.includes("security") || cat.includes("guardrail");
        } else if (selectedCategory === "Voice & Systems") {
          categoryMatch = cat.includes("voice") || cat.includes("automation") || cat.includes("deployment") || cat.includes("infrastructure") || cat.includes("production");
        } else {
          categoryMatch = cat.includes(selectedCategory.toLowerCase());
        }
      }

      if (!categoryMatch) return false;

      // Search query match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchDesc = m.description.toLowerCase().includes(q);
      const matchCategory = m.category.toLowerCase().includes(q);
      const matchNum = m.num.includes(q);
      const matchBuild = m.youWillBuild.toLowerCase().includes(q);
      const matchLesson = m.lessons.some((l) => l.title.toLowerCase().includes(q) || (l.tech && l.tech.toLowerCase().includes(q)));

      return matchTitle || matchDesc || matchCategory || matchNum || matchBuild || matchLesson;
    });
  }, [searchQuery, selectedCategory]);

  // Overall Statistics
  const totalLessonsCount = useMemo(() => {
    return MODULES_LIST.reduce((acc, m) => acc + m.lessons.length, 0);
  }, []);

  const totalCompletedCount = useMemo(() => {
    return Object.values(completedLessons).filter(Boolean).length;
  }, [completedLessons]);

  const overallProgressPercent = Math.round((totalCompletedCount / (totalLessonsCount || 1)) * 100);

  // In-modal filtered lessons
  const modalLessons = useMemo(() => {
    if (!activeModalModule) return [];
    if (!modalSearchQuery.trim()) return activeModalModule.lessons;
    const q = modalSearchQuery.toLowerCase();
    return activeModalModule.lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        (l.tech && l.tech.toLowerCase().includes(q)) ||
        (l.type && l.type.toLowerCase().includes(q)) ||
        (l.level && l.level.toLowerCase().includes(q))
    );
  }, [activeModalModule, modalSearchQuery]);

  const activeModuleCompletedCount = useMemo(() => {
    if (!activeModalModule) return 0;
    return activeModalModule.lessons.filter((l) => completedLessons[l.id]).length;
  }, [activeModalModule, completedLessons]);

  const activeModuleProgressPercent = useMemo(() => {
    if (!activeModalModule || activeModalModule.lessons.length === 0) return 0;
    return Math.round((activeModuleCompletedCount / activeModalModule.lessons.length) * 100);
  }, [activeModalModule, activeModuleCompletedCount]);

  // Navigation helpers inside modal
  const handlePrevModule = () => {
    if (!activeModalModule) return;
    const currentIndex = MODULES_LIST.findIndex((m) => m.id === activeModalModule.id);
    if (currentIndex > 0) {
      setActiveModalModule(MODULES_LIST[currentIndex - 1]);
      setModalSearchQuery("");
    }
  };

  const handleNextModule = () => {
    if (!activeModalModule) return;
    const currentIndex = MODULES_LIST.findIndex((m) => m.id === activeModalModule.id);
    if (currentIndex < MODULES_LIST.length - 1) {
      setActiveModalModule(MODULES_LIST[currentIndex + 1]);
      setModalSearchQuery("");
    }
  };

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeModalModule) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalModule]);

  return (
    <section id="curriculum" className="py-14 sm:py-20 lg:py-28 relative overflow-hidden bg-[#FBF9F4] dark:bg-[#121212]/90 border-t border-border/40">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(196,92,38,0.08),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3 border border-primary/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Complete Curriculum
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground tracking-tight">
            Master Agentic AI from{" "}
            <span className="text-primary italic">First Principles</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-base mt-3 leading-relaxed">
            30+ comprehensive modules covering Python, Mathematics, Deep Learning, LLM Architecture, RAG, Autonomous Agents, MCP, Voice AI, and Production Scale. Click any module to view the full lesson syllabus.
          </p>

          {/* Quick Stats Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm px-4 py-2 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span className="font-bold text-foreground">{MODULES_LIST.length} Modules</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm px-4 py-2 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span className="font-bold text-foreground">{totalLessonsCount} Lessons</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm px-4 py-2 shadow-xs">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-bold text-foreground">
                {totalCompletedCount} / {totalLessonsCount} Completed ({overallProgressPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* ── Search & Filter Toolbar ── */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by module title, category, topic, or lesson (e.g., PyTorch, RAG, LoRA, MCP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl text-sm sm:text-base bg-card/80 backdrop-blur-md border border-border/70 text-foreground placeholder:text-muted-foreground/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border select-none",
                    isSelected
                      ? "bg-primary text-white border-primary shadow-xs shadow-primary/20 scale-[1.02]"
                      : "bg-card/70 backdrop-blur-xs text-muted-foreground border-border/60 hover:text-foreground hover:border-primary/40 hover:bg-card"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
            <span>
              Showing <strong className="text-foreground font-semibold">{filteredModules.length}</strong> of {MODULES_LIST.length} modules
            </span>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-primary hover:underline cursor-pointer font-medium"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* ── Topic-Wise Module List View (Clean Minimalist Style) ── */}
        <div className="max-w-4xl mx-auto space-y-1.5 sm:space-y-2">
          {filteredModules.map((module, index) => {
            const completedInModule = module.lessons.filter((l) => completedLessons[l.id]).length;
            const progressPercent = Math.round((completedInModule / (module.lessons.length || 1)) * 100);

            return (
              <motion.div
                key={module.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: Math.min(index * 0.015, 0.25) }}
                onClick={() => {
                  setActiveModalModule(module);
                }}
                className="group relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex items-center justify-between gap-3 sm:gap-6 hover:bg-card/90 hover:shadow-md hover:border hover:border-border/70 transition-all duration-200 cursor-pointer select-none border border-transparent"
              >
                {/* Left: Number + Title */}
                <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
                  {/* Clean Monospace Number */}
                  <span className="font-mono text-base sm:text-xl font-medium text-muted-foreground/70 group-hover:text-primary transition-colors w-7 sm:w-10 shrink-0 text-left">
                    {module.num}
                  </span>

                  {/* Title & Category Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-sans text-sm sm:text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {module.title}
                    </h3>

                    {/* Subtle subline info on mobile/desktop */}
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground/80 font-mono">
                      <span className="text-[11px] text-primary font-semibold">{module.category}</span>
                      <span className="text-muted-foreground/40">·</span>
                      <span className="text-[11px]">{module.totalDuration}</span>
                      <span className="text-muted-foreground/40">·</span>
                      <span className="text-[11px]">{module.lessonsCount} lessons</span>
                    </div>
                  </div>
                </div>

                {/* Right: Progress & Action Arrow */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  {completedInModule > 0 && (
                    <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-primary/10 text-primary px-2.5 py-1 rounded-lg border border-primary/20">
                      <Check className="w-3 h-3" />
                      <span>{completedInModule}/{module.lessons.length}</span>
                    </div>
                  )}

                  <div className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all shadow-xs">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredModules.length === 0 && (
          <div className="text-center py-16 rounded-3xl border border-dashed border-border/80 bg-card/40 p-8">
            <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-foreground">No modules found</h3>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-md mx-auto">
              We couldn&apos;t find any modules matching &quot;{searchQuery}&quot;. Try adjusting your search query or selecting &quot;All&quot; categories.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 rounded-xl text-xs cursor-pointer"
            >
              Reset Search & Filters
            </Button>
          </div>
        )}

        {/* ── Interactive Module Lessons Modal / Popup ── */}
        <AnimatePresence>
          {activeModalModule && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalModule(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
              />

              {/* Modal Card with solid opaque background */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ type: "spring", duration: 0.32, bounce: 0.12 }}
                className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#161B22] border border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 my-auto ring-1 ring-black/5"
              >
                {/* ── Modal Header ── */}
                <div className="p-5 sm:p-6 pb-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161B22] relative shrink-0">
                  {/* Close (X) button */}
                  <button
                    onClick={() => setActiveModalModule(null)}
                    className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="pr-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[11px] sm:text-xs font-bold text-primary px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                        MODULE {activeModalModule.num}
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-md">
                        {activeModalModule.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-2">
                      {activeModalModule.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
                      {activeModalModule.description}
                    </p>
                  </div>

                  {/* "You'll Build" callout */}
                  <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent p-3 mt-3 flex items-start gap-2.5">
                    <Target className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm">
                      <span className="font-bold uppercase tracking-wider text-primary mr-1.5 inline-block">
                        You&apos;ll Build:
                      </span>
                      <span className="font-medium text-foreground/90 leading-snug">
                        {activeModalModule.youWillBuild}
                      </span>
                    </div>
                  </div>

                  {/* Module Stats Strip & Progress */}
                  <div className="flex flex-wrap sm:flex-row items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span className="font-bold text-foreground">{activeModalModule.totalDuration}</span>
                        <span className="text-muted-foreground">Total</span>
                      </div>
                      <div className="h-3.5 w-px bg-gray-200 dark:bg-gray-700" />
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-primary" />
                        <span className="font-bold text-foreground">{activeModalModule.lessons.length}</span>
                        <span className="text-muted-foreground">Lessons</span>
                      </div>
                    </div>

                    {/* Progress tracking */}
                    <div className="flex items-center gap-2.5">
                      <div className="text-right text-[11px] sm:text-xs font-mono">
                        <span className="font-semibold text-foreground">{activeModuleCompletedCount} of {activeModalModule.lessons.length} complete</span>
                        <span className="text-primary font-bold ml-1.5">({activeModuleProgressPercent}%)</span>
                      </div>
                      <div className="w-20 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-200/50 dark:border-gray-700">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${activeModuleProgressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Modal In-Lesson Search ── */}
                <div className="px-5 py-2.5 border-b border-gray-200 dark:border-gray-800 bg-[#F9FAFB] dark:bg-[#12161F] flex items-center justify-between gap-3 shrink-0">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Filter lessons in this module..."
                      value={modalSearchQuery}
                      onChange={(e) => setModalSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#1A1F29] border border-gray-200 dark:border-gray-700 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                    />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-muted-foreground shrink-0">
                    {modalLessons.length} {modalLessons.length === 1 ? "lesson" : "lessons"}
                  </span>
                </div>

                {/* ── Modal Body: Scrollable Lessons List with High Contrast ── */}
                <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1 min-h-0 bg-[#F4F5F7] dark:bg-[#0E1117]">
                  {modalLessons.map((lesson, idx) => {
                    const isDone = !!completedLessons[lesson.id];

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          setActiveModalModule(null);
                          const path = getLessonPath(activeModalModule, lesson);
                          router.push(`/lesson?path=${encodeURIComponent(path)}&module=${activeModalModule.num}&lesson=${lesson.id}`);
                        }}
                        className={cn(
                          "group rounded-xl border p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-all cursor-pointer select-none shadow-2xs hover:shadow-sm",
                          isDone
                            ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-muted-foreground"
                            : "bg-white dark:bg-[#181D26] border-gray-200/90 dark:border-gray-800 hover:border-primary/50 hover:bg-primary/[0.02] text-foreground"
                        )}
                      >
                        {/* Left: Number + Play Button + Title */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-mono font-bold transition-colors",
                            isDone
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:bg-primary/10 group-hover:text-primary"
                          )}>
                            {idx + 1}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLessonComplete(lesson.id);
                            }}
                            className="text-primary hover:scale-110 transition-transform cursor-pointer shrink-0"
                            title={isDone ? "Mark uncompleted" : "Mark completed"}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                            ) : (
                              <Play className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors fill-current" />
                            )}
                          </button>

                          <div className="min-w-0 flex-1">
                            <p
                              className={cn(
                                "text-xs sm:text-sm font-semibold leading-snug break-words transition-colors group-hover:text-primary",
                                isDone ? "line-through text-muted-foreground" : "text-foreground"
                              )}
                            >
                              {lesson.title}
                            </p>

                            {/* Mobile inline tags */}
                            <div className="flex sm:hidden items-center gap-2 mt-1 text-[10px] font-mono text-muted-foreground">
                              {lesson.type && <span>{lesson.type}</span>}
                              {lesson.tech && <span>· {lesson.tech}</span>}
                            </div>
                          </div>
                        </div>

                        {/* Right: Badges + Duration + Arrow */}
                        <div className="flex items-center gap-2.5 shrink-0">
                          {lesson.type && (
                            <span className="hidden sm:inline text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700">
                              {lesson.type} {lesson.tech && `· ${lesson.tech}`}
                            </span>
                          )}

                          <span className="text-[11px] sm:text-xs font-mono font-medium text-muted-foreground">
                            {lesson.duration}
                          </span>

                          <div className="w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center transition-all ml-1 shrink-0 shadow-2xs">
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {modalLessons.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground text-xs font-mono">
                      No lessons match &quot;{modalSearchQuery}&quot; in this module.
                    </div>
                  )}
                </div>

                {/* ── Modal Footer: Navigation & Actions ── */}
                <div className="p-3 sm:px-6 sm:py-3.5 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161B22] flex items-center justify-between gap-3 shrink-0">
                  <div className="text-xs font-mono text-muted-foreground hidden sm:block">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[10px]">Esc</kbd> to close
                  </div>

                  {/* Previous / Next Module Navigation */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end ml-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handlePrevModule}
                      disabled={MODULES_LIST.findIndex((m) => m.id === activeModalModule.id) === 0}
                      className="text-xs font-semibold rounded-xl border-gray-200 dark:border-gray-700 gap-1 cursor-pointer flex-1 sm:flex-none"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Previous
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleNextModule}
                      disabled={MODULES_LIST.findIndex((m) => m.id === activeModalModule.id) === MODULES_LIST.length - 1}
                      className="text-xs font-semibold rounded-xl border-gray-200 dark:border-gray-700 gap-1 cursor-pointer flex-1 sm:flex-none"
                    >
                      Next
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => setActiveModalModule(null)}
                      className="bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-xl px-5 cursor-pointer flex-1 sm:flex-none shadow-sm"
                    >
                      Done
                    </Button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── Premium Course Materials & Handbooks Section ── */}
        <div className="mt-16 sm:mt-24">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              Premium Course Material
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Official Handbooks & Study Guides
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-2.5 leading-relaxed">
              Accelerate your engineering journey with concise, battle-tested handbooks and comprehensive reference guides packed with real-world code architectures and formulas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {COURSE_MATERIALS.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-border/60 bg-card/60 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between hover:shadow-2xl hover:border-primary/40 transition-all duration-300 group relative overflow-hidden"
              >
                <div>
                  {/* Badge & Discount */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      {item.badge}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      {item.discount}
                    </span>
                  </div>

                  {/* Book Cover / Thumbnail Preview */}
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-muted/40 border border-border/40 mb-5 relative group-hover:scale-[1.01] transition-transform duration-300">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title & Description */}
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Buy Now CTA */}
                <div className="pt-5 border-t border-border/40">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-xs text-muted-foreground line-through font-mono block">
                        {item.originalPrice}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">
                          {item.price}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          (One-time)
                        </span>
                      </div>
                    </div>

                    <a
                      href={item.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 max-w-[200px]"
                    >
                      <Button
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-xl py-3 h-auto text-xs sm:text-sm cursor-pointer shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
                      >
                        Buy Material
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground font-mono">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>Instant Digital PDF Access • Lifetime Updates</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Text Courses Link */}
          <div className="mt-8 text-center">
            <Link
              href="/courses/text"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:underline"
            >
              <span>Explore all text courses & handbooks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
