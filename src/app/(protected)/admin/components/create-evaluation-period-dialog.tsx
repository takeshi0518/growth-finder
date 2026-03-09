'use client';

import { Icons } from '@/components/icon/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function CreateEvaluationPeriodDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Icons.CalendarPlus className="w-4 h-4" />
          <span className="hidden sm:block">評価期間を作成</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form className="space-y-4">
          <DialogHeader>
            <DialogTitle>評価期間を作成</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            例: 2025年4月〜6月 の形式で入力してください
          </DialogDescription>
          <div className="space-y-2">
            <Label htmlFor="name">評価期間名</Label>
            <Input id="name" type="text" />
          </div>
          <div className="text-center">
            <Button type="submit" size="lg" className="w-full sm:w-28">
              作成
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
