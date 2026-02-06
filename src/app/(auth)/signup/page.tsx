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

        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              スタッフの方
            </span>
          </div>
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm font-medium">招待メールを確認してください</p>
          <p className="text-xs text-muted-foreground">
            管理者から招待メールが届いている場合は、
            <br />
            メール内のリンクからログインしてください
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
