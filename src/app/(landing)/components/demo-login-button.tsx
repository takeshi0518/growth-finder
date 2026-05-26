import { loginAsDemo } from '@/app/_actions/demo-login';
import { Button } from '@/components/ui/button';

export default function DemoLoginButton() {
  return (
    <form action={loginAsDemo}>
      <Button type="submit" size="lg">
        デモを試す
      </Button>
    </form>
  );
}
