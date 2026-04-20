import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StaffList from './components/staff-list';
import StaffAddDialog from './components/staff-add-dialog';
import { createClient } from '@/lib/supabase/server';
import BackPageLink from '@/components/shared/back-page-link';
import AdminContainer from '../components/admin-contaimer';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import { redirect } from 'next/navigation';

export default async function StaffManagementPage() {
  const supabase = await createClient();

  const { orgId } = await requireAdmin(supabase);

  const { data: staffs, error: staffsError } = await supabase
    .from('profiles')
    .select('id, name, role, store_name, avatar_url, email')
    .eq('organization_id', orgId)
    .eq('role', 'staff');

  if (staffsError) redirect('/admin');

  const { data: selectedPeriod, error: selectedPeriodError } = await supabase
    .from('evaluation_periods')
    .select('id')
    .eq('organization_id', orgId)
    .eq('is_current', true)
    .maybeSingle();

  if (selectedPeriodError) redirect('/admin');

  const { data: existingEvaluations, error: exisgintError } = selectedPeriod
    ? await supabase
        .from('evaluations')
        .select(
          `
    id,
    staff_id,
      evaluation_sections (
        section_type,
        skill_score,
          skill_max,
          hospitality_score,
          hospitality_max,
          cleanliness_score,
          cleanliness_max
      )
    `
        )
        .eq('organization_id', orgId)
        .eq('evaluation_period_id', selectedPeriod.id)
        .eq('status', 'completed')
    : { data: [], error: null };

  if (exisgintError) throw new Error('評価データの取得に失敗しました');

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
          <StaffList
            staffs={staffs ?? []}
            selectedPeriod={selectedPeriod}
            existingEvaluations={existingEvaluations ?? []}
          />
        </CardContent>
      </Card>
    </AdminContainer>
  );
}
