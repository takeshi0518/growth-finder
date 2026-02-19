import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/icon/icons';
import ResetMailForm from './reset-mail-form';

export default function ResendConfirmationPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-4">
        {/* アイコン */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10">
            <Icons.MailCheck className="text-primary w-8 h-8" />
          </div>
        </div>

        {/* タイトル */}
        <CardTitle className="text-2xl md:text-3xl">メールを再送信</CardTitle>
        <CardDescription>
          受信したいメールアドレスを入力してください
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ResetMailForm />
      </CardContent>
    </Card>
  );
}
