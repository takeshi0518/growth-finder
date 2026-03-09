'use server';

import { createClient } from '@/lib/supabase/server';
import {
  CreateEvaluationPeriodInput,
  createEvaluationPeriodSchema,
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
    name: data.name,
    is_current: true,
    organization_id: adminProfile.organization_id!,
  });
  if (error) throw new Error('評価期間の作成に失敗しました');

  revalidatePath('/admin');
}
