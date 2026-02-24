import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icon/icons';
import SettingForm from './setting-form';
import PasswordForm from './password-form';

export default function SettingPage() {
  return (
    <div className="mt-20 md:mt-0 max-w-7xl mx-auto w-full py-6 px-4 space-y-6">
      <Link
        href="/admin"
        className="w-fit flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <Icons.Undo2 />
        <span>ダッシュボードへ戻る</span>
      </Link>

      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <Card className="md:flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.UserRoundPen />
              プロフィール
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SettingForm />
          </CardContent>
        </Card>

        <Card className="md:flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.KeyRound />
              パスワード
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
