import Header from '@/components/landing/header';
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
    <>
      <Header />
      {children}
    </>
  );
}
