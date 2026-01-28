'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Icons } from '../icon/icons';

export default function HeaderNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getNaveType = () => {
    if (pathname.startsWith('/admin')) return 'admin';
    if (pathname.startsWith('/staff')) return 'staff';
    return 'guest';
  };

  const navType = getNaveType();

  return (
    <>
      {/* デスクトップ用ナビゲーション */}
      <nav className="hidden sm:flex items-center gap-6">
        {navType.startsWith('guest') && <GuestNav />}
        {navType.startsWith('admin') && <AdminNav />}
        {navType.startsWith('staff') && <StaffNav />}
      </nav>

      <div className="sm:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icons.menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pt-16 px-6">
            <SheetHeader className="mb-8">
              <SheetTitle>
                <Link href="/" className="text-xl font-semibold">
                  Growth Finder
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              {navType === 'guest' && (
                <GuestNavMobile onClose={() => setIsOpen(false)} />
              )}
              {navType === 'staff' && (
                <StaffNavMobile onClose={() => setIsOpen(false)} />
              )}
              {navType === 'admin' && (
                <AdminNavMobile onClose={() => setIsOpen(false)} />
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

//デスクトップ用ナビゲーション
function GuestNav() {
  return (
    <>
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
    </>
  );
}

function StaffNav() {
  return <Button variant="ghost">ログアウト</Button>;
}

function AdminNav() {
  return (
    <>
      <Link href="/admin" className="text-sm">
        ダッシュボード
      </Link>
      <Link href="/admin/staff" className="text-sm">
        スタッフ管理
      </Link>
      <Button variant="ghost">ログアウト</Button>
    </>
  );
}

//モバイル用ナビゲーション
function GuestNavMobile({ onClose }: { onClose: () => void }) {
  return (
    <>
      <Link
        href="#features"
        className="text-lg py-2 hover:text-primary transition-colors"
        onClick={onClose}
      >
        機能
      </Link>
      <Link
        href="#features"
        className="text-lg py-2 hover:text-primary transition-colors"
        onClick={onClose}
      >
        使い方
      </Link>
      <Link href="/login" onClick={onClose}>
        <Button className="w-full">新規登録</Button>
      </Link>
      <Link href="/login" onClick={onClose}>
        <Button className="w-full">ログイン</Button>
      </Link>
    </>
  );
}

function StaffNavMobile({ onClose }: { onClose: () => void }) {
  return (
    <Button variant="ghost" className="w-full" onClick={onClose}>
      ログアウト
    </Button>
  );
}

function AdminNavMobile({ onClose }: { onClose: () => void }) {
  return (
    <>
      <Link
        href="/admin"
        className="text-lg py-2 hover:text-primary transition-colors"
        onClick={onClose}
      >
        ダッシュボード
      </Link>
      <Link
        href="/staff"
        className="text-lg py-2 hover:text-primary transition-colors"
        onClick={onClose}
      >
        スタッフ管理
      </Link>
      <Button variant="ghost" className="w-full" onClick={onClose}>
        ログアウト
      </Button>
    </>
  );
}
