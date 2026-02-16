'use client';

import Link from 'next/link';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icon/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginInput, loginSchema } from '@/lib/validations/auth';
import { useAuth } from '../hooks/use-auth';
import LoaderCircleIcon from '@/components/shared/loader-circle';

type LoginTabValue = 'admin' | 'staff';

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState<LoginTabValue>('admin');
  const { isLoading, signInWithGoogle, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value as LoginTabValue);
    reset();
  };

  const onSubmit = async (data: LoginInput) => {
    await signIn(data);
  };

  return (
    <Tabs
      defaultValue="admin"
      className="w-full"
      value={activeTab}
      onValueChange={handleTabChange}
    >
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="admin">管理者</TabsTrigger>
        <TabsTrigger value="staff">スタッフ</TabsTrigger>
      </TabsList>

      {/* 管理者タブ */}
      <TabsContent value="admin" className="space-y-4 mt-6">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* メールアドレス */}
          <div className="space-y-2">
            <Label htmlFor="admin-email">メールアドレス</Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* パスワード */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="admin-password">パスワード</Label>
              <Link
                href="/reset-password"
                className="text-xs text-primary hover:underline"
              >
                パスワードを忘れた場合
              </Link>
            </div>
            <Input
              id="admin-password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading.google || isLoading.signIn}
          >
            {isLoading.signIn ? <LoaderCircleIcon /> : 'ログイン'}
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

        {/* Google OAuth */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={signInWithGoogle}
          disabled={isLoading.google || isLoading.signIn}
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
      </TabsContent>

      {/* スタッフタブ */}
      <TabsContent value="staff" className="space-y-4 mt-6">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* メールアドレス */}
          <div className="space-y-2">
            <Label htmlFor="staff-email">メールアドレス</Label>
            <Input
              id="staff-email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* パスワード */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="staff-password">パスワード</Label>
              <Link
                href="/reset-password"
                className="text-xs text-primary hover:underline"
              >
                パスワードを忘れた場合
              </Link>
            </div>
            <Input
              id="staff-password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* ログインボタン */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading.google || isLoading.signIn}
          >
            {isLoading.signIn ? <LoaderCircleIcon /> : 'ログイン'}
          </Button>
        </form>

        <div className="rounded-lg bg-primary/10 p-4">
          <p className="text-xs text-muted-foreground text-center">
            スタッフはメールアドレスとパスワードでログインしてください
            <br />
            初回ログインの場合は招待メールをご確認ください
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
