import MainLogo from '@/components/shared/main-logo';
import { cn } from '@/lib/utils';
import HeaderNav from './header-nav';

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'fixed left-0 top-4 right-0 z-50 px-4 mx-w-[1440px]',
        className
      )}
    >
      <div className="container mx-auto px-5 sm:px-8 h-14 md:h-16 flex items-center justify-between bg-background/80 shadow-sm backdrop-blur-sm rounded-2xl border">
        <MainLogo />

        <HeaderNav />
      </div>
    </header>
  );
}
