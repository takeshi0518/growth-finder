'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function NewPasswordForm() {
  return (
    <form className="space-y-4">
      {/* 新しいパスワード */}
      <div className="space-y-2">
        <Label htmlFor="password">新しいパスワード</Label>
        <Input id="password" type="password" placeholder="••••••••" required />
        <p className="text-xs text-muted-foreground">
          8文字以上の英数字を含むパスワード
        </p>
      </div>

      {/* パスワード確認 */}
      <div className="space-y-2">
        <Label htmlFor="confirm-password">パスワード(確認)</Label>
        <Input
          id="conform-password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>

      {/* 更新ボタン */}
      <Button type="button" className="w-full" size="lg">
        パスワードを更新
      </Button>
    </form>
  );
}
