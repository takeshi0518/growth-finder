'use server';

import Anthropic from '@anthropic-ai/sdk';
import type { FeedbackResult } from './types';
import { ExistingEvaluation } from '../../../types/evaluations';
import { formatCurrentEvaluation } from './format-evaluation';

const client = new Anthropic();
const MODEL = 'claude-haiku-4-5';

export async function generateFeedbackAction(
  staffId: string,
  targetEvaluation: ExistingEvaluation
): Promise<FeedbackResult> {
  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `あなたはカフェ店長を補佐するアシスタントです。スタッフ（ID: ${staffId}）の1on1面談用フィードバックを、200字程度で作成してください。`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const feedback = textBlock?.type === 'text' ? textBlock.text : '';

    return {
      status: 'completed',
      feedback,
      turns: [
        {
          turn: 1,
          model: MODEL,
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
          costUsd: 0,
        },
      ],
      toolCalls: [],
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : '不明なエラー',
      turns: [],
      toolCalls: [],
    };
  }
}
