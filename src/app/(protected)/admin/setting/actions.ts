'use server';

import { createClient } from "@/lib/supabase/server";
import { UpdateProfileInput, updateProfileSchema } from "@/lib/validations/auth";

export async function updateProfile(data: UpdateProfileInput) {
  const supabase = await createClient();

  const validated = updateProfileSchema.safeParse(data);
  if (!validated.success) {
    return {error: '入力内容を確認してください'}
  }

  const {data: {user}} = await supabase.auth.getUser();
  if (!user) return {error: '認証エラーが発生しました'};

  if ()

}