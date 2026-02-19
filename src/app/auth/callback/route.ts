import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { toast } from 'sonner';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const intent = requestUrl.searchParams.get('intent');
  const origin = requestUrl.origin;

  if (!code) {
    return NextResponse.redirect(new URL('/login', origin));
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
    return NextResponse.redirect(new URL('/login?error=no_user', origin));
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_setup_complete, role')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('Profile fetch error:', profileError);
    return NextResponse.redirect(new URL('/login?error=profile', origin));
  }

  //ログイン用OAuth
  if (intent === 'login') {
    const isValidAdmin =
      profile !== null &&
      profile.role === 'admin' &&
      profile.is_setup_complete === true;

    //未登録ユーザーはブロック
    if (!profile.is_setup_complete) {
      await supabase.auth.signOut();
      return NextResponse.redirect(
        new URL('/login?error=oauth_not_registered', origin)
      );
    }

    //管理者以外はブロック
    if (!isValidAdmin) {
      await supabase.auth.signOut();
      return NextResponse.redirect(
        new URL('/login?error=oauth_admin_only', origin)
      );
    }

    return NextResponse.redirect(new URL('/admin', origin));
  }

  //サインアップ用OAuth
  if (intent === 'signup') {
    //既存ユーザーは/admin or /setupへ
    if (profile?.is_setup_complete) {
      return NextResponse.redirect(new URL('/admin', origin));
    }
    //セットアップ未完了->/setup
    return NextResponse.redirect(new URL('/setup', origin));
  }

  //intentがない場合
  return NextResponse.redirect(new URL('/admin', request.url));
}
