import Link from 'next/link';

import { Icons } from '@/components/icon/icons';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ResetForm from './reset-form';

export default function ResetPasswordPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10">
            <Icons.KeyRound className="text-primary w-8 h-8" />
          </div>
        </div>

        <CardTitle className="text-2xl md:text-3xl">
          パスワードをリセット
        </CardTitle>
        <CardDescription>
          登録したメールアドレスにリセット用のリンクを送信します
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ResetForm />
      </CardContent>

      <CardFooter className="flex justify-center">
        <div className="text-center text-sm">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
          >
            <Icons.ArrowLeft className="h-4 w-4 text-primary" />
            ログインに戻る
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
