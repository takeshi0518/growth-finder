import Image from 'next/image';
import Container from '@/components/shared/contaienr';
import BackPageLink from '@/components/shared/back-page-link';

export default function NotFound() {
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
        <div className="flex flex-col items-center gap-10">
          <h1 className="font-bold text-3xl lg:text-6xl">404 Not Found</h1>
          <p className="text-muted-foreground text-base lg:text-lg">
            お探しのページは見つかりませんでした
          </p>
          <BackPageLink href="/" label="ホームへ戻る" />
        </div>
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
