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
import { Icons } from '@/components/icon/icons';
import { Tables } from '../../../../../types/supabase';
import { switchPeriod } from '../actions';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/utils/error-message';
import { useTransition } from 'react';
import LoaderCircleIcon from '@/components/shared/loader-circle';

type EvaluationPeriod = Pick<Tables<'evaluation_periods'>, 'id' | 'name'>;

type EvaluationPeriodSelectProps = {
  evaluationPeriods: EvaluationPeriod[];
};

export default function EvaluationPeriodSelect({
  evaluationPeriods,
}: EvaluationPeriodSelectProps) {
  const [isPending, startTransition] = useTransition();

  const handleSwitchPeriod = async (selectId: string) => {
    startTransition(async () => {
      try {
        await switchPeriod(selectId);
        toast.success('評価期間を切り替えました');
      } catch (error) {
        toast.error('評価期間の切り替えに失敗しました', {
          description: getErrorMessage(error),
        });
      }
    });
  };

  return (
    <Select onValueChange={handleSwitchPeriod} disabled={isPending}>
      <SelectTrigger size="default">
        {isPending ? (
          <LoaderCircleIcon />
        ) : (
          <>
            <Icons.CalendarDays className="w-4 h-4" />
            <SelectValue placeholder="評価期間" />
          </>
        )}
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
