'use client';

import { useForm } from 'react-hook-form';
import {
  ResendConfirmationInput,
  resetPasswordEmailSchema,
} from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuth } from '../hooks/use-auth';
import LoaderCircleIcon from '@/components/shared/loader-circle';

export default function ResetMailForm() {
  const { resendConfirmation, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendConfirmationInput>({
    resolver: zodResolver(resetPasswordEmailSchema),
    mode: 'onChange',
  });
  return (
    <form className="space-y-4" onSubmit={handleSubmit(resendConfirmation)}>
      {/* メールアドレス */}
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* 送信ボタン */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isLoading.resentdConfirmation}
      >
        {isLoading.resetPasswordEmail ? <LoaderCircleIcon /> : 'メールを再送信'}
      </Button>
    </form>
  );
}
