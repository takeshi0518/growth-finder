'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icon/icons';
import { SignupInput, signupSchema } from '@/lib/validations/auth';
import { useAuth } from '../hooks/use-auth';
import LoaderCircleIcon from '@/components/shared/loader-circle';

export default function SignupForm() {
  const { signUp, signUpWithGoogle, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit(signUp)}>
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            placeholder="youremail@example.com"
            {...register('email')}
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">名前</Label>
          <Input
            id="name"
            type="text"
            placeholder="山田太郎"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="storeName">店舗名</Label>
          <Input
            id="storeName"
            type="text"
            placeholder="◯◯◯店"
            {...register('storeName')}
          />

          {errors.storeName && (
            <p className="text-sm text-red-500">{errors.storeName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">パスワード</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
          />
          <p className="text-xs text-muted-foreground">
            8文字以上の英数字を含むパスワード
          </p>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-xs sm:text-sm">
            パスワード(確認)
          </Label>
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

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading.signUp || isLoading.google}
        >
          {isLoading.signUp ? <LoaderCircleIcon /> : 'アカウントを作成'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">または</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full"
        onClick={signUpWithGoogle}
        disabled={isLoading.signUp || isLoading.google}
      >
        {isLoading.google ? (
          <LoaderCircleIcon />
        ) : (
          <>
            <Icons.FcGoogle className="mr-2 h-5 w-5" />
            <span>Googleで続ける</span>
          </>
        )}
      </Button>
    </div>
  );
}
