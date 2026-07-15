'use server';

import Anthropic from '@anthropic-ai/sdk';
import type { FeedbackResult, ToolCallLog, TurnLog } from './types';
import { ExistingEvaluation } from '../../../types/evaluations';
import { formatCurrentEvaluation } from './format-evaluation';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import { getEvaluationTrend, getPreviousEvaluation } from './queries';
import { tools } from './tools';
import { calcCost } from './calc-cost';
import { buildPrompt } from './prompt';

const client = new Anthropic();
const MODEL = 'claude-haiku-4-5';
const MAX_ITERATIONS = 5;

export async function generateFeedbackAction(
  staffId: string,
  targetEvaluation: ExistingEvaluation
): Promise<FeedbackResult> {
  const startedAt = Date.now();

  try {
    const supabase = await createClient();
    const { orgId } = await requireAdmin(supabase);

    const toolRegistry: Record<string, () => Promise<unknown>> = {
      getPreviousEvaluation: () =>
        getPreviousEvaluation(supabase, staffId, orgId),
      getEvaluationTrend: () => getEvaluationTrend(supabase, staffId, orgId),
    };

    const current = formatCurrentEvaluation(targetEvaluation);

    const messages: Anthropic.MessageParam[] = [
      {
        role: 'user',
        content: buildPrompt(current),
      },
    ];

    const turns: TurnLog[] = [];
    const toolCalls: ToolCallLog[] = [];

    for (let i = 0; i < MAX_ITERATIONS; i++) {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        tools,
        messages,
      });

      turns.push({
        turn: i + 1,
        model: MODEL,
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
        costUsd: calcCost(
          MODEL,
          response.usage.input_tokens,
          response.usage.output_tokens
        ),
      });

      messages.push({ role: 'assistant', content: response.content });

      if (response.stop_reason !== 'tool_use') {
        const textBlock = response.content.find((b) => b.type === 'text');
        const feedback = textBlock?.type === 'text' ? textBlock.text : '';
        return {
          status: 'completed',
          feedback,
          turns,
          toolCalls,
          latencyMs: Date.now() - startedAt,
        };
      }

      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type === 'tool_use') {
          const fn = toolRegistry[block.name];
          let resultData: unknown;
          let isError = false;

          if (fn) {
            resultData = await fn();
          } else {
            resultData = `不明なツール: ${block.name}`;
            isError = true;
          }

          toolCalls.push({
            toolName: block.name,
            input: block.input,
            result: isError
              ? { ok: false, error: String(resultData) }
              : { ok: true },
          });

          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: JSON.stringify(resultData),
            is_error: isError,
          });
        }
      }
      messages.push({ role: 'user', content: toolResults });
    }

    return {
      status: 'max_iterations',
      turns,
      toolCalls,
      latencyMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : '不明なエラー',
      turns: [],
      toolCalls: [],
      latencyMs: Date.now() - startedAt,
    };
  }
}
