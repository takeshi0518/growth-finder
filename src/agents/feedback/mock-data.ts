import type { FeedbackResult } from './types';

export const mockCompleted: FeedbackResult = {
  status: 'completed',
  feedback:
    '田中さんは前回の評価と比べて、接客の丁寧さが着実に向上しています。特にお客様への声かけのタイミングが自然になり、常連のお客様からの反応も良くなっているようです。一方で、清掃面ではここ数回でやや意識が薄れている傾向が見られます。次回の面談では、伸びている接客面をしっかり承認したうえで、開店前の清掃チェックの習慣化について一緒に考えてみるとよいでしょう。',
  turns: [
    {
      turn: 1,
      model: 'claude-haiku-4-5',
      inputTokens: 850,
      outputTokens: 95,
      costUsd: 0.001325,
    },
    {
      turn: 2,
      model: 'claude-haiku-4-5',
      inputTokens: 1620,
      outputTokens: 410,
      costUsd: 0.00367,
    },
  ],
  toolCalls: [
    {
      toolName: 'getPreviousEvaluation',
      input: { staffId: 'demo-staff-01' },
      result: { ok: true },
    },
    {
      toolName: 'getEvaluationTrend',
      input: { staffId: 'demo-staff-01' },
      result: { ok: true },
    },
  ],
  latencyMs: 6200,
};

export const mockMaxIterations: FeedbackResult = {
  status: 'max_iterations',
  turns: [
    {
      turn: 1,
      model: 'claude-haiku-4-5',
      inputTokens: 850,
      outputTokens: 80,
      costUsd: 0.0012,
    },
    {
      turn: 2,
      model: 'claude-haiku-4-5',
      inputTokens: 1400,
      outputTokens: 150,
      costUsd: 0.00215,
    },
    {
      turn: 3,
      model: 'claude-haiku-4-5',
      inputTokens: 1900,
      outputTokens: 160,
      costUsd: 0.0027,
    },
    {
      turn: 4,
      model: 'claude-haiku-4-5',
      inputTokens: 2300,
      outputTokens: 170,
      costUsd: 0.00315,
    },
    {
      turn: 5,
      model: 'claude-haiku-4-5',
      inputTokens: 2800,
      outputTokens: 180,
      costUsd: 0.0037,
    },
  ],
  toolCalls: [
    {
      toolName: 'getPreviousEvaluation',
      input: { staffId: 'demo-staff-01' },
      result: { ok: true },
    },
    {
      toolName: 'getEvaluationTrend',
      input: { staffId: 'demo-staff-01' },
      result: { ok: true },
    },
    {
      toolName: 'getPreviousEvaluation',
      input: { staffId: 'demo-staff-01' },
      result: { ok: true },
    },
  ],
  latencyMs: 15000,
};

export const mockError: FeedbackResult = {
  status: 'error',
  error: '評価データの取得に失敗しました（Supabase接続エラー）',
  turns: [
    {
      turn: 1,
      model: 'claude-haiku-4-5',
      inputTokens: 850,
      outputTokens: 60,
      costUsd: 0.0011,
    },
  ],
  toolCalls: [
    {
      toolName: 'getPreviousEvaluation',
      input: { staffId: 'demo-staff-01' },
      result: { ok: false, error: 'connection timeout' },
    },
  ],
  latencyMs: 800,
};
