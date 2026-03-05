import Link from 'next/link';
import { Icons } from '../icon/icons';
import { cn } from '@/lib/utils';

type BackPageLinkProps = {
  label: string;
  href: string;
  className?: string;
};

export default function BackPageLink({
  label,
  href,
  className,
}: BackPageLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'w-fit flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors',
        className
      )}
    >
      <Icons.Undo2 />
      <span>{label}</span>
    </Link>
  );
}
