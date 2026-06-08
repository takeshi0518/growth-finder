import { loginAsDemo } from '@/app/_actions/demo-login';
import { Button } from '@/components/ui/button';

export default function DemoLoginButton() {
  return (
    <form action={loginAsDemo}>
      <Button type="submit" className="w-50 md:w-96 rounded-4xl">
        デモを試す
      </Button>
    </form>
  );
}
