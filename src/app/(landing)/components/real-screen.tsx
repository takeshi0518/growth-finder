import Image from 'next/image';

import SectionTitle from './section-title';
import Container from './container';

const screenshots = [
  {
    src: '/images/growth-finder-screenshot1.png',
    alt: 'Growth Finderのコメント入力画像',
    title: 'ひとことコメント機能',
    description: '評価するときに思ったことを瞬時に記録することができます',
  },
  {
    src: '/images/growth-finder-screenshot2.png',
    alt: 'Growth Finderの評価入力画面',
    title: '評価入力画面',
    description: 'スムーズにスコアを入力できるようにシンプルな画面',
  },
  {
    src: '/images/growth-finder-screenshot3.png',
    alt: 'Growth Finderのスタッフ評価画面',
    title: 'スタッフ評価画面',
    description: 'グラフを使って成長を可視化',
  },
  {
    src: '/images/growth-finder-screenshot4.png',
    alt: 'Growth Finderのスタッフ一覧画面',
    title: 'スタッフ一覧画面',
    description: 'スタッフの情報がまとまって見やすい',
  },
];

type ScreenshotProps = {
  src: string;
  alt: string;
  title: string;
  description: string;
  priority?: boolean;
};

function Screenshot({
  src,
  alt,
  title,
  description,
  priority,
}: ScreenshotProps) {
  return (
    <div className="bg-card rounded-3xl overflow-hidden border">
      <div className="p-6 lg:p-10">
        <Image
          src={src}
          alt={alt}
          priority={priority}
          width={1000}
          height={600}
          className="w-full h-auto rounded-lg border"
        />
      </div>
      <div className="border-t p-7 lg:p-12 space-y-1">
        <h3 className="font-bold text-primary">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function RealScreen() {
  return (
    <section>
      <Container>
        <SectionTitle>実際の画面</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {screenshots.map((screenshot, index) => (
            <Screenshot
              key={screenshot.alt}
              {...screenshot}
              priority={index === 0}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
