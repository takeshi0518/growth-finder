import { loginAsDemo } from '@/app/_actions/demo-login';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function DemoLoginButton({ className }: { className?: string }) {
  return (
    <form action={loginAsDemo}>
      <Button
        type="submit"
        className={cn('w-50 md:w-96 rounded-4xl', className)}
      >
        デモを試す
      </Button>
    </form>
  );
}
