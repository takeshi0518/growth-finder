import { LucideIcon } from 'lucide-react';
import { Icons } from '@/components/icon/icons';
import SectionTitle from './section-title';
import Container from './container';

const features = [
  {
    icon: Icons.BarChart3,
    title: '評価の可視化',
    description: '３軸グラフで一目瞭然',
  },
  {
    icon: Icons.Edit3,
    title: '簡単な評価入力',
    description: 'タブで入力整理 された画面',
  },
  {
    icon: Icons.MessageSquare,
    title: 'フィードバック の記録',
    description: '良い点・改善点 を記録',
  },
];

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="w-full max-w-xs h-full text-center p-6 md:p-10 lg:p-12 border rounded-lg bg-card">
      <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function Feature() {
  return (
    <section id="features" className="py-20 scroll-mt-24">
      <Container>
        <SectionTitle>Growth Finderの機能</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          {features.map((feature) => (
            <FeatureCard {...feature} key={feature.title} />
          ))}
        </div>
      </Container>
    </section>
  );
}
