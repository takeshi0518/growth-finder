const features = [
  { icon: '📊', title: '評価の可視化', description: '３軸グラフで一目瞭然' },
  {
    icon: '✏️',
    title: '簡単な評価入力',
    description: 'タブで入力整理 された画面',
  },
  {
    icon: '💬',
    title: 'フィードバック の記録',
    description: '良い点・改善点 を記録',
  },
];

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="w-full max-w-xs h-full text-center p-6 border rounded-lg bg-card">
      <p className="mb-4 text-4xl">{icon}</p>
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function Feature() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl mb-12 text-center font-bold">
          Growth Finderの機能
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          {features.map((feature) => (
            <FeatureCard {...feature} key={feature.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
