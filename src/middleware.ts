import { NextRequest, NextResponse } from 'next/server';
import {
  getUserRole,
  isEmailConfirmed,
  updateSession,
} from './lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { user, supabase, supabaseResponse } = await updateSession(request);

  const pathname = request.nextUrl.pathname;

  //保護されたルート
  const protectedPaths = ['/admin', '/setup', '/staff'];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  //メール認証が必要ルートへアクセス
  if (isProtectedPath && user && !isEmailConfirmed(user)) {
    return NextResponse.redirect(new URL('/confirm-email', request.url));
  }

  // 役割ベースのアクセス制御
  if (
    user &&
    (pathname.startsWith('/admin') || pathname.startsWith('/staff'))
  ) {
    const role = await getUserRole(supabase, user.id);

    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/staff', request.url));
    }

    if (pathname.startsWith('/staff') && role !== 'staff') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // /setupへのアクセス制御
  //追加情報入力後の/setupへアクセス制御
  if (pathname === '/setup' && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_setup_complete')
      .eq('id', user.id)
      .single();

    if (profile?.is_setup_complete) {
      const role = await getUserRole(supabase, user.id);
      const redirectTo = role === 'admin' ? '/admin' : '/staff';
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  //ログイン済みユーザーのリダイレクト
  const authPaths = ['/login', '/signup'];
  const isAuthPath = authPaths.includes(pathname);

  if (isAuthPath && user && isEmailConfirmed(user)) {
    const role = await getUserRole(supabase, user.id);
    const redirectTo = role === 'admin' ? '/admin' : '/staff';
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
