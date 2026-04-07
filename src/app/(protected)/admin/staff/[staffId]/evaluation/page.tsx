import BackPageLink from '@/components/shared/back-page-link';
import AdminContainer from '../../../components/admin-contaimer';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import ProfileCard from '@/components/shared/profile-card';
import EvaluationForm from './components/evaluation-form';
import {
  BARISTA_CLEANLINESS,
  BARISTA_HOSPITALITY_ITEMS,
  BARISTA_SKILL_ITEMS,
  BASIC_CLEANLINESS_ITEMS,
  BASIC_HOSPITALITY_ITEMS,
  BASIC_SKILL_ITEMS,
  CASHIER_CLEANLINESS,
  CASHIER_HOSPITALITY_ITEMS,
  CASHIER_SKILL_ITEMS,
} from '@/lib/constants/evaluation-items';
import { formatEvaluationData } from './utils';
import { ExistingEvaluation } from '../../../../../../../types/evaluations';

type EvaluationPageProps = {
  params: { staffId: string };
  searchParams: { periodId: string };
};

export default async function EvaluationPage({
  params,
  searchParams,
}: EvaluationPageProps) {
  const { staffId } = await params;
  const { periodId } = await searchParams;

  const supabase = await createClient();

  const { orgId } = await requireAdmin(supabase);

  const { data: staffProfile, error } = await supabase
    .from('profiles')
    .select('name, store_name, role, email, avatar_url')
    .eq('organization_id', orgId)
    .eq('id', staffId)
    .single();
  if (error) throw new Error('スタッフ情報の取得に失敗しました');

  const { data: existingEvaluation } = (await supabase
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
    .eq('evaluation_period_id', periodId)
    .eq('organization_id', orgId)
    //DBのCHECK制約によりsection_typeはSectionTypeのいずれかであることが保証されている
    .single()) as { data: ExistingEvaluation | null; error: unknown };

  const formattedEvaluationData = existingEvaluation
    ? formatEvaluationData(existingEvaluation)
    : null;

  const existingComment = {
    action_plan: existingEvaluation?.action_plan ?? '',
    total_comment: existingEvaluation?.total_comment ?? '',
    future_vision: existingEvaluation?.future_vision ?? '',
  };

  return (
    <AdminContainer>
      <BackPageLink href="/admin/staff" label="スタッフ一覧へ戻る" />
      <ProfileCard profile={staffProfile} />
      <EvaluationForm
        staffId={staffId}
        periodId={periodId}
        existingEvaluations={existingEvaluation}
        existingComments={existingComment}
        existingEvaluationData={formattedEvaluationData}
        basicSkillItems={BASIC_SKILL_ITEMS}
        basicHospitalityItems={BASIC_HOSPITALITY_ITEMS}
        basicCleanlinessItems={BASIC_CLEANLINESS_ITEMS}
        cashierSkillItems={CASHIER_SKILL_ITEMS}
        cashierHospitalityItems={CASHIER_HOSPITALITY_ITEMS}
        cashierCleanlinessItems={CASHIER_CLEANLINESS}
        baristaSkillItems={BARISTA_SKILL_ITEMS}
        baristaHospitalityItems={BARISTA_HOSPITALITY_ITEMS}
        baristaCleanliness={BARISTA_CLEANLINESS}
      />
    </AdminContainer>
  );
}
