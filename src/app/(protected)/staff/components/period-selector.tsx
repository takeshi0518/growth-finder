'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tables } from '../../../../../types/supabase';
import { Icons } from '@/components/icon/icons';
import { useRouter } from 'next/navigation';

//Todo: 管理者ページで同じ記述をしているのでtypes/evaluations.tsで定義して参照する
type EvaluationPeriod = Pick<Tables<'evaluation_periods'>, 'id' | 'name'>;

type PeriodSelectorProps = {
  evaluationPeriods: EvaluationPeriod[];
};

export default function PeriodSelector({
  evaluationPeriods,
}: PeriodSelectorProps) {
  const router = useRouter();

  const handleValueChange = (periodId: string) => {
    router.push(`?periodId=${periodId}`);
  };
  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger size="default">
        <Icons.CalendarDays className="w-4 h-4" />
        <SelectValue placeholder="評価期間" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>評価期間を選択</SelectLabel>
          {evaluationPeriods.map((period) => (
            <SelectItem
              key={period.id}
              value={period.id}
              className="cursor-pointer"
            >
              {period.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
