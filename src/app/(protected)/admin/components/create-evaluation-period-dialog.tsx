'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '@/components/icon/icons';
import { useForm } from 'react-hook-form';
import {
  CreateEvaluationPeriodInput,
  createEvaluationPeriodSchema,
} from '@/lib/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import LoaderCircleIcon from '@/components/shared/loader-circle';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/utils/error-message';
import { createEvaluationPeriod } from '../actions';

export default function CreateEvaluationPeriodDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateEvaluationPeriodInput>({
    resolver: zodResolver(createEvaluationPeriodSchema),
  });

  const onSubmit = async (data: CreateEvaluationPeriodInput) => {
    try {
      await createEvaluationPeriod(data);
      toast.success('評価期間を作成しました');
      reset();
      setIsOpen(false);
    } catch (error) {
      toast.error('評価期間の作成に失敗しました', {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Icons.CalendarPlus className="w-4 h-4" />
          <span className="hidden sm:block">作成</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>評価期間を作成</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            例: 2025年4月〜6月 の形式で入力してください
          </DialogDescription>
          <div className="space-y-2">
            <Label htmlFor="name">評価期間名</Label>
            <Input id="name" type="text" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-28"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoaderCircleIcon /> : '作成'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
