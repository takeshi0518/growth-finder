import Link from 'next/link';
import HeaderNav from '@/components/header/header-nav';

export default function Header() {
  return (
    <header className="fixed left-0 top-3 right-0 z-50 px-4">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between bg-background/80 shadow-sm backdrop-blur-sm rounded-full border">
        <Link href="/" className="text-xl font-semibold">
          Growth Finder
        </Link>

        <HeaderNav />
      </div>
    </header>
  );
}
