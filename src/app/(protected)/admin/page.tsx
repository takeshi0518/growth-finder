import { createClient } from '@/lib/supabase/server';
import ProfileCard from '@/components/shared/profile-card';
import EvaluationPeriodList from './components/evaluation-period-list';
import AdminContainer from './components/admin-contaimer';
import EvaluationSection from './components/evaluation-section';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import { TotalEvaluations } from '../../../../types/evaluations';
import { redirect } from 'next/navigation';
import { calcEvaluation } from '@/lib/utils/evaluation-calc';
import { formatCategoryRates } from '@/lib/utils/evaluation-format';

export default async function AdminPage() {
  const supabase = await createClient();

  const { orgId, profile } = await requireAdmin(supabase);

  const { data: staffs, error: staffError } = await supabase
    .from('profiles')
    .select('id, name, role, store_name, avatar_url, email')
    .eq('organization_id', orgId)
    .eq('role', 'staff');
  if (staffError) redirect('/admin');

  const { data: evaluationPeriods, error: periodsError } = await supabase
    .from('evaluation_periods')
    .select('id, name, is_current')
    .eq('organization_id', orgId);

  if (periodsError || !evaluationPeriods) return;

  const currentEvaluationPeriod = evaluationPeriods.find(
    (period) => period.is_current
  );

  const { data: totalEvaluations } = currentEvaluationPeriod
    ? ((await supabase
        .from('evaluations')
        .select(
          `
    id,
    staff_id,
      evaluation_sections (
      id,
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
        .eq('evaluation_period_id', currentEvaluationPeriod.id)
        .eq('organization_id', orgId)) as {
        data: TotalEvaluations[] | null;
        error: unknown;
      })
    : { data: null };

  const allSections =
    totalEvaluations?.flatMap((v) => v.evaluation_sections) ?? [];
  const totalEvaluation = calcEvaluation(allSections);
  const formattedData = formatCategoryRates(
    totalEvaluation.skillRate,
    totalEvaluation.hospitalityRate,
    totalEvaluation.cleanlinessRate
  );

  const totalStaffs = staffs.length;
  const evaluatedStaffs = totalEvaluations?.length ?? 0;
  const progressRate =
    totalStaffs > 0 ? Math.round((evaluatedStaffs / totalStaffs) * 100) : 0;
  const unevaluatedStaffs = totalStaffs - evaluatedStaffs;
  const unevaluatedStaffLists = staffs.filter(
    (staff) =>
      !totalEvaluations?.some((evaluation) => evaluation.staff_id === staff.id)
  );

  return (
    <AdminContainer>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:min-w-80">
          <ProfileCard profile={profile} />
        </div>
        <EvaluationPeriodList
          isDemo={profile.is_demo ?? false}
          evaluationPeriods={evaluationPeriods}
        />
      </div>
      <EvaluationSection
        evaluationPeriods={evaluationPeriods}
        currentEvaluationPeriod={currentEvaluationPeriod}
        rank={totalEvaluation.rank}
        rate={totalEvaluation.rate}
        skillRate={totalEvaluation.skillRate}
        hospitalityRate={totalEvaluation.hospitalityRate}
        cleanlinessRate={totalEvaluation.cleanlinessRate}
        formattedData={formattedData}
        progressRate={progressRate}
        evaluatedStaffs={evaluatedStaffs}
        unevaluatedStaffs={unevaluatedStaffs}
        unevaluatedStaffLists={unevaluatedStaffLists}
        label="評価"
      />
    </AdminContainer>
  );
}
