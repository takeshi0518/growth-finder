import BackPageLink from '@/components/shared/back-page-link';
import StaffProfile from '../components/staff-profile';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminContainer from '../../components/admin-contaimer';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import StaffEvaluationSection from '../components/staff-evaluation-section';

type StaffDetailPageProps = {
  params: { staffId: string };
};

export default async function StaffDetailPage({
  params,
}: StaffDetailPageProps) {
  const { staffId } = await params;

  const supabase = await createClient();

  const { orgId } = await requireAdmin(supabase);

  const { data: targetStaff, error: targetStaffError } = await supabase
    .from('profiles')
    .select('name, store_name, role, email, avatar_url')
    .eq('id', staffId)
    .single();
  if (targetStaffError || !targetStaff) redirect('/admin/staff');

  const { data: selectedPeriod, error } = await supabase
    .from('evaluation_periods')
    .select('id, name')
    .eq('organization_id', orgId)
    .eq('is_current', true)
    .maybeSingle();
  if (error) throw new Error('評価期間の取得に失敗しました');

  return (
    <AdminContainer>
      <BackPageLink href="/admin/staff" label="スタッフ一覧に戻る" />
      <StaffProfile targetStaff={targetStaff} staffId={staffId} />
      <StaffEvaluationSection selectedPeriod={selectedPeriod} />
    </AdminContainer>
  );
}
