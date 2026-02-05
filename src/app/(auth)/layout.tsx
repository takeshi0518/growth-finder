import MainLogo from '@/components/shared/main-logo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Growth Finder',
  description: 'スタッフの成長を可視化し、関係性構築を支援する人材育成ツール',
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex flex-col justify-center items-center h-full min-h-screen p-6">
        <MainLogo />
        {children}
      </div>
    </main>
  );
}
