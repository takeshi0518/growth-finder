'use client';

import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icon/icons';

type StaffSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function StaffSearch({ value, onChange }: StaffSearchProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icons.Search className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">スタッフ検索</span>
      </div>
      <Input
        type="text"
        placeholder="名前で検索"
        className="lg:max-w-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
