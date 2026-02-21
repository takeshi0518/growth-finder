'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ResetPasswordEmailInput,
  resetPasswordEmailSchema,
} from '@/lib/validations/auth';
import { useAuth } from '../hooks/use-auth';
import LoaderCircleIcon from '@/components/shared/loader-circle';

export default function ResetForm() {
  const { resetPasswordEmail, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordEmailInput>({
    resolver: zodResolver(resetPasswordEmailSchema),
    mode: 'onChange',
  });
  return (
    <form className="space-y-4" onSubmit={handleSubmit(resetPasswordEmail)}>
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

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isLoading.resetPasswordEmail}
      >
        {isLoading.resetPasswordEmail ? (
          <LoaderCircleIcon />
        ) : (
          'リセットメールを送信'
        )}
      </Button>
    </form>
  );
}
