import Link from 'next/link';
import { Button } from '@/components/ui/button';
import HeaderNav from '@/components/header/header-nav';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Growth Finder
        </Link>

        <HeaderNav />
      </div>
    </header>
  );
}
