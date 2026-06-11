import { LucideIcon } from 'lucide-react';

import { Icons } from '../../../components/icon/icons';
import SectionTitle from './section-title';
import Container from '@/components/shared/contaienr';

const usageList = [
  {
    index: '1',
    icon: Icons.Edit3,
    title: 'アカウント',
    description: '1分でアカウント作成',
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

export default function Usage() {
  return (
    <section id="usage">
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

function UsageItem({ index, icon: Icon, title, description }: UsageItemProps) {
  return (
    <div className="bg-primary-foreground w-full p-8 border rounded-2xl">
      <div className="flex items-center justify-center font-bold w-6 sm:w-8 h-6 sm:h-8 bg-primary rounded-full text-primary-foreground text-sm sm:text-base">
        <span>{index}</span>
      </div>
      <div className="text-center space-y-3">
        <Icon className="w-12 md:w-14 h-12 md:h-14 mx-auto text-primary" />
        <p className="text-lg font-semibold">{title}</p>
        <div className="text-sm text-primary font-bold">{description}</div>
      </div>
    </div>
  );
}
