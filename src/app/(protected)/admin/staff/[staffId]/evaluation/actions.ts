'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import {
  EvaluationInput,
  evaluationSchema,
  SectionData,
} from '@/lib/validations/schemas';
import { SectionType } from '../../../../../../../types/evaluations';

const calcScore = (scores: Record<string, number>) =>
  Object.values(scores).reduce((sum, score) => sum + score, 0);

const calcMax = (scores: Record<string, number>) =>
  Object.keys(scores).length * 4;

export async function addEvaluations(
  data: EvaluationInput,
  staffId: string,
  periodId: string
) {
  const supabase = await createClient();

  const { orgId, user } = await requireAdmin(supabase);

  const validated = evaluationSchema.safeParse(data);
  if (!validated.success) throw new Error('入力内容を確認してください');

  const { data: evaluation, error: evaluationError } = await supabase
    .from('evaluations')
    .upsert({
      organization_id: orgId,
      evaluation_period_id: periodId,
      staff_id: staffId,
      evaluator_id: user.id,
      evaluation_date: new Date().toISOString().split('T')[0],
      status: 'completed',
      action_plan: data.action_plan,
      total_comment: data.total_comment,
      future_vision: data.future_vision,
    })
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
    good_points: Object.values(sectionData.good_points).flat(),
    improvement_points: Object.values(sectionData.improvement_points).flat(),
  });

  const sections = [
    createSections('basic', validated.data.basic),
    createSections('barista', validated.data.barista),
    createSections('cashier', validated.data.cashier),
  ];

  const { data: evaluationSections, error: sectionsError } = await supabase
    .from('evaluation_sections')
    .upsert(sections)
    .select('id, section_type');

  if (sectionsError) throw new Error('セクションの登録に失敗しました');
}
