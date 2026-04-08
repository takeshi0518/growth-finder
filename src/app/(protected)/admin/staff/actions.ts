'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/utils/requireAdmin';
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

  const { profile: adminProfile, orgId } = await requireAdmin(supabase);

  const validated = addStaffSchema.safeParse(data);
  if (!validated.success) throw new Error('入力内容を確認してください');

  const { error } = await supabaseAdmin.auth.admin.createUser({
    email: validated.data.email,
    password: validated.data.password,
    email_confirm: true,
    user_metadata: {
      name: validated.data.name,
      role: 'staff',
      organization_id: orgId,
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

  const { orgId } = await requireAdmin(supabase);

  const { data: staff, error: staffError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', staffId)
    .eq('organization_id', orgId)
    .single();

  if (staffError || !staff) throw new Error('スタッフが見つかりません');

  const { error } = await supabaseAdmin.auth.admin.deleteUser(staffId);
  if (error) throw new Error('スタッフの削除に失敗しました');

  revalidatePath('/admin/staff');
}

export async function editStaff(data: EditStaffInput, staffId: string) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const { orgId } = await requireAdmin(supabase);

  const validated = editStaffSchema.safeParse(data);
  if (!validated.success) throw new Error('入力内容を確認してください');

  const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
    staffId,
    { email: validated.data.email }
  );
  if (authError) throw new Error('メールアドレスの更新に失敗しました');

  const { error } = await supabase
    .from('profiles')
    .update({
      name: validated.data.name,
      email: validated.data.email,
    })
    .eq('organization_id', orgId)
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

  const { orgId } = await requireAdmin(supabase);

  const { data: staff, error: staffError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', staffId)
    .eq('organization_id', orgId)
    .single();

  if (staffError || !staff) throw new Error('スタッフが見つかりません');

  const validated = editStaffPasswordSchema.safeParse(data);
  if (!validated.success) throw new Error('入力内容を確認してください');

  const { error } = await supabaseAdmin.auth.admin.updateUserById(staffId, {
    password: validated.data.password,
  });

  if (error) throw new Error('パスワードの更新に失敗しました');
}
