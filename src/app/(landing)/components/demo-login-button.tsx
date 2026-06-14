import { loginAsDemo } from '@/app/_actions/demo-login';
import DemoLoginSubmitButton from './demo-login-submit-button';

export default function DemoLoginButton({ className }: { className?: string }) {
  return (
    <form action={loginAsDemo}>
      <DemoLoginSubmitButton className={className} />
    </form>
  );
}
