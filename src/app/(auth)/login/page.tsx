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
    <Card className="w-full max-w-md mt-10">
      <CardHeader className="text-center">
        <CardTitle className="text-xl sm:text-2xl">Login</CardTitle>
        <CardDescription className="text-xs sm:text-base">
          アカウントにログインしてください
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <LoginForm />
      </CardContent>

      <CardFooter>
        <p className="text-xs sm:text-sm text-muted-foreground text-center w-full">
          アカウントをお持ちでない方は
          <Link
            href="/signup"
            className="underline ml-1 hover:text-primary transition-colors"
          >
            こちら
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
