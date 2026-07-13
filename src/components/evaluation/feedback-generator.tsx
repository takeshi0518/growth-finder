'use client';

import { generateFeedbackAction } from '@/agents/feedback/actions';
import { FeedbackResult } from '@/agents/feedback/types';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Icons } from '../icon/icons';
import LoaderCircleIcon from '../shared/loader-circle';

export default function FeedbackGenerator({ staffId }: { staffId: string }) {
  const [result, setResult] = useState<FeedbackResult | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleGenerate() {
    setIsPending(true);
    setResult(null);
    const res = await generateFeedbackAction(staffId);
    setResult(res);
    setIsPending(false);
  }

  return (
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
    </div>
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
