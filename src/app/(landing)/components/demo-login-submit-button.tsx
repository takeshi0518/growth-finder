'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import LoaderCircleIcon from '@/components/shared/loader-circle';
import { cn } from '@/lib/utils';

export default function DemoLoginSubmitButton({
  className,
}: {
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn('w-50 md:w-96 rounded-4xl', className)}
    >
      {pending ? <LoaderCircleIcon /> : 'デモを試す'}
    </Button>
  );
}
