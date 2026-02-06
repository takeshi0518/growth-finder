'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icon/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function LoginForm() {
  return (
    <Tabs defaultValue="admin" className="w-full">
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="admin">管理者</TabsTrigger>
        <TabsTrigger value="staff">スタッフ</TabsTrigger>
      </TabsList>

      {/* 管理者タブ */}
      <TabsContent value="admin" className="space-y-4 mt-6">
        <form className="space-y-4">
          {/* メールアドレス */}
          <div className="space-y-2">
            <Label htmlFor="admin-email">メールアドレス</Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="your@email.com"
              required
            />
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
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            ログイン
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">or</span>
          </div>
        </div>

        {/* Google OAuth */}
        <Button type="button" variant="outline" size="lg" className="w-full">
          <Icons.FcGoogle className="mr-2 h-5 w-5" />
          Googleで続ける
        </Button>
      </TabsContent>

      {/* スタッフタブ */}
      <TabsContent value="staff" className="space-y-4 mt-6">
        <form className="space-y-4">
          {/* メールアドレス */}
          <div className="space-y-2">
            <Label htmlFor="staff-email">メールアドレス</Label>
            <Input
              id="staff-email"
              type="email"
              placeholder="your@email.com"
              required
            />
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
              required
            />
          </div>

          {/* ログインボタン */}
          <Button type="submit" className="w-full" size="lg">
            ログイン
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
