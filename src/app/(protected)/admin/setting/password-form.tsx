'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  UpdatePasswordInput,
  updatePasswordSchema,
} from '@/lib/validations/auth';
import { updatePassword } from './actions';
import { getErrorMessage } from '@/lib/utils/error-message';
import LoaderCircleIcon from '@/components/shared/loader-circle';

type PasswordFormProps = {
  isOAuthUser: boolean;
};

export default function PasswordForm({ isOAuthUser }: PasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onChange',
  });

  if (isOAuthUser) {
    return (
      <p className="text-sm text-muted-foreground">
        Googleアカウントで認証しているためパスワードの設定はありません
      </p>
    );
  }

  const onSubmit = async (data: UpdatePasswordInput) => {
    try {
      await updatePassword(data);
      toast.success('パスワードを更新しました');
    } catch (error) {
      toast.error('パスワードの更新に失敗しました', {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="currentPassword">現在のパスワード</Label>
        <Input
          id="currentPassword"
          type="password"
          placeholder="••••••••"
          {...register('currentPassword')}
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-500">
            {errors.currentPassword?.message}
          </p>
        )}
      </div>
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
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">パスワード確認</Label>
        <Input
          id="confirmPassword"
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
      <div className="flex justify-center">
        <Button type="submit" size="lg" className="w-full sm:w-48">
          {isSubmitting ? <LoaderCircleIcon /> : '更新する'}
        </Button>
      </div>
    </form>
  );
}
