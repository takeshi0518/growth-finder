'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '@/components/icon/icons';
import { useForm } from 'react-hook-form';
import { AddStaffInput, addStaffSchema } from '@/lib/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import LoaderCircleIcon from '@/components/shared/loader-circle';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/utils/error-message';
import { addStaff } from '../actions';

export default function StaffAddDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddStaffInput>({
    resolver: zodResolver(addStaffSchema),
  });

  const onSubmit = async (data: AddStaffInput) => {
    try {
      await addStaff(data);
      toast.success('スタッフを追加しました');
      setIsOpen(false);
      reset();
    } catch (error) {
      toast.error('スタッフの登録に失敗しました', {
        description: getErrorMessage(error),
      });
    }
  };

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

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label>名前</Label>
            <Input type="text" placeholder="山田太郎" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>メールアドレス</Label>
            <Input
              type="email"
              placeholder="staff@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>パスワード</Label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg">
            {isSubmitting ? <LoaderCircleIcon /> : '登録する'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
