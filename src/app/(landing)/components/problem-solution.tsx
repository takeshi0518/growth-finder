import SectionTitle from './section-title';
import Container from '@/components/shared/contaienr';
import { Icons } from '@/components/icon/icons';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const items = [
  {
    problem: 'うまくコミュニケーションがとれない',
    solution: 'コミュニケーションの質が向上します',
    problemIcon: '/images/problem-icon1.png',
    solutionIcon: '/images/solution-icon2.png',
  },
  {
    problem: 'スタッフの成長が見えにくい',
    solution: '成長具合が可視化され伸びしろが明確に',
    problemIcon: '/images/problem-icon2.png',
    solutionIcon: '/images/solution-icon3.png',
  },
  {
    problem: '評価ツールが紙で管理が大変',
    solution: '評価履歴をすぐに確認できて便利',
    problemIcon: '/images/problem-icon3.png',
    solutionIcon: '/images/solution-icon1.png',
  },
];

export default function ProblemSolution() {
  return (
    <section id="problem-solution" className="scroll-mt-24">
      <Container className="space-y-20">
        <SectionTitle>
          こんな
          <span className="font-bold text-primary">お悩み</span>
          ありませんか？
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Card
              text={item.problem}
              key={item.problem}
              icon={item.problemIcon}
              variant="problem"
            />
          ))}
        </div>

        <div>
          <div className="flex justify-center text-primary">
            <Icons.ArrowBigDown className="w-20 h-20" />
          </div>

          <div className="text-2xl md:text-4xl font-bold text-center">
            <span className="font-bold text-primary">Growth Finder</span>
            が解決します
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Card
              text={item.solution}
              key={item.solution}
              icon={item.solutionIcon}
              variant="solution"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Card({
  text,
  icon,
  variant,
}: {
  text: string;
  icon: string;
  variant: 'problem' | 'solution';
}) {
  const isProblem = variant === 'problem';
  return (
    <div className="flex flex-col items-center gap-5 p-8 shadow-2xl bg-primary-foreground rounded-xl">
      <span
        className={cn(
          'text-xs font-bold px-3 py-1 rounded-full',
          isProblem
            ? 'text-destructive bg-destructive/10'
            : 'text-primary bg-primary/10'
        )}
      >
        {isProblem ? 'お悩み' : '解決策'}
      </span>
      <p className="font-bold text-base md:text-xl">{text}</p>
      <Image src={icon} alt="" width={70} height={70} className="mt-auto" />
    </div>
  );
}
