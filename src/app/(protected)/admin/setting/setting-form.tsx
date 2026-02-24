'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icon/icons';

export default function SettingForm() {
  return (
    <form className="space-y-4">
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-2 overflow-hidden bg-card- flex items-center justify-center">
            <Icons.UserCircle className="w-16 h-16 text-muted-foreground" />
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-background border rounded-full px-2 py-0.5 text-xs"
          >
            編集
          </button>
          <input type="file" accept="image/*" className="hidden" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>名前</Label>
        <Input type="text" placeholder="" />
      </div>
      <div className="space-y-2">
        <Label>店舗名</Label>
        <Input type="text" placeholder="" />
      </div>
      <div className="space-y-2">
        <Label>メールアドレス</Label>
        <Input type="email" placeholder="" />
      </div>

      <Button type="button" size="lg" className="w-full">
        保存
      </Button>
    </form>
  );
}
