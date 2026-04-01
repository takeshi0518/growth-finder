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
import {
  Category,
  FormattedEvaluation,
  SectionType,
} from '../../../../../../../types/evaluations';
import { SectionData } from '@/lib/validations/schemas';

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

  const { data: existingEvaluation, error: evaluationError } = await supabase
    .from('evaluations')
    .select(
      `
        id,
        action_plan,
          total_comment,
          future_vision,
        evaluation_sections (
          id,
          section_type,
          good_points,
          improvement_points,
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
    .single();

  if (!existingEvaluation) throw new Error('評価の取得に失敗しました');

  const formattedEvaluationData = existingEvaluation.evaluation_sections.reduce(
    (acc, cur) => {
      acc[cur.section_type as SectionType] = {
        ...cur.evaluation_items.reduce((acc, cur) => {
          if (!acc[cur.category as Category])
            acc[cur.category as Category] = {};
          acc[cur.category as Category][cur.item_name] = cur.score ?? 0;

          return acc;
        }, {} as SectionData),
        good_points: (cur.good_points ?? []) as string[],
        improvement_points: (cur.improvement_points ?? []) as string[],
      };
      return acc;
    },
    {} as FormattedEvaluation
  );
  return (
    <AdminContainer>
      <BackPageLink href="/admin/staff" label="スタッフ一覧へ戻る" />
      <ProfileCard profile={staffProfile} />
      <EvaluationForm
        staffId={staffId}
        periodId={periodId}
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
