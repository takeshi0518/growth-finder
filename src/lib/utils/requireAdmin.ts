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

  if (!profile || profile.role !== 'admin') {
    throw new Error('この操作を行う権限がありません');
  }

  return { user, profile };
}
