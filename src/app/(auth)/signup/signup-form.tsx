'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icon/icons';

export default function SignupForm() {
  return (
    <div className="space-y-6">
      <form className="space-y-4">
        {/* メールアドレス */}
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            placeholder="youremail@example.com"
            required
          />
        </div>

        {/* パスワード */}
        <div className="space-y-2">
          <Label htmlFor="password">パスワード</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
          />
          <p className="text-xs text-muted-foreground">
            8文字以上の英数字を含むパスワード
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-xs sm:text-sm">
            パスワード(確認)
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        {/* ログインボタン */}
        <Button type="submit" className="w-full" size="lg">
          アカウントを作成
        </Button>
      </form>

      {/* 区切り線 */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">または</span>
        </div>
      </div>

      {/* Google OAuth */}
      <Button type="button" variant="outline" size="lg" className="w-full">
        <Icons.FcGoogle className="mr-2 h-5 w-5" />
        Googleで続ける
      </Button>
    </div>
  );
}
