import { cn } from '@/lib/utils';
import { Icons } from '../icon/icons';

type LoaderCircleIconProps = {
  className?: string;
};

export default function LoaderCircleIcon({ className }: LoaderCircleIconProps) {
  return (
    <Icons.LoaderCircle className={cn('h-5 w-5 animate-spin', className)} />
  );
}
