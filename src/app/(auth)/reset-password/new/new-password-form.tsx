'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../../hooks/use-auth';
import { NewPasswordInput, newPasswordSchema } from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LoaderCircleIcon from '@/components/shared/loader-circle';

export default function NewPasswordForm() {
  const { resetPassword, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema),
    mode: 'onChange',
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(resetPassword)}>
      <div className="space-y-2">
        <Label htmlFor="password">新しいパスワード</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          8文字以上の英数字を含むパスワード
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">パスワード(確認)</Label>
        <Input
          id="conform-password"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isLoading.resetPassword}
      >
        {isLoading.resetPassword ? <LoaderCircleIcon /> : 'パスワードを更新'}
      </Button>
    </form>
  );
}
