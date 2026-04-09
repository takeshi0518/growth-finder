import BackPageLink from '@/components/shared/back-page-link';
import StaffProfile from '../components/staff-profile';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminContainer from '../../components/admin-contaimer';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import StaffEvaluationSection from '../components/staff-evaluation-section';
import { ExistingEvaluation } from '../../../../../../types/evaluations';
import { Icons } from '@/components/icon/icons';

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
    .eq('organization_id', orgId)
    .single();
  if (targetStaffError || !targetStaff) redirect('/admin/staff');

  const { data: selectedPeriod, error } = await supabase
    .from('evaluation_periods')
    .select('id, name')
    .eq('organization_id', orgId)
    .eq('is_current', true)
    .maybeSingle();
  if (error) throw new Error('評価期間の取得に失敗しました');

  const { data: targetEvaluation } = selectedPeriod
    ? ((await supabase
        .from('evaluations')
        .select(
          `
        id,
        status,
        action_plan,
        total_comment,
        future_vision,
            evaluation_sections (
            id,
            section_type,
            good_points,
            improvement_points,
            skill_score,
            skill_max,
            hospitality_score,
            hospitality_max,
            cleanliness_score,
            cleanliness_max,
              evaluation_items (
                item_name,
                category,
                score
          )
        )
      `
        )
        .eq('staff_id', staffId)
        .eq('evaluation_period_id', selectedPeriod.id)
        .eq('organization_id', orgId)
        .single()) as { data: ExistingEvaluation | null; error: unknown })
    : { data: null };

  return (
    <AdminContainer>
      <BackPageLink href="/admin/staff" label="スタッフ一覧に戻る" />
      <StaffProfile targetStaff={targetStaff} staffId={staffId} />
      {selectedPeriod ? (
        <StaffEvaluationSection selectedPeriod={selectedPeriod} />
      ) : (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icons.CircleAlert />
          評価期間が設定されていません
        </p>
      )}
    </AdminContainer>
  );
}
