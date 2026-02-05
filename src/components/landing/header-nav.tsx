'use client';

import Link from 'next/link';
import MobileMenu from '../shared/mobile-menu';

import { useSmoothScroll } from '@/app/hooks/use-smooth-scroll';

const guestNavItems = [
  { href: '#features', label: '機能' },
  { href: '#usage', label: '使い方' },
  { href: '/login', label: 'ログイン' },
  { href: '/signup', label: '新規登録' },
] as const;

function GuestNav() {
  const handleSmoothScroll = useSmoothScroll();
  return (
    <>
      {guestNavItems.map((item) => (
        <Link
          href={item.href}
          className="text-muted-foreground hover:text-primary transition-colors"
          key={item.label}
          onClick={(e) => handleSmoothScroll(e, item.href)}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

function GuestNavMobile({ onClose }: { onClose: () => void }) {
  const handleSmoothScroll = useSmoothScroll();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    handleSmoothScroll(e, href);
    if (href.startsWith('#')) {
      onClose();
    }
  };
  return (
    <>
      {guestNavItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="text-lg p-3 rounded-2xl hover:bg-primary/10 transition-colors"
          onClick={(e) => handleClick(e, item.href)}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export default function HeaderNav() {
  return (
    <>
      <nav className="hidden sm:flex items-center gap-6">
        <GuestNav />
      </nav>

      <div className="sm:hidden">
        <MobileMenu>
          {(onClose) => <GuestNavMobile onClose={onClose} />}
        </MobileMenu>
      </div>
    </>
  );
}
