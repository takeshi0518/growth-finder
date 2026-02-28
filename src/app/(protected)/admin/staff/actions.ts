'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { AddStaffInput, addStaffSchema } from '@/lib/validations/schemas';

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
    .select('organization_id')
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
    },
  });

  if (error) throw new Error('スタッフの登録に失敗しました');
}
