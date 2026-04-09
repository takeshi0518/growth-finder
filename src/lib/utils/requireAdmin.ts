import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../types/supabase';

export async function requireAdmin(supabase: SupabaseClient<Database>) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('認証エラーが発生しました');

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('store_name, role, organization_id, email, avatar_url, name')
    .eq('id', user.id)
    .single();

  if (profileError) throw new Error('プロフィールの取得に失敗しました');

  const organizationId = profile?.organization_id;

  if (!profile || profile.role !== 'admin' || !organizationId) {
    throw new Error('この操作を行う権限または、組織設定がありません');
  }

  const orgId = organizationId;

  return { user, profile, orgId };
}
