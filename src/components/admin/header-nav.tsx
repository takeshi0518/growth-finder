'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import MobileMenu from '../shared/mobile-menu';
import { useAuth } from '@/app/(auth)/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Icons } from '../icon/icons';
import { adminNavItems } from '@/app/(protected)/admin/nav-items';

function AdminNavMobile({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const { logout, isLoading } = useAuth();

  return (
    <>
      {adminNavItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            href={item.href}
            key={item.label}
            onClick={onClose}
            className={cn(
              'flex items-center gap-3 text-lg p-3 rounded-2xl hover:bg-primary/10 transition-colors',
              pathname === item.href ? 'bg-primary/10' : 'hover:bg-primary/10'
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {item.label}
          </Link>
        );
      })}

      <Button
        variant="outline"
        className="mt-auto mb-5 w-full"
        disabled={isLoading.logout}
        onClick={() => logout()}
      >
        <Icons.LogOut className="h-5 w-5 shrink-0" />
        ログアウト
      </Button>
    </>
  );
}

export default function HeaderNav() {
  return (
    <MobileMenu>{(onClose) => <AdminNavMobile onClose={onClose} />}</MobileMenu>
  );
}
