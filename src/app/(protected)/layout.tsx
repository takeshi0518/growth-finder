import type { Metadata } from 'next';
import Image from 'next/image';

import Container from '@/components/shared/container';

export const metadata: Metadata = {
  title: 'Growth Finder',
  description: 'スタッフの成長を可視化し、関係性構築を支援する人材育成ツール',
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <Container className="py-3">
          <Image
            src="/svg/logo.svg"
            width={160}
            height={40}
            alt="Growth Finder"
            priority
            className="h-9 sm:h-10 w-auto"
          />
        </Container>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
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
  );
}
