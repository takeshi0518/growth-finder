import Link from 'next/link';

import { Button } from '../ui/button';
import Container from '../shared/container';
import SectionTitle from '../shared/section-title';

export default function CallToAction() {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <SectionTitle>今すぐGrowth Finderを体験</SectionTitle>
          <p className="text-lg text-muted-foreground mb-8">
            デモモードでは、アカウントを登録せずにアプリを利用できます
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/demo">デモで今すぐ試す</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup">無料ではじめる</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
