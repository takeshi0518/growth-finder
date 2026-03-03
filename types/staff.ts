import { Tables } from './supabase';

export type Staff = Pick<
  Tables<'profiles'>,
  'id' | 'name' | 'role' | 'store_name' | 'avatar_url' | 'email'
>;
