import { redirect } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icon/icons';
import SettingForm from './setting-form';
import PasswordForm from './password-form';
import { createClient } from '@/lib/supabase/server';
import BackPageLink from '@/components/shared/back-page-link';
import AdminContainer from '../components/admin-contaimer';

export default async function SettingPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) redirect('/login');

  const isOAuthUser = user?.app_metadata?.provider === 'google';
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('name, store_name, email, avatar_url')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) redirect('/login');

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
            <SettingForm profile={profile} />
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
            <PasswordForm isOAuthUser={isOAuthUser} />
          </CardContent>
        </Card>
      </div>
    </AdminContainer>
  );
}
