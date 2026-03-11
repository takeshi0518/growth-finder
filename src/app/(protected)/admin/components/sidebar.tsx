'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/(auth)/hooks/use-auth';
import { cn } from '@/lib/utils';
import MainLogo from '@/components/shared/main-logo';
import { adminNavItems } from '../nav-items';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icon/icons';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { isLoading, logout } = useAuth();

  return (
    <aside
      className={cn(
        'w-60 flex flex-col border-r bg-card px-4 py-6 sticky top-0 h-screen',
        className
      )}
    >
      <div className="mb-8 px-3">
        <MainLogo href="/admin" />
      </div>

      <nav className="flex flex-col gap-5 flex-1">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              href={item.href}
              key={item.label}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors',
                isActive ? 'bg-primary/10' : 'hover:bg-primary/10'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Button
        variant="outline"
        className="justify-items-start gap-3"
        onClick={() => logout()}
        disabled={isLoading.logout}
      >
        <Icons.LogOut className="h-5 w-5 shrink-0" />
        ログアウト
      </Button>
    </aside>
  );
}
