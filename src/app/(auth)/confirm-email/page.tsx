import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

import { Icons } from '@/components/icon/icons';
import { Button } from '@/components/ui/button';

export default function ConfirmEmailPage() {
  return (
    <Card className="max-w-md w-full mt-10">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10">
            <Icons.MailCheck className="text-primary" />
          </div>
        </div>
        <CardTitle className="text-xl sm:text-2xl">
          メールを確認してください
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-center text-muted-foreground">
        <p className="text-sm">
          登録したメールアドレスに確認メールを送信しました。
        </p>
        <p className="text-sm">
          メール内のリンクをクリックして登録を完了してください。
        </p>

        <div className="pt-4 border-t text-sm">
          <p>メールが届かない場合は迷惑メールフォルダを確認ください。</p>
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex justify-center">
        <Button asChild>
          <Link href="/login">ログインページへ</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
