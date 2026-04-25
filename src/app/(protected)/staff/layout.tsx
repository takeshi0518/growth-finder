import type { Metadata } from 'next';
import Header from './components/header';

export const metadata: Metadata = {
  title: 'Growth Finder',
  description: 'スタッフの成長を可視化し、関係性構築を支援する人材育成ツール',
};

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Header />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-4">{children}</main>
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
