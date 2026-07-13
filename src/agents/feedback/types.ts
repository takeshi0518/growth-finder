import { Rank } from '../../../types/evaluations';

export type TurnLog = {
  turn: number;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
};

export type ToolCallLog = {
  toolName: string;
  input: unknown;
  result: { ok: true } | { ok: false; error: string };
};

export type FeedbackResult =
  | {
      status: 'completed';
      feedback: string;
      turns: TurnLog[];
      toolCalls: ToolCallLog[];
    }
  | {
      status: 'max_iterations';
      turns: TurnLog[];
      toolCalls: ToolCallLog[];
    }
  | {
      status: 'error';
      error: string;
      turns: TurnLog[];
      toolCalls: ToolCallLog[];
    };

export type TrendDirection = 'improving' | 'stable' | 'declining';

type CategoryTrend = {
  averageRate: number;
  direction: TrendDirection;
};

export type EvaluationTrend = {
  periodStart: string;
  periodEnd: string;
  evaluationCount: number;
  skill: CategoryTrend;
  hospitality: CategoryTrend;
  cleanliness: CategoryTrend;
};

export type PreviousEvaluation = {
  periodName: string;
  skillRate: number;
  hospitalityRate: number;
  cleanlinessRate: number;
  totalRate: number;
  rank: Rank;
  actionPlan: string | null;
  totalComment: string | null;
  futureVision: string | null;
};
