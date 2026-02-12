import Link from 'next/link';

import { Button } from '../ui/button';
import Container from '../shared/container';
import SectionTitle from '../shared/section-title';

export default function CallToAction() {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <SectionTitle>今すぐGrowth Finderを試す</SectionTitle>
          <p className="text-lg text-muted-foreground mb-8">
            デモモードで全ての機能を体験できます
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/demo">今すぐ試してみる(デモ)</Link>
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
