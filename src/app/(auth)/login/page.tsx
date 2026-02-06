import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">ログイン</CardTitle>
        <CardDescription>
          Growth Finderにログインして成長を可視化しましょう
        </CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            アカウントをお持ちでない方は
          </span>
          <Link
            href="/signup"
            className="text-primary hover:underline font-medium"
          >
            新規登録
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
