'use client';

import { generateFeedbackAction } from '@/agents/feedback/actions';
import { FeedbackResult } from '@/agents/feedback/types';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Icons } from '../icon/icons';

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
    <div className="mt-6">
      <Button onClick={handleGenerate} disabled={isPending}>
        {isPending ? '生成中...' : 'AIフィードバックを生成'}
      </Button>

      {result && <FeedbackResultView result={result} />}
    </div>
  );
}

function FeedbackResultView({ result }: { result: FeedbackResult }) {
  switch (result.status) {
    case 'completed':
      return (
        <div className="mt-4">
          <p className="whitespace-pre-wrap">{result.feedback}</p>
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
