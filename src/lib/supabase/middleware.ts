import { createServerClient } from '@supabase/ssr';
import { User } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import type { Database } from '../../../types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  //セッションをリフレッシュ
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user, supabaseResponse, supabase };
}

export async function getUserRole(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<'admin' | 'staff' | null> {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Get role error: ', error);
    return null;
  }

  return profile?.role || null;
}

export async function isAdmin(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<boolean> {
  const role = await getUserRole(supabase, userId);
  return role === 'admin';
}

export async function isStaff(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<boolean> {
  const role = await getUserRole(supabase, userId);
  return role === 'staff';
}

export function isEmailConfirmed(user: User | null): boolean {
  if (!user) return false;

  return !!user.email_confirmed_at;
}
