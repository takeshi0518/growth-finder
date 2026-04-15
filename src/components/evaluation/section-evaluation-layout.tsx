import { cn } from '@/lib/utils';

type SectionEvaluationLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionEvaluationLayout({
  children,
  className = '',
}: SectionEvaluationLayoutProps) {
  return (
    <div className={cn('mt-15 max-w-200 mx-auto space-y-16', className)}>
      {children}
    </div>
  );
}
