import ProfileCard from '@/components/shared/profile-card';
import { createClient } from '@/lib/supabase/server';
import { requireStaff } from '@/lib/utils/requireStaff';
import PeriodSelector from './components/period-selector';
import { ExistingEvaluation } from '../../../../types/evaluations';

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

  return (
    <div className="mt-20 max-w-7xl mx-auto w-full py-6 px-4 space-y-6">
      <ProfileCard profile={profile} />
      <PeriodSelector evaluationPeriods={evaluationPeriods} />
    </div>
  );
}
