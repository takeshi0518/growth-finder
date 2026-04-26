import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DemoPage() {
  const supabase = await createClient();

  await supabase.auth.signInWithPassword({
    email: process.env.DEMO_EMAIL!,
    password: process.env.DEMO_PASSWORD!,
  });

  redirect('/admin');
}
