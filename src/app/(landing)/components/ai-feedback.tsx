import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

import SectionTitle from './section-title';
import Container from '@/components/shared/contaienr';
import FadeIn from './fade-in';
import { Icons } from '@/components/icon/icons';

const steps = [
  {
    index: '1',
    icon: Icons.ClipboardPenLine,
    title: '店長が評価する',
    description: '点数とコメントを入力',
  },
  {
    index: '2',
    icon: Icons.Bot,
    title: 'AIがたたき台を作る',
    description: '前回との比較から伸びた点を文章に',
  },
  {
    index: '3',
    icon: Icons.MessageSquareText,
    title: '店長が面談で伝える',
    description: '承認は店長の言葉で',
  },
];

type StepItemProps = {
  index: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function AiFeedback() {
  return (
    <section id="ai-feedback" className="scroll-mt-24">
      <Container className="space-y-20">
        <FadeIn delay={0}>
          <div className="space-y-6">
            <SectionTitle>
              <span className="font-bold text-primary">AI</span>
              が1on1のたたき台を作成
            </SectionTitle>
            <p className="text-center text-sm md:text-base lg:text-lg text-muted-foreground">
              店長が入力した評価と過去の評価をもとに、
              <br className="hidden sm:inline" />
              面談で伝えるフィードバックのたたき台をAIが作ります
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.1}>
              <StepItem {...step} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0}>
          <p className="text-center font-bold text-lg md:text-2xl lg:text-3xl">
            AIの言葉は承認にならない。
            <br />
            だから、<span className="text-primary">伝えるのは店長</span>です。
          </p>
        </FadeIn>

        <FadeIn delay={0}>
          <div className="max-w-5xl mx-auto bg-card rounded-3xl border p-3 sm:p-4 md:p-5 lg:p-6">
            <Image
              src="/images/growth-finder-screenshot5.png"
              alt="Growth FinderのAIフィードバック画面"
              width={1000}
              height={600}
              className="w-full h-auto rounded-lg border"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function StepItem({ index, icon: Icon, title, description }: StepItemProps) {
  return (
    <div className="h-full bg-primary-foreground w-full p-8 border rounded-2xl">
      <div className="flex items-center justify-center font-bold w-6 sm:w-8 h-6 sm:h-8 bg-primary rounded-full text-primary-foreground text-sm sm:text-base">
        <span>{index}</span>
      </div>
      <div className="text-center space-y-3">
        <Icon className="w-12 md:w-14 h-12 md:h-14 mx-auto text-primary" />
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-primary font-bold">{description}</p>
      </div>
    </div>
  );
}
