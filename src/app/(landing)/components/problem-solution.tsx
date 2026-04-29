import SectionTitle from './section-title';
import Container from './container';
import { Icons } from '@/components/icon/icons';
import Image from 'next/image';

const items = [
  {
    problem: 'スタッフとうまくコミュニケーションがとれない',
    solution:
      '1 on 1ミーティングの際に話のきっかけが生まれコミュニケーションの質が向上します',
    problemIcon: '/images/problem-icon1.png',
    solutionIcon: '/images/solution-icon2.png',
  },
  {
    problem: 'スタッフの成長が見えにくい',
    solution:
      'グラフで成長具合が可視化されるので、どこに伸びしろがあるのかが分かりやすい',
    problemIcon: '/images/problem-icon2.png',
    solutionIcon: '/images/solution-icon3.png',
  },
  {
    problem: '評価ツールが紙で管理が大変',
    solution: '評価履歴をすぐに確認できる',
    problemIcon: '/images/problem-icon3.png',
    solutionIcon: '/images/solution-icon1.png',
  },
];

function ProblemsCard({
  text,
  index,
  icon,
}: {
  text: string;
  index: number;
  icon: string;
}) {
  return (
    <div className="relative p-10 border-3 border-destructive/40 bg-primary-foreground rounded-xl">
      <span className="text-xs font-bold text-destructive bg-destructive/10 px-2 py-1 rounded-full">
        お悩み
      </span>
      <div className="w-8 h-8 bg-primary rounded-full text-primary-foreground flex items-center justify-center mb-3 mt-5 lg:hidden">
        {index + 1}
      </div>
      <p className="pr-16 font-bold">{text}</p>
      <Image
        src={icon}
        alt=""
        width={70}
        height={70}
        className="absolute bottom-[-15] right-[-15] lg:bottom-[-40] lg:right-[-40]"
      />
    </div>
  );
}

function SolutionCard({
  text,
  index,
  icon,
}: {
  text: string;
  index: number;
  icon: string;
}) {
  return (
    <div className="relative p-10 border-3 border-primary bg-primary-foreground rounded-xl">
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
        解決策
      </span>
      <div className="w-8 h-8 bg-primary rounded-full text-primary-foreground flex items-center justify-center mb-3 mt-5 lg:hidden">
        {index + 1}
      </div>
      <p className="pr-16 font-bold">{text}</p>
      <Image
        src={icon}
        alt=""
        width={90}
        height={90}
        className="absolute bottom-[-15] right-[-15] lg:bottom-[-40] lg:right-[-40]"
      />
    </div>
  );
}

export default function ProblemSolution() {
  return (
    <section id="problem-solution" className="scroll-mt-24">
      <Container>
        <SectionTitle>Growth Finderが解決するもの</SectionTitle>
        <div className="space-y-10">
          <p className="text-center">
            こんな
            <span className="text-2xl font-bold text-primary">お悩み</span>
            ありませんか？
          </p>

          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {items.map((item, index) => (
                <ProblemsCard
                  text={item.problem}
                  key={item.problem}
                  icon={item.problemIcon}
                  index={index}
                />
              ))}
            </div>

            <div className="flex justify-center text-primary">
              <Icons.ArrowBigDown className="w-20 h-20" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {items.map((item, index) => (
                <SolutionCard
                  text={item.solution}
                  key={item.solution}
                  icon={item.solutionIcon}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
