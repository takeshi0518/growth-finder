import ResetForm from './reset-form';
import { Icons } from '@/components/icon/icons';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import BackPageLink from '@/components/shared/back-page-link';

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
          <BackPageLink href="/login" label="ログインへ戻る" />
        </div>
      </CardFooter>
    </Card>
  );
}
