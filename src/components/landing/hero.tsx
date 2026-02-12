import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import Container from './container';

export default function Hero() {
  return (
    <section className="pt-32 pb-20">
      <Container>
        <div className="flex flex-col items-center gap-12">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-7xl">
            Growth Finder
          </h1>
          <div className="text-center">
            <p className="text-base mb-6 sm:text-2xl md:text-3xl">
              スタッフの成長を可視化する
              <br />
              評価ツール
            </p>
            <p className="text-base sm:text-2xl md:text-3xl text-muted-foreground">
              現場の課題から作った
              <br />
              手書き評価ツールをデジタル化
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8 md:gap-12">
            <Button size="lg" asChild>
              <Link href="/signup">今すぐ試してみる</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup">無料ではじめる</Link>
            </Button>
          </div>
          <Image
            src="/images/dummy.png"
            alt="Growth Finder ダッシュボード画像"
            width={800}
            height={500}
            className="rounded-lg shadow-xl"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
