'use client';

import { Icons } from '@/components/icon/icons';
import MobileMenu from '@/components/shared/mobile-menu';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

function StaffNavMobile() {
  const { logout, isLoading } = useAuth();

  return (
    <Button
      variant="outline"
      className="mt-auto mb-5 w-full"
      disabled={isLoading.logout}
      onClick={() => logout()}
    >
      <Icons.LogOut className="h-5 w-5 shrink-0" />
      ログアウト
    </Button>
  );
}

export default function HeaderNav() {
  return <MobileMenu>{() => <StaffNavMobile />}</MobileMenu>;
}
