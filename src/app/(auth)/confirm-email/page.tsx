import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icon/icons';

export default function ConfirmEmailPage() {
  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10">
            <Icons.MailCheck className="text-primary w-8 h-8" />
          </div>
        </div>
        <CardTitle className="text-2xl md:text-3xl">
          メールを確認してください
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            登録したメールアドレスに確認メールを送信しました。
          </p>
          <p className="text-sm text-muted-foreground">
            メール内のリンクをクリックして登録を完了してください。
          </p>
        </div>

        <div className="pt-4 border-t space-y-2">
          <p className="text-sm text-muted-foreground">
            メールが届かない場合は迷惑メールフォルダを確認ください。
          </p>
          <p className="text-sm text-muted-foreground">
            メールを再送信したい場合は
            <Link href="/resend-confirmation" className="border-b">
              こちら
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
