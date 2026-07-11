'use server';

import { mockCompleted, mockError, mockMaxIterations } from './mock-data';
import type { FeedbackResult } from './types';

// ダミー実装。本番では中身をエージェントループに差し替える。
export async function generateFeedbackAction(
  //Todo: 本番実装時にはプレフィックスを削除する
  _staffId: string
): Promise<FeedbackResult> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return mockCompleted;
}
