import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();

  await supabase.auth.signInWithPassword({
    email: process.env.DEMO_EMAIL!,
    password: process.env.DEMO_PASSWORD!,
  });

  return NextResponse.redirect(
    new URL('/admin', process.env.NEXT_PUBLIC_SITE_URL!)
  );
}
