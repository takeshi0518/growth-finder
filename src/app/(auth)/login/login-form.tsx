'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icon/icons';

export default function LoginForm() {
  return (
    <>
      <form className="space-y-7">
        {/* メールアドレス */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs sm:text-sm">
            メールアドレス
          </Label>
          <Input id="email" type="email" placeholder="youremail@example.com" />
        </div>

        {/* パスワード */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs sm:text-sm">
            パスワード
          </Label>
          <Input id="password" type="password" />
        </div>

        {/* ログインボタン */}
        <Button type="submit" className="w-full">
          ログイン
        </Button>
      </form>

      {/* 区切り線 */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-primary-foreground px-2 text-muted-foreground">
            or
          </span>
        </div>
      </div>

      {/* OAuthボタン */}
      <div>
        <Button variant="outline" size="lg" className="w-full cursor-pointer">
          <div className="flex items-center gap-2">
            <Icons.FcGoogle />
            Google
          </div>
        </Button>
      </div>
    </>
  );
}
