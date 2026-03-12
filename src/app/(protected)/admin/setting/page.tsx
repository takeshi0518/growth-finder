import { redirect } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icon/icons';
import SettingForm from './setting-form';
import PasswordForm from './password-form';
import { createClient } from '@/lib/supabase/server';
import BackPageLink from '@/components/shared/back-page-link';

export default async function SettingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const isOAuthUser = user?.app_metadata?.provider === 'google';
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, store_name, email, avatar_url')
    .eq('id', user.id)
    .single();

  return (
    <div className="mt-20 md:mt-0 max-w-7xl mx-auto w-full py-6 px-4 space-y-6">
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
            <SettingForm profile={profile} userId={user.id} />
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
    </div>
  );
}
