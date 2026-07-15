import BackPageLink from '@/components/shared/back-page-link';
import StaffProfile from '../components/staff-profile';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminContainer from '../../components/admin-contaimer';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import {
  ChartDataPoint,
  EvaluationPeriod,
  ExistingEvaluation,
  PeriodForChart,
} from '../../../../../../types/evaluations';
import { Icons } from '@/components/icon/icons';
import { formatChartData } from '@/lib/utils/evaluation-format';
import StaffEvaluationSection from '@/components/evaluation/staff-evaluation-section';

type StaffDetailPageProps = {
  params: { staffId: string };
};

type StaffEvaluationProps = {
  selectedPeriod?: EvaluationPeriod | null;
  targetEvaluation?: ExistingEvaluation | null;
  chartData: ChartDataPoint[];
  staffId: string;
  isDemo: boolean;
};

export default async function StaffDetailPage({
  params,
}: StaffDetailPageProps) {
  const { staffId } = await params;

  const supabase = await createClient();

  const { orgId, profile } = await requireAdmin(supabase);

  const [
    { data: targetStaff, error: targetStaffError },
    { data: selectedPeriod, error },
    chartRawResult,
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('name, store_name, role, email, avatar_url')
      .eq('id', staffId)
      .eq('organization_id', orgId)
      .single(),
    supabase
      .from('evaluation_periods')
      .select('id, name')
      .eq('organization_id', orgId)
      .eq('is_current', true)
      .maybeSingle(),
    supabase
      .from('evaluation_periods')
      .select(
        `
        id, name,
        evaluations!inner (
          evaluation_sections (
            section_type,
            skill_score,
            skill_max,
            hospitality_score,
            hospitality_max,
            cleanliness_score,
            cleanliness_max
          )
        )
        `
      )
      .eq('organization_id', orgId)
      .eq('evaluations.staff_id', staffId)
      .order('created_at', { ascending: true })
      .limit(4),
  ]);

  if (targetStaffError || !targetStaff) redirect('/admin/staff');
  if (error) throw new Error('評価期間の取得に失敗しました');

  const { data } = chartRawResult as {
    data: PeriodForChart[] | null;
    error: unknown;
  };

  const chartData = formatChartData(data ?? []);

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
      <StaffProfile
        isDemo={profile.is_demo ?? false}
        targetStaff={targetStaff}
        staffId={staffId}
      />

      <StaffEvaluation
        selectedPeriod={selectedPeriod}
        targetEvaluation={targetEvaluation}
        chartData={chartData}
        staffId={staffId}
        isDemo={profile.is_demo ?? false}
      />
    </AdminContainer>
  );
}

function StaffEvaluation({
  selectedPeriod,
  targetEvaluation,
  chartData,
  staffId,
  isDemo,
}: StaffEvaluationProps) {
  if (!selectedPeriod)
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icons.CircleAlert />
        評価期間が設定されていません
      </p>
    );

  if (!targetEvaluation)
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icons.CircleAlert />
        まだ評価が登録されていません
      </p>
    );

  if (targetEvaluation.status === 'draft')
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icons.CircleAlert />
        下書き中のため表示できません
      </p>
    );

  return (
    <StaffEvaluationSection
      selectedPeriod={selectedPeriod}
      targetEvaluation={targetEvaluation}
      chartData={chartData}
      staffId={staffId}
      showFeedbackGenerator={true}
      isDemo={isDemo}
    />
  );
}
