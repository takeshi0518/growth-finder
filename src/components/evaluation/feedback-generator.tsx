'use client';

import { generateFeedbackAction } from '@/agents/feedback/actions';
import { FeedbackResult } from '@/agents/feedback/types';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Icons } from '../icon/icons';
import LoaderCircleIcon from '../shared/loader-circle';
import SectionEvaluationLayout from './section-evaluation-layout';
import { ExistingEvaluation } from '../../../types/evaluations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

type FeedbackgeneratorProps = {
  staffId: string;
  targetEvaluation: ExistingEvaluation;
  showTrace: boolean;
};

export default function FeedbackGenerator({
  staffId,
  targetEvaluation,
  showTrace,
}: FeedbackgeneratorProps) {
  const [result, setResult] = useState<FeedbackResult | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleGenerate() {
    setIsPending(true);
    setResult(null);
    const res = await generateFeedbackAction(staffId, targetEvaluation);
    setResult(res);
    setIsPending(false);
  }

  const totalCost = result?.turns.reduce((sum, t) => sum + t.costUsd, 0) ?? 0;

  return (
    <SectionEvaluationLayout>
      <div className="mt-6 w-full">
        <Button onClick={handleGenerate} disabled={isPending} className="w-52">
          {isPending ? (
            <>
              <LoaderCircleIcon /> 生成中...
            </>
          ) : (
            'AIフィードバックを生成'
          )}
        </Button>

        {result && <FeedbackResultView result={result} />}
        {result && showTrace && (
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="trace">
              <AccordionTrigger className="text-xs">
                AIの処理過程を表示
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div>
                    <p className="font-medium">呼び出したツール</p>
                    {result.toolCalls.length === 0 ? (
                      <p>ツール呼び出しなし</p>
                    ) : (
                      <ul>
                        {result.toolCalls.map((c, i) => (
                          <li key={i}>
                            {c.toolName}
                            {c.result.ok ? '' : `失敗: ${c.result.error}`}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">生成コスト</p>
                    <p>
                      {result.turns.length}ターン / 約
                      {(totalCost * 150).toFixed(2)}円 (${totalCost.toFixed(6)})
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </SectionEvaluationLayout>
  );
}

function FeedbackResultView({ result }: { result: FeedbackResult }) {
  switch (result.status) {
    case 'completed':
      return (
        <div className="mt-4 space-y-2">
          <p className="flex items-center gap-2">
            <Icons.Bot className="w-4 h-4 text-primary" />
            <span className="text-sm md:text-md font-medium">
              AIフィードバック
            </span>
          </p>
          <div className="w-full p-3 border rounded-md text-[10px]">
            <p className="whitespace-pre-wrap leading-relaxed">
              {result.feedback}
            </p>
          </div>
        </div>
      );
    case 'max_iterations':
      return (
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Icons.CircleAlert />
          フィードバックを生成できませんでした。もう一度お試しください。
        </p>
      );
    case 'error':
      return (
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Icons.CircleAlert />
          エラーが発生しました。しばらくしてから再度お試しください。
        </p>
      );
    default: {
      const _exhaustive: never = result;
      throw new Error(`不明なstatus: ${JSON.stringify(result)}`);
    }
  }
}
