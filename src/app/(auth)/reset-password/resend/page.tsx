import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/icon/icons';
import ResendResetPassword from './resend-reset-password';

export default function ResendConfirmationPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10">
            <Icons.MailCheck className="text-primary w-8 h-8" />
          </div>
        </div>

        <CardTitle className="text-2xl md:text-3xl">メールを再送信</CardTitle>
        <CardDescription>メールアドレスを入力してください</CardDescription>
      </CardHeader>

      <CardContent>
        <ResendResetPassword />
      </CardContent>
    </Card>
  );
}
