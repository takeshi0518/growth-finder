'use client';

import Link from 'next/link';
import MobileMenu from '../shared/mobile-menu';

const guestNavItems = [
  { href: '#features', label: '機能' },
  { href: '#usage', label: '使い方' },
  { href: '/login', label: 'ログイン' },
  { href: '/signup', label: '新規登録' },
] as const;

function GuestNav() {
  return (
    <>
      {guestNavItems.map((item) => (
        <Link
          href={item.href}
          className="text-muted-foreground hover:text-foreground transition-colors"
          key={item.label}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

function GuestNavMobile({ onClose }: { onClose: () => void }) {
  return (
    <>
      {guestNavItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="text-lg py-2 hover:text-primary transition-colors p-2"
          onClick={onClose}
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
