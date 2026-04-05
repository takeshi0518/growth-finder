'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import {
  EvaluationInput,
  evaluationSchema,
  SectionData,
} from '@/lib/validations/schemas';
import {
  Category,
  EvaluationItemConstant,
  SectionType,
} from '../../../../../../../types/evaluations';
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

const getSectionId = (
  sections: { id: string; section_type: string }[],
  sectionType: SectionType
) => {
  const section = sections.find((s) => s.section_type === sectionType);
  if (!section) throw new Error(`セクションが見つかりません`);
  return section.id;
};

const calcScore = (scores: Record<string, number>) =>
  Object.values(scores).reduce((sum, score) => sum + score, 0);

const calcMax = (scores: Record<string, number>) =>
  Object.keys(scores).length * 4;

const upsertEvaluations = async (
  data: EvaluationInput,
  staffId: string,
  periodId: string,
  status: 'draft' | 'completed'
) => {
  const supabase = await createClient();

  const { orgId, user } = await requireAdmin(supabase);

  const validated = evaluationSchema.safeParse(data);
  if (!validated.success) throw new Error('入力内容を確認してください');

  const { data: evaluation, error: evaluationError } = await supabase
    .from('evaluations')
    .upsert(
      {
        organization_id: orgId,
        evaluation_period_id: periodId,
        staff_id: staffId,
        evaluator_id: user.id,
        evaluation_date: new Date().toISOString().split('T')[0],
        status,
        action_plan: validated.data.action_plan,
        total_comment: validated.data.total_comment,
        future_vision: validated.data.future_vision,
      },
      { onConflict: 'staff_id,evaluation_period_id' }
    )
    .select('id')
    .single();
  if (evaluationError) throw new Error('評価の登録に失敗しました');

  const createSections = (
    sectionType: SectionType,
    sectionData: SectionData
  ) => ({
    evaluation_id: evaluation.id,
    organization_id: orgId,
    section_type: sectionType,
    skill_score: calcScore(sectionData.skill),
    skill_max: calcMax(sectionData.skill),
    hospitality_score: calcScore(sectionData.hospitality),
    hospitality_max: calcMax(sectionData.hospitality),
    cleanliness_score: calcScore(sectionData.cleanliness),
    cleanliness_max: calcMax(sectionData.cleanliness),
    good_points: sectionData.good_points,
    improvement_points: sectionData.improvement_points,
  });

  const sections = [
    createSections('basic', validated.data.basic),
    createSections('barista', validated.data.barista),
    createSections('cashier', validated.data.cashier),
  ];

  const { data: evaluationSections, error: sectionsError } = await supabase
    .from('evaluation_sections')
    .upsert(sections, { onConflict: 'evaluation_id,section_type' })
    .select('id, section_type');

  if (sectionsError) throw new Error('セクションの登録に失敗しました');

  const basicSectionId = getSectionId(evaluationSections, 'basic');
  const baristaSectionId = getSectionId(evaluationSections, 'barista');
  const cashierSectionId = getSectionId(evaluationSections, 'cashier');

  const createItems = (
    itemLists: EvaluationItemConstant[],
    sectionId: string,
    sectionType: SectionType,
    category: Category
  ) =>
    itemLists.map((item) => ({
      evaluation_section_id: sectionId,
      organization_id: orgId,
      item_name: item.item_name,
      category: item.category,
      check_points: item.check_points,
      score: validated.data[sectionType][category][item.item_name],
    }));

  const items = [
    ...createItems(BASIC_SKILL_ITEMS, basicSectionId, 'basic', 'skill'),
    ...createItems(
      BASIC_CLEANLINESS_ITEMS,
      basicSectionId,
      'basic',
      'cleanliness'
    ),
    ...createItems(
      BASIC_HOSPITALITY_ITEMS,
      basicSectionId,
      'basic',
      'hospitality'
    ),
    ...createItems(BARISTA_SKILL_ITEMS, baristaSectionId, 'barista', 'skill'),
    ...createItems(
      BARISTA_CLEANLINESS,
      baristaSectionId,
      'barista',
      'cleanliness'
    ),
    ...createItems(
      BARISTA_HOSPITALITY_ITEMS,
      baristaSectionId,
      'barista',
      'hospitality'
    ),
    ...createItems(CASHIER_SKILL_ITEMS, cashierSectionId, 'cashier', 'skill'),
    ...createItems(
      CASHIER_CLEANLINESS,
      cashierSectionId,
      'cashier',
      'cleanliness'
    ),
    ...createItems(
      CASHIER_HOSPITALITY_ITEMS,
      cashierSectionId,
      'cashier',
      'hospitality'
    ),
  ];

  const { error: itemsError } = await supabase
    .from('evaluation_items')
    .upsert(items, { onConflict: 'evaluation_section_id,item_name' });

  if (itemsError) throw new Error('評価項目の登録に失敗しました');
};

export async function addEvaluations(
  data: EvaluationInput,
  staffId: string,
  periodId: string
) {
  await upsertEvaluations(data, staffId, periodId, 'completed');
}

export async function saveDraft(
  draftEvaluations: EvaluationInput,
  staffId: string,
  periodId: string
) {
  await upsertEvaluations(draftEvaluations, staffId, periodId, 'draft');
}
