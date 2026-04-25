import ProfileCard from '@/components/shared/profile-card';
import { createClient } from '@/lib/supabase/server';
import { requireStaff } from '@/lib/utils/requireStaff';
import PeriodSelector from './components/period-selector';
import { ExistingEvaluation } from '../../../../types/evaluations';
import { formatChartData } from '@/lib/utils/evaluation-format';
import { Icons } from '@/components/icon/icons';
import StaffEvaluationSection from '@/components/evaluation/staff-evaluation-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function StaffPage({
  searchParams,
}: {
  searchParams: Promise<{ periodId?: string }>;
}) {
  const { periodId } = await searchParams;
  const supabase = await createClient();

  const { profile, orgId, user } = await requireStaff(supabase);

  const { data: evaluationPeriods, error: periodError } = await supabase
    .from('evaluation_periods')
    .select('id, name')
    .eq('organization_id', orgId);
  if (periodError || !evaluationPeriods) return;

  const selectedPeriod = evaluationPeriods.find(
    (period) => period.id === periodId
  );

  const { data: targetEvaluation } = periodId
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
        .eq('staff_id', user.id)
        .eq('evaluation_period_id', periodId)
        .eq('organization_id', orgId)
        .single()) as { data: ExistingEvaluation | null; error: unknown })
    : { data: null };

  const { data } = await supabase
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
    .eq('evaluations.staff_id', user.id)
    .order('created_at', { ascending: true })
    .limit(4);

  const chartData = formatChartData(data ?? []);

  return (
    <div className="mt-20 max-w-7xl mx-auto w-full py-6 px-4 space-y-6">
      <ProfileCard profile={profile} />
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2">
            <Icons.MousePointer className="w-5 h-5" />
            評価期間を選択
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PeriodSelector evaluationPeriods={evaluationPeriods} />
        </CardContent>
      </Card>
      {!selectedPeriod ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icons.CircleAlert />
          評価期間が選択されていません
        </p>
      ) : !targetEvaluation ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icons.CircleAlert />
          まだ評価が登録されていません
        </p>
      ) : (
        <StaffEvaluationSection
          selectedPeriod={selectedPeriod}
          targetEvaluation={targetEvaluation}
          chartData={chartData}
        />
      )}
    </div>
  );
}
