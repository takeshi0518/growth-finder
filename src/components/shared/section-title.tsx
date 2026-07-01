import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className,
}: SectionTitleProps) {
  return (
    <Label className={className}>
      <span className="size-2 bg-primary rounded-full" />
      {children}
    </Label>
  );
}
