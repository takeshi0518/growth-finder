import Link from 'next/link';
import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StaffList from './components/staff-list';
import StaffAddDialog from './components/staff-add-dialog';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import BackPageLink from '@/components/shared/back-page-link';

export default async function StaffManagementPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();

  const { data: staffs } = await supabase
    .from('profiles')
    .select('id, name, role, store_name, avatar_url, email')
    .eq('organization_id', adminProfile?.organization_id ?? '')
    .eq('role', 'staff');

  return (
    <div className="mt-20 md:mt-0 max-w-7xl mx-auto w-full py-6 px-4 space-y-6">
      <BackPageLink href="/admin" label="ダッシュボードへ戻る" />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icons.Users className="w-5 h-5" />
            スタッフ管理
          </CardTitle>
          <StaffAddDialog />
        </CardHeader>

        <CardContent className="space-y-6">
          <StaffList staffs={staffs ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}
