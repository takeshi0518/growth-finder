import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icon/icons';
import SettingForm from './setting-form';
import PasswordForm from './password-form';
import { createClient } from '@/lib/supabase/server';
import BackPageLink from '@/components/shared/back-page-link';
import AdminContainer from '../components/admin-contaimer';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import DemoRestricted from '@/components/shared/demo-restricted';

export default async function SettingPage() {
  const supabase = await createClient();

  const { user, profile } = await requireAdmin(supabase);

  const isOAuthUser = user?.app_metadata?.provider === 'google';

  return (
    <AdminContainer>
      <BackPageLink href="/admin" label="ダッシュボードへ戻る" />
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <Card className="lg:flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.UserRoundPen />
              プロフィール
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DemoRestricted isDemo={profile.is_demo ?? false}>
              <SettingForm profile={profile} />
            </DemoRestricted>
          </CardContent>
        </Card>

        <Card className="lg:flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.KeyRound />
              パスワード
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DemoRestricted isDemo={profile.is_demo ?? false}>
              <PasswordForm isOAuthUser={isOAuthUser} />
            </DemoRestricted>
          </CardContent>
        </Card>
      </div>
    </AdminContainer>
  );
}
