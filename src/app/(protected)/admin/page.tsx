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
import { Icons } from '@/components/icon/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function AdminPage() {
  const supabase = await createClient();

  const { orgId, profile } = await requireAdmin(supabase);

  const [
    { data: staffs, error: staffError },
    { data: evaluationPeriods, error: periodsError },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, name, role, store_name, avatar_url, email')
      .eq('organization_id', orgId)
      .eq('role', 'staff'),
    supabase
      .from('evaluation_periods')
      .select('id, name, is_current')
      .eq('organization_id', orgId),
  ]);

  if (staffError) redirect('/admin');
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
    status,
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
    totalEvaluations
      ?.filter((evaluation) => evaluation.status === 'completed')
      .flatMap((v) => v.evaluation_sections) ?? [];
  const totalEvaluation = calcEvaluation(allSections);
  const formattedData = formatCategoryRates(
    totalEvaluation.skillRate,
    totalEvaluation.hospitalityRate,
    totalEvaluation.cleanlinessRate
  );

  const completedStaffLists = staffs.filter((staff) =>
    totalEvaluations?.some(
      (evaluation) =>
        evaluation.staff_id === staff.id && evaluation.status === 'completed'
    )
  );

  const draftStaffLists = staffs.filter((staff) =>
    totalEvaluations?.some(
      (evaluation) =>
        evaluation.staff_id === staff.id && evaluation.status === 'draft'
    )
  );

  const notStartedStaffLists = staffs.filter(
    (staff) =>
      !totalEvaluations?.some((evaluation) => evaluation.staff_id === staff.id)
  );

  const totalStaffs = staffs.length;
  const completedStaffs = completedStaffLists.length;
  const draftStaffs = draftStaffLists.length;
  const notStartedStaffs = notStartedStaffLists.length;

  const progressRate =
    totalStaffs > 0 ? Math.round((completedStaffs / totalStaffs) * 100) : 0;

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
      {totalStaffs > 0 ? (
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
          completedStaffs={completedStaffs}
          notStartedStaffs={notStartedStaffs}
          draftStaffs={draftStaffs}
          unevaluatedStaffLists={notStartedStaffLists}
          draftStaffLists={draftStaffLists}
          label="評価"
        />
      ) : (
        <div className="flex flex-col items-center gap-5 rounded-xl border bg-primary-foreground p-20 text-center">
          <div className="flex items-center gap-2">
            <Icons.AlertCircle className="w-5 h-5" />
            <p className="text-muted-foreground">スタッフがいません</p>
          </div>
          <Button asChild>
            <Link href="/admin/staff">スタッフ一覧へ</Link>
          </Button>
        </div>
      )}
    </AdminContainer>
  );
}
