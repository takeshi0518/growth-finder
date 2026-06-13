import Image from 'next/image';

import Container from '@/components/shared/contaienr';
import DemoLoginButton from './demo-login-button';
import { Icons } from '@/components/icon/icons';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-8">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex flex-col gap-8 items-center md:flex-1">
            <div className="flex flex-col gap-4 lg:gap-8">
              <p className="text-left font-bold text-2xl md:text-3xl lg:text-5xl">
                スタッフ評価の
              </p>
              <p className="text-left font-bold text-4xl md:text-5xl lg:text-6xl text-primary">
                属人化をなくす
              </p>
              <p className="text-left text-xl md:text-2xl lg:text-3xl">
                誰が評価しても同じ基準で
                <br />
                スタッフの成長を可視化
              </p>
            </div>

            <div className="flex flex-col items-center gap-8">
              <ul className="flex gap-3 md:gap-8 xl:gap-20">
                <li className="flex flex-col items-center gap-2">
                  <div className="flex justify-center items-center w-12 md:w-18 lg:w-28 h-12 md:h-18 lg:h-28 bg-white rounded-full shadow-xs">
                    <Icons.MessageSquareText className="w-5 md:w-8 lg:w-14 h-5 md:h-8 lg:h-14 text-primary" />
                  </div>
                  <p className="text-xs md:text-sm xl:text-lg font-bold">
                    面談の記録を
                    <br />
                    かんたんに
                  </p>
                </li>
                <li className="flex flex-col items-center gap-2">
                  <div className="flex justify-center items-center w-12 md:w-18 lg:w-28 h-12 md:h-18 lg:h-28 bg-white rounded-full shadow-xs">
                    <Icons.ChartColumnIncreasing className="w-5 md:w-8 lg:w-14 h-5 md:h-8 lg:h-14 text-primary" />
                  </div>
                  <p className="text-xs md:text-sm xl:text-lg font-bold">
                    成長状況を
                    <br />
                    グラフで可視化
                  </p>
                </li>
                <li className="flex flex-col items-center gap-2">
                  <div className="flex justify-center items-center w-12 md:w-18 lg:w-28 h-12 md:h-18 lg:h-28 bg-white rounded-full shadow-xs">
                    <Icons.ClipboardList className="w-5 md:w-8 lg:w-14 h-5 md:h-8 lg:h-14 text-primary" />
                  </div>
                  <p className="text-xs md:text-sm xl:text-lg font-bold">
                    評価基準を統一
                    <br />
                    育成の質を向上
                  </p>
                </li>
              </ul>

              <DemoLoginButton className="text-base sm:text-lg md:text-xl py-4 md:py-5 lg:py-6 md:w-lg" />
            </div>
          </div>
          <div className="md:flex-1">
            <Image
              src="/images/growth-finder-main.png"
              alt="Growth Finder ダッシュボード画像"
              width={800}
              height={600}
              priority
            />
          </div>
        </div>
      </Container>
      <div className="absolute bottom-3 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce-gentle">
        <Icons.TbArrowBigDownLinesFilled className="w-5 h-5 text-muted-foreground" />
        <p className="mt-3 text-xs text-muted-foreground">Scroll</p>
      </div>
    </section>
  );
}
