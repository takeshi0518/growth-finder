'use server';

import { createClient } from '@/lib/supabase/server';
import {
  UpdatePasswordInput,
  updatePasswordSchema,
  UpdateProfileInput,
  updateProfileSchema,
} from '@/lib/validations/auth';

export async function updateProfile(data: UpdateProfileInput) {
  const supabase = await createClient();

  const validated = updateProfileSchema.safeParse(data);
  if (!validated.success) {
    return { error: '入力内容を確認してください' };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: '認証エラーが発生しました' };

  if (data.email !== user.email) {
    const { error } = await supabase.auth.updateUser({ email: data.email });
    if (error) return { error: 'メールアドレスの更新に失敗しました' };
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      name: data.name,
      store_name: data.storeName,
      email: data.email,
    })
    .eq('id', user.id);

  if (error) return { error: 'プロフィールの更新に失敗しました' };

  return { success: true };
}

export async function updatePassword(data: UpdatePasswordInput) {
  const supabase = await createClient();

  const validated = updatePasswordSchema.safeParse(data);
  if (!validated.success) {
    return { error: '入力内容を確認してください' };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return { error: '認証エラーが発生しました' };

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: data.currentPassword,
  });
  if (signInError) return { error: '現在のパスワードが正しくありません' };

  const { error } = await supabase.auth.updateUser({
    password: data.password,
  });

  if (error) return { error: 'パスワードの更新に失敗しました' };

  return { success: true };
}