import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Icons } from '../icon/icons';
import SectionTitle from '../shared/section-title';
import Container from '../shared/container';

const usageList = [
  {
    index: '1',
    icon: Icons.Edit3,
    title: 'アカウント',
    description: (
      <Button size="sm" asChild variant="ghost">
        <Link href="/signup">すぐに始める</Link>
      </Button>
    ),
  },
  {
    index: '2',
    icon: Icons.UserRoundPen,
    title: 'スタッフを追加',
    description: '名前など基本情報を登録',
  },
  {
    index: '3',
    icon: Icons.ClipboardPenLine,
    title: '評価を入力',
    description: 'タブで簡単に入力',
  },
  {
    index: '4',
    icon: Icons.BarChart3,
    title: '成長を可視化',
    description: 'グラフで確認',
  },
];

type UsageItemProps = {
  index: string;
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
};

function UsageItem({ index, icon: Icon, title, description }: UsageItemProps) {
  return (
    <div className="bg-primary-foreground w-full p-6 lg:p-12 border rounded-2xl">
      <p className="text-xl md:text-2xl">{index}</p>
      <div className="text-center mt-3">
        <Icon className="w-8 md:w-10 h-8 md:h-10 mx-auto text-primary" />
        <p className="mt-3 text-base font-semibold">{title}</p>
        <div className="mt-4 text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
}

export default function Usage() {
  return (
    <section id="usage" className="py-20">
      <Container>
        <SectionTitle>Growth Finderの使い方</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usageList.map((item) => (
            <UsageItem key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
