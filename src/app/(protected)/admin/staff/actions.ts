'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import {
  AddStaffInput,
  addStaffSchema,
  EditStaffInput,
  EditStaffPasswordInput,
  editStaffPasswordSchema,
  editStaffSchema,
} from '@/lib/validations/schemas';
import { revalidatePath } from 'next/cache';

export async function addStaff(data: AddStaffInput) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const validated = addStaffSchema.safeParse(data);
  if (!validated.success) throw new Error('入力内容を確認してください');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('認証エラーが発生しました');

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('organization_id, store_name')
    .eq('id', user.id)
    .single();
  if (!adminProfile?.organization_id) {
    throw new Error('組織情報の取得に失敗しました');
  }

  const { error } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      name: data.name,
      role: 'staff',
      organization_id: adminProfile.organization_id,
      store_name: adminProfile.store_name,
      is_setup_complete: true,
    },
  });

  if (error) throw new Error('スタッフの登録に失敗しました');

  revalidatePath('/admin/staff');
}

export async function deleteStaff(staffId: string) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('認証エラーが発生しました');

  const { error } = await supabaseAdmin.auth.admin.deleteUser(staffId);
  if (error) throw new Error('スタッフの削除に失敗しました');

  revalidatePath('/admin/staff');
}

export async function editStaff(data: EditStaffInput, staffId: string) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const validated = editStaffSchema.safeParse(data);
  if (!validated.success) throw new Error('入力内容を確認してください');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('認証エラーが発生しました');

  const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
    staffId,
    { email: data.email }
  );
  if (authError) throw new Error('メールアドレスの更新に失敗しました');

  const { error } = await supabase
    .from('profiles')
    .update({
      name: data.name,
      email: data.email,
    })
    .eq('id', staffId);

  if (error) throw new Error('スタッフの更新に失敗しました');

  revalidatePath('/admin/staff');
}

export async function editStaffPassword(
  staffId: string,
  data: EditStaffPasswordInput
) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const validated = editStaffPasswordSchema.safeParse(data);
  if (!validated.success) throw new Error('入力内容を確認してください');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('認証エラーが発生しました');

  const { error } = await supabaseAdmin.auth.admin.updateUserById(staffId, {
    password: data.password,
  });

  if (error) throw new Error('パスワードの更新に失敗しました');
}
