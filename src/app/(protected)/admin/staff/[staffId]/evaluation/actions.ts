'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import { EvaluationInput, evaluationSchema } from '@/lib/validations/schemas';

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

  const calcScore = (scores: Record<string, number>) =>
    Object.values(scores).reduce((sum, score) => sum + score, 0);

  const calcMax = (scores: Record<string, number>) =>
    Object.keys(scores).length * 4;

  //Todo: 登録するsectionを配列で定義
}
