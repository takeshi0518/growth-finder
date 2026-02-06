import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import NewPasswordForm from './new-password-form';

export default function NewPsswordPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">
          新しいパスワードを設定
        </CardTitle>
        <CardDescription>
          ８文字以上の英数字を含むパスワードを設定してください
        </CardDescription>
      </CardHeader>

      <CardContent>
        <NewPasswordForm />
      </CardContent>
    </Card>
  );
}
