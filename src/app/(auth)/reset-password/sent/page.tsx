import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icon/icons';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ResetPasswordSentPage() {
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
        <CardTitle className="text-2xl md:text-3xl">
          メールを確認してください
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            パスワードリセット用のメールを送信しました
          </p>
          <p className="text-sm text-muted-foreground">
            メール内のリンクをクリックして、新しいパスワードを設定してください
          </p>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            メールが届かない場合は迷惑メールフォルダを確認ください
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button asChild size="lg">
          <Link href="/login">ログインページへ</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
