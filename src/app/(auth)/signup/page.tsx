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
    <Card className="w-full max-w-md mt-10">
      <CardHeader className="text-center">
        <CardTitle className="text-xl sm:text-2xl">Signup</CardTitle>
        <CardDescription className="text-xs sm:text-base">
          アカウントを作成してください
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <SignupForm />
      </CardContent>

      <CardFooter>
        <p className="text-xs sm:text-sm text-muted-foreground text-center w-full">
          すでにアカウントをお持ちの方は
          <Link
            href="/login"
            className="underline ml-1 hover:text-primary transition-colors"
          >
            こちら
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
