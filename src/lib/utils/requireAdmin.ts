import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../types/supabase';

export async function requireAdmin(supabase: SupabaseClient<Database>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('認証エラーが発生しました');

  const { data: profile } = await supabase
    .from('profiles')
    .select('store_name, role, organization_id')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin' || !profile.organization_id) {
    throw new Error('この操作を行う権限または、組織設定がありません');
  }

  //organization_idはnullチェック済みのためstring型にアサーション
  const orgId = profile.organization_id as string;

  return { user, profile, orgId };
}
