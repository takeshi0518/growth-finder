import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StaffList from './components/staff-list';
import StaffAddDialog from './components/staff-add-dialog';
import { createClient } from '@/lib/supabase/server';
import BackPageLink from '@/components/shared/back-page-link';
import AdminContainer from '../components/admin-contaimer';
import { requireAdmin } from '@/lib/utils/requireAdmin';

export default async function StaffManagementPage() {
  const supabase = await createClient();

  const { orgId } = await requireAdmin(supabase);

  const { data: staffs } = await supabase
    .from('profiles')
    .select('id, name, role, store_name, avatar_url, email')
    .eq('organization_id', orgId)
    .eq('role', 'staff');

  const { data: selectedPeriod } = await supabase
    .from('evaluation_periods')
    .select('id')
    .eq('organization_id', orgId)
    .eq('is_current', true)
    .maybeSingle();

  return (
    <AdminContainer>
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
          <StaffList staffs={staffs ?? []} selectedPeriod={selectedPeriod} />
        </CardContent>
      </Card>
    </AdminContainer>
  );
}
