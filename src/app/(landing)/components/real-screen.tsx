'use client';

import { useState } from 'react';
import Image from 'next/image';

import SectionTitle from './section-title';
import Container from '@/components/shared/contaienr';
import { Icons } from '@/components/icon/icons';

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

export default function RealScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const handlePrev = () => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <section>
      <Container>
        <SectionTitle>実際の画面</SectionTitle>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {screenshots.map((screenshot) => (
              <div key={screenshot.alt} className="w-full shrink-0 px-2">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={1000}
                  height={600}
                  className="w-full h-auto rounded-lg border"
                />
                <p className="mt-4 text-center font-bold">{screenshot.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-10 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="前のスライドへ"
            className="hover:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Icons.ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === screenshots.length - 1}
            aria-label="次のスライドへ"
            className="hover:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Icons.ChevronRight className="w-10 h-10" />
          </button>
        </div>
      </Container>
    </section>
  );
}
