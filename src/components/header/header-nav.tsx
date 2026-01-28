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

  const getNavType = () => {
    if (pathname.startsWith('/admin')) return 'admin';
    if (pathname.startsWith('/staff')) return 'staff';
    return 'guest';
  };

  const navType = getNavType();

  return (
    <>
      {/* デスクトップ用ナビゲーション */}
      <nav className="hidden sm:flex items-center gap-6">
        {navType === 'guest' && <GuestNav variant="desktop" />}
        {navType === 'admin' && <AdminNav variant="desktop" />}
        {navType === 'staff' && <StaffNav variant="desktop" />}
      </nav>

      <div className="sm:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="cursor-pointer">
            <Button variant="ghost" size="icon">
              <Icons.menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pt-16 px-4">
            <SheetHeader className="mb-8">
              <SheetTitle>
                <Link href="/" className="text-xl font-semibold">
                  Growth Finder
                </Link>
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-4 mt-6">
              {navType === 'guest' && (
                <GuestNav variant="mobile" onClose={() => setIsOpen(false)} />
              )}
              {navType === 'admin' && (
                <AdminNav variant="mobile" onClose={() => setIsOpen(false)} />
              )}
              {navType === 'staff' && (
                <StaffNav variant="mobile" onClose={() => setIsOpen(false)} />
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

type NavProps = {
  variant: 'desktop' | 'mobile';
  onClose?: () => void;
};

//ナビゲーションコンポーネント
function GuestNav({ variant, onClose }: NavProps) {
  const isDesktop = variant === 'desktop';
  const linkClass = isDesktop
    ? 'text-muted-foreground hover:text-foreground transition-colors'
    : 'text-lg py-2 hover:text-primary transition-colors p-2';
  const buttonClass = isDesktop ? '' : 'w-full';

  return (
    <>
      <Link href="#features" className={linkClass} onClick={onClose}>
        機能
      </Link>
      <Link href="#usage" className={linkClass} onClick={onClose}>
        使い方
      </Link>
      <Link href="/login" onClick={onClose}>
        <Button size="sm" className={buttonClass}>
          ログイン
        </Button>
      </Link>
      <Link href="/signup" onClick={onClose}>
        <Button size="sm" className={buttonClass}>
          新規登録
        </Button>
      </Link>
    </>
  );
}

function StaffNav({ variant, onClose }: NavProps) {
  const isDesktop = variant === 'desktop';
  const buttonClass = isDesktop ? '' : 'w-full';
  return (
    <Button variant="ghost" size="sm" className={buttonClass} onClick={onClose}>
      ログアウト
    </Button>
  );
}

function AdminNav({ variant, onClose }: NavProps) {
  const isDesktop = variant === 'desktop';
  const linkClass = isDesktop
    ? 'text-sm text-muted-foreground hover:text-foreground transition-colors'
    : 'text-lg py-2 hover:text-primary transition-colors';
  const buttonClass = isDesktop ? '' : 'w-full';
  return (
    <>
      <Link href="/admin" className={linkClass} onClick={onClose}>
        ダッシュボード
      </Link>
      <Link href="/admin/staff" className={linkClass} onClick={onClose}>
        スタッフ管理
      </Link>
      <Button
        variant="ghost"
        size="sm"
        className={buttonClass}
        onClick={onClose}
      >
        ログアウト
      </Button>
    </>
  );
}
