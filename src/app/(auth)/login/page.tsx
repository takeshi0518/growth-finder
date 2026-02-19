import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/icon/icons';

import LoginForm from './login-form';
import { Alert, AlertDescription } from '@/components/ui/alert';

const errorMessage: Record<string, string> = {
  oauth_not_registered: 'アカウントが登録されていません',
  oauth_admin_only: 'Google ログインは管理者のみご利用いただけます。',
  oauth: '認証に失敗しました',
  no_user: 'ユーザー情報の取得に失敗しました',
  profile: 'プロフィール情報の取得に失敗しました',
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = params.error;
  return (
    <Card className="w-full max-w-md">
      {error && errorMessage[error] && (
        <Alert variant="destructive" className="border-0">
          <Icons.AlertCircle className="w-5 h-5" />
          <AlertDescription>{errorMessage[error]}</AlertDescription>
        </Alert>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">ログイン</CardTitle>
        <CardDescription>
          Growth Finderにログインして成長を可視化しましょう
        </CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
