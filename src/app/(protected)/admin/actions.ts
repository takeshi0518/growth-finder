'use server';

import { createClient } from '@/lib/supabase/server';
import {
  CreateEvaluationPeriodInput,
  createEvaluationPeriodSchema,
  EditEvaluationPeriodInput,
  editEvaluationPeriodSchema,
} from '@/lib/validations/schemas';
import { revalidatePath } from 'next/cache';

export async function createEvaluationPeriod(
  data: CreateEvaluationPeriodInput
) {
  const supabase = await createClient();

  const validated = createEvaluationPeriodSchema.safeParse(data);
  if (!validated.success) throw new Error('入力内容を確認してください');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('認証エラーが発生しました');

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();
  if (!adminProfile) throw new Error('組織情報の取得に失敗しました');

  const { error } = await supabase.from('evaluation_periods').insert({
    name: validated.data.name,
    organization_id: adminProfile.organization_id!,
  });
  if (error) throw new Error('評価期間の作成に失敗しました');

  revalidatePath('/admin');
}

export async function deleteEvaluationPeriod(evaluationId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('認証エラーが発生しました');

  const { error } = await supabase
    .from('evaluation_periods')
    .delete()
    .eq('id', evaluationId);

  if (error) throw new Error('評価期間の削除に失敗しました');

  revalidatePath('/admin');
}

export async function editEvaluationPeriod(
  data: EditEvaluationPeriodInput,
  evaluationPeriodId: string
) {
  const supabase = await createClient();

  const validated = editEvaluationPeriodSchema.safeParse(data);
  if (!validated.success) throw new Error('入力内容を確認してください');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('認証エラーが発生しました');

  const { error } = await supabase
    .from('evaluation_periods')
    .update({
      name: validated.data.name,
    })
    .eq('id', evaluationPeriodId);

  if (error) throw new Error('評価期間の更新に失敗しました');

  revalidatePath('/admin');
}
