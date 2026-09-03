export interface QuizItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ArchitectureFlowStep {
  step: string;
  label: string;
  desc: string;
}

export interface CodeComparison {
  filename: string;
  language: string;
  code: string;
  problems?: string[];
  improvements?: string[];
}

export interface ExperimentScenario {
  name: string;
  method: string;
  endpoint: string;
  payload: string;
  expectedStatus: number;
  statusText: string;
  response: string;
  explanation: string;
}

export interface TelemetryMetric {
  label: string;
  value: string;
  status: "good" | "warning" | "neutral";
  note: string;
}

export interface TelemetryLog {
  time: string;
  level: "INFO" | "WARN" | "ERROR";
  tag: string;
  message: string;
}

export interface ProductionRule {
  title: string;
  description: string;
  impact: string;
}

export interface ChallengeItem {
  title: string;
  prompt: string;
  hint: string;
  solutionCode: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: string;
}

export interface SubtopicItem {
  id: string;
  title: string;
  paragraphs: string[];
  mathFormula?: string;
  codeSnippet?: string;
}

export interface BuildStepItem {
  step: string;
  title: string;
  desc: string;
  code?: string;
}

export interface UseCaseItem {
  title: string;
  desc: string;
  framework: string;
  code: string;
}

export interface DetailedLessonContent {
  chapterNumber: number;
  categoryBadge: string;
  subtitle: string;
  concept: {
    title: string;
    paragraphs: string[];
  };
  subtopics?: SubtopicItem[];
  whyItMatters: {
    title: string;
    paragraphs: string[];
  };
  architecture: {
    title: string;
    flowSummary: string;
    flowSteps: ArchitectureFlowStep[];
    paragraphs: string[];
  };
  buildSteps?: BuildStepItem[];
  code: {
    title: string;
    before: CodeComparison;
    after: CodeComparison;
  };
  useCases?: UseCaseItem[];
  experiment: {
    title: string;
    description: string;
    scenarios: ExperimentScenario[];
  };
  observe: {
    title: string;
    metrics: TelemetryMetric[];
    logs: TelemetryLog[];
  };
  production: {
    title: string;
    rules: ProductionRule[];
  };
  challenge: ChallengeItem;
  checklist: ChecklistItem[];
  quizzes: QuizItem[];
  skillsCount: number;
  sectionsCount: number;
  technologies: string[];
  updatedDate: string;
}
