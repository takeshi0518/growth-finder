import Image from 'next/image';

import SectionTitle from './section-title';
import Container from '@/components/shared/contaienr';

const screenshots = [
  {
    src: '/images/growth-finder-screenshot1.png',
    alt: 'Growth Finderのコメント入力画像',
    title: 'ひとことコメント機能',
    description:
      '評価だけでは伝わらない成長や気づきを記録。「なぜその評価になったのか」を残せるため、1on1や面談時の振り返りがスムーズになります',
  },
  {
    src: '/images/growth-finder-screenshot2.png',
    alt: 'Growth Finderの評価入力画面',
    title: '評価入力機能',
    description:
      '誰が評価しても同じ基準でスタッフの習得状況を4段階で記録。評価基準を統一することで担当者ごとのばらつきを防ぎ、公平な評価と育成を実現します。',
  },
  {
    src: '/images/growth-finder-screenshot3.png',
    alt: 'Growth Finderのスタッフ評価画面',
    title: 'スタッフ評価画面',
    description:
      '入力した評価を自動で集計し、達成率やスキルバランスをグラフで可視化。スタッフ一人ひとりの強みや課題を把握し、次に育成すべきポイントが明確になります。',
  },
  {
    src: '/images/growth-finder-screenshot4.png',
    alt: 'Growth Finderのスタッフ一覧画面',
    title: 'スタッフ一覧画面',
    description:
      '登録されたスタッフの評価状況や達成度を一覧で確認。誰が未評価なのか、誰が成長しているのかをすぐに把握できます。',
  },
];

type ScreenshotProps = {
  src: string;
  alt: string;
  index: number;
  title: string;
  description: string;
  priority?: boolean;
};

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
              index={index + 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Screenshot({
  src,
  alt,
  index,
  title,
  description,
  priority,
}: ScreenshotProps) {
  return (
    <div className="bg-card rounded-3xl overflow-hidden border">
      <div className="p-6 lg:p-10">
        <div className="flex items-center gap-3 font-bold mb-5">
          <div className="flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 bg-primary rounded-full text-primary-foreground text-xs sm:text-sm md:text-base">
            <span>{index}</span>
          </div>
          <h3 className="font-bold">{title}</h3>
        </div>
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
        <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
