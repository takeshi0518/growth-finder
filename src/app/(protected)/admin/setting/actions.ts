'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import {
  UpdatePasswordInput,
  updatePasswordSchema,
  UpdateProfileInput,
  updateProfileSchema,
} from '@/lib/validations/schemas';

export async function updateProfile(data: UpdateProfileInput) {
  const supabase = await createClient();

  const { user, orgId } = await requireAdmin(supabase);

  const validated = updateProfileSchema.safeParse(data);
  if (!validated.success) {
    throw new Error('入力内容を確認してください');
  }

  if (validated.data.email !== user.email) {
    const { error } = await supabase.auth.updateUser({
      email: validated.data.email,
    });
    if (error) throw new Error('メールアドレスの更新に失敗しました');
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      name: validated.data.name,
      store_name: validated.data.storeName,
      email: validated.data.email,
    })
    .eq('organization_id', orgId)
    .eq('id', user.id);

  if (error) throw new Error('プロフィールの更新に失敗しました');

  return { success: true };
}

export async function updatePassword(data: UpdatePasswordInput) {
  const supabase = await createClient();

  const { user } = await requireAdmin(supabase);

  const validated = updatePasswordSchema.safeParse(data);

  if (!validated.success) {
    throw new Error('入力内容を確認してください');
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: validated.data.currentPassword,
  });
  if (signInError) return { error: '現在のパスワードが正しくありません' };

  const { error } = await supabase.auth.updateUser({
    password: validated.data.password,
  });

  if (error) throw new Error('パスワードの更新に失敗しました');

  return { success: true };
}
