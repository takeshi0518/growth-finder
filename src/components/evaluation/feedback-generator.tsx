'use client';

import { generateFeedbackAction } from '@/agents/feedback/actions';
import { FeedbackResult } from '@/agents/feedback/types';
import { useState } from 'react';
import { Button } from '../ui/button';

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

      {result && (
        <pre className="mt-4 text-xs">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
