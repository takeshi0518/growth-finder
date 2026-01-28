'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeaderNav() {
  const pathname = usePathname();

  if (pathname === '/admin') return <AdminNav />;
  if (pathname === '/staff') return <StaffNav />;

  return <GuestNav />;
}

function GuestNav() {
  return (
    <nav className="flex items-center gap-6">
      <Link
        href="#features"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        機能
      </Link>
      <Link
        href="#usage"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        使い方
      </Link>
      <Link
        href="/login"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Button variant="ghost" size="sm" className="cursor-pointer">
          ログイン
        </Button>
      </Link>
      <Link
        href="/signup"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Button size="sm" className="cursor-pointer">
          新規登録
        </Button>
      </Link>
    </nav>
  );
}

function StaffNav() {
  return (
    <nav className="flex items-center gap-6">
      <Button variant="ghost">ログアウト</Button>
    </nav>
  );
}

function AdminNav() {
  return (
    <nav className="flex items-center gap-6">
      <Link href="/admin" className="text-sm">
        ダッシュボード
      </Link>
      <Link href="/admin/staff" className="text-sm">
        スタッフ管理
      </Link>
      <Button variant="ghost">ログアウト</Button>
    </nav>
  );
}
