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
