'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PasswordForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label>現在のパスワード</Label>
        <Input type="password" placeholder="" />
      </div>
      <div className="space-y-2">
        <Label>新しいパスワード</Label>
        <Input type="password" placeholder="" />
      </div>
      <div className="space-y-2">
        <Label>パスワード確認</Label>
        <Input type="password" placeholder="" />
      </div>

      <Button type="button" size="lg" className="w-full">
        更新する
      </Button>
    </form>
  );
}
