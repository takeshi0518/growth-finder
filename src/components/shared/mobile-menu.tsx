'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Icons } from '@/components/icon/icons';

type MobileMenuProps = {
  children: ReactNode | ((onClose: () => void) => ReactNode);
};

export default function MobileMenu({ children }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
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
          {typeof children === 'function' ? children(handleClose) : children}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
