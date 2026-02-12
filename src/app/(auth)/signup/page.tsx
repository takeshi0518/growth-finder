import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

import SignupForm from './signup-form';
import { Icons } from '@/components/icon/icons';

export default function Signup() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-xl sm:text-3xl">
          管理者アカウント作成
        </CardTitle>
        <CardDescription className="text-xs sm:text-base">
          Growth Finderで組織の成長を可視化しましょう
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignupForm />
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            すでにアカウントをお持ちの方は
          </span>
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            ログイン
          </Link>
        </div>

        {/* ホームに戻る */}
        <div className="text-center text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
          >
            <Icons.ArrowLeft className="h-4 w-4 text-primary" />
            ホームに戻る
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
