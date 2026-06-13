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
  },
  {
    src: '/images/growth-finder-screenshot2.png',
    alt: 'Growth Finderの評価入力画面',
    title: '評価入力機能',
  },
  {
    src: '/images/growth-finder-screenshot3.png',
    alt: 'Growth Finderのスタッフ評価画面',
    title: 'スタッフ評価画面',
  },
  {
    src: '/images/growth-finder-screenshot4.png',
    alt: 'Growth Finderのスタッフ一覧画面',
    title: 'スタッフ一覧画面',
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
      <Container className="space-y-20">
        <SectionTitle>実際の画面</SectionTitle>
        <div className="max-w-5xl mx-auto bg-card rounded-3xl border p-3 sm:p-4 md:p-5 lg:p-6">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {screenshots.map((screenshot) => (
                <div key={screenshot.alt} className="relative w-full shrink-0">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={1000}
                    height={600}
                    className="w-full h-auto rounded-lg border"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="前のスライドへ"
              className="bg-white/80 rounded-full absolute left-3 lg:left-9 top-1/2 -translate-y-1/2 hover:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icons.ChevronLeft className="w-7 sm:w-8 md:w-10 lg:w-15 h-7 sm:h-8 md:h-10 lg:h-15" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === screenshots.length - 1}
              aria-label="次のスライドへ"
              className="bg-white/80 rounded-full absolute right-3 lg:right-9 top-1/2 -translate-y-1/2 hover:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icons.ChevronRight className="w-7 sm:w-8 md:w-10 lg:w-15 h-7 sm:h-8 md:h-10 lg:h-15" />
            </button>
          </div>
          <p className="text-center mt-4 font-bold text-xs sm:text-sm md:text-base lg:text-lg">
            {screenshots[currentIndex].title}
          </p>
        </div>
      </Container>
    </section>
  );
}
