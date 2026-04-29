import type { Metadata } from 'next';

import Header from './components/header';
import Sidebar from './components/sidebar';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import DemoBanner from '@/components/shared/demo-banner';

export const metadata: Metadata = {
  title: 'Growth Finder',
  description: 'スタッフの成長を可視化し、関係性構築を支援する人材育成ツール',
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { profile } = await requireAdmin(supabase);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Header className="md:hidden" />

      <Sidebar className="hidden md:flex" />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-4">
          <DemoBanner isDemo={profile.is_demo ?? false} />
          {children}
        </main>
        <footer className="bg-card py-4">
          <div className="text-center text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Growth Finder. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
