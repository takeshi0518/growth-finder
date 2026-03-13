import { cn } from '@/lib/utils';
import React from 'react';

type AdminContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export default function AdminContainer({
  className,
  children,
}: AdminContainerProps) {
  return (
    <div
      className={cn(
        'mt-20 md:mt-0 max-w-7xl mx-auto w-full py-6 px-4 space-y-6',
        className
      )}
    >
      {children}
    </div>
  );
}
