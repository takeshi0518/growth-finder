'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetMailForm() {
  return (
    <form className="space-y-4">
      {/* メールアドレス */}
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input id="email" type="email" placeholder="your@email.com" />
      </div>

      {/* 送信ボタン */}
      <Button type="submit" className="w-full" size="lg">
        メールを再送信する
      </Button>
    </form>
  );
}
