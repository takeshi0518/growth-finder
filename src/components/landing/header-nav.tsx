'use client';

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="hidden sm:flex items-center gap-6">
        <GuestNav variant="desktop" />
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
              <GuestNav variant="mobile" onClose={() => setIsOpen(false)} />
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

function GuestNav({ variant, onClose }: NavProps) {
  const isDesktop = variant === 'desktop';
  const linkClass = isDesktop
    ? 'text-muted-foreground hover:text-foreground transition-colors'
    : 'text-lg py-2 hover:text-primary transition-colors p-2';

  return (
    <>
      <Link href="#features" className={linkClass} onClick={onClose}>
        機能
      </Link>
      <Link href="#usage" className={linkClass} onClick={onClose}>
        使い方
      </Link>
      <Link href="/login" onClick={onClose} className={linkClass}>
        ログイン
      </Link>
      <Link href="/signup" onClick={onClose} className={linkClass}>
        新規登録
      </Link>
    </>
  );
}
