'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay: number;
};

export default function FadeIn({
  children,
  className,
  delay = 0,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={cn(
        'transition-all duration-700 ease-out motion-reduce:transition-none',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0',
        className
      )}
    >
      {children}
    </div>
  );
}
