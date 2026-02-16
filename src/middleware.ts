import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

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

  // /setupへのアクセス制御
  if (pathname === '/setup' && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_setup_complete')
      .eq('id', user.id)
      .single();

    if (profile?.is_setup_complete) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  //ログイン済みユーザーのリダイレクト
  const authPaths = ['/login', '/signup'];
  const isAuthPath = authPaths.includes(pathname);

  if (isAuthPath && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
