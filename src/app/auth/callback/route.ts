import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (!code) {
    return NextResponse.redirect(new URL('_login', origin));
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL('/login?error=oauth', origin));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error('No User found after OAuth');
    return NextResponse.redirect(new URL('login?=error=no_user', origin));
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_setup_complete')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('Profile fetch error:', profileError);
    return NextResponse.redirect(new URL('/login?error=profile', origin));
  }

  if (!profile?.is_setup_complete) {
    return NextResponse.redirect(new URL('/setup', origin));
  }

  return NextResponse.redirect(new URL('/admin', request.url));
}
