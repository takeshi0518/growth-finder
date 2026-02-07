import { Icons } from '@/components/icon/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function CompletePage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10">
            <Icons.CheckCircle className="text-primary w-8 h-8" />
          </div>
        </div>

        <CardTitle className="text-2xl md:text-3xl">
          パスワードを変更しました
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            パスワードの変更が完了しました
          </p>
          <p className="text-sm text-muted-foreground">
            新しいパスワードでログインしてください
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button asChild size="lg" className="w-full">
          <Link href="/login">ログインページへ</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
