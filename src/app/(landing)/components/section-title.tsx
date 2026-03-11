import { cn } from '@/lib/utils';

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className = '',
}: SectionTitleProps) {
  return (
    <h2
      className={cn(
        'text-2xl md:text-4xl mb-12 text-center font-bold',
        className
      )}
    >
      {children}
    </h2>
  );
}
