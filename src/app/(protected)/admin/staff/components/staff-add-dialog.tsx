'use client';

import { Icons } from '@/components/icon/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function StaffAddDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Icons.UserPlus className="w-4 h-4" />
          <span className="hidden sm:block">スタッフを追加</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 justify-center">
            <Icons.UserPlus className="size-5" />
            スタッフを追加
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label>名前</Label>
            <Input type="text" placeholder="山田太郎" />
          </div>
          <div className="space-y-2">
            <Label>メールアドレス</Label>
            <Input type="email" placeholder="staff@example.com" />
          </div>
          <div className="space-y-2">
            <Label>パスワード</Label>
            <Input type="password" placeholder="••••••••" />
          </div>

          <Button type="submit" className="w-full" size="lg">
            登録する
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
