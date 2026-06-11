import Link from 'next/link';

import { Button } from '@/components/ui/button';
import Container from '@/components/shared/contaienr';
import DemoLoginButton from './demo-login-button';

export default function CallToAction() {
  return (
    <section>
      <Container>
        <div className="text-center space-y-10 md:space-y-12 lg:space-y-16">
          <p className="font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl">
            今すぐ<span className="text-primary">Growth Finder</span>
            を体験
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
            デモモードでは、アカウントを登録せずにアプリを利用できます
          </p>
          <div className="flex justify-center">
            <DemoLoginButton className="text-base sm:text-lg md:text-xl py-5 md:py-6 lg:py-7 md:w-lg" />
          </div>
        </div>
      </Container>
    </section>
  );
}
