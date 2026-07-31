import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../types/supabase';

export async function requireRowInOrg(
  supabase: SupabaseClient<Database>,
  table: 'profiles' | 'evaluation_periods',
  id: string,
  orgId: string,
  errorMessage: string
) {
  const { data, error } = await supabase
    .from(table)
    .select('id')
    .eq('id', id)
    .eq('organization_id', orgId)
    .single();

  if (error || !data) throw new Error(errorMessage);
}
