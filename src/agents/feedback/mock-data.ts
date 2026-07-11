import type { FeedbackResult } from './types';

export const mockCompleted: FeedbackResult = {
  status: 'completed',
  feedback: '（ダミー）田中さんは前回より接客が…',
  turns: [
    /* ... */
  ],
  toolCalls: [
    /* ... */
  ],
};

export const mockMaxIterations: FeedbackResult = {
  status: 'max_iterations',
  turns: [
    /* ... */
  ],
  toolCalls: [
    /* ... */
  ],
};

export const mockError: FeedbackResult = {
  status: 'error',
  error: '評価データの取得に失敗しました',
  turns: [],
  toolCalls: [],
};
