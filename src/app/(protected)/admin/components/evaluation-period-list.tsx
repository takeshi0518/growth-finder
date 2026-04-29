import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CreateEvaluationPeriodDialog from './create-evaluation-period-dialog';
import { Icons } from '@/components/icon/icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import EvaluationPeriodMenu from './evaluation-period-menu';
import { Tables } from '../../../../../types/supabase';

type EvaluationPeriod = Pick<Tables<'evaluation_periods'>, 'id' | 'name'>;

type EvaluationPeriodListProps = {
  isDemo: boolean;
  evaluationPeriods: EvaluationPeriod[];
};

export default function EvaluationPeriodList({
  isDemo,
  evaluationPeriods,
}: EvaluationPeriodListProps) {
  return (
    <Card className="flex-1">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="flex items-center gap-2">
          <Icons.List className="w-4 h-4" />
          評価期間一覧
        </CardTitle>
        <CreateEvaluationPeriodDialog />
      </CardHeader>
      <CardContent>
        <ScrollArea type="auto" className="max-h-44 rounded-md border">
          <div className="p-4">
            {evaluationPeriods.length === 0 && (
              <p className="text-sm">評価期間がありません</p>
            )}
            {evaluationPeriods.map((period) => (
              <p
                key={period.id}
                className="flex justify-between items-center text-sm p-2 border-b"
              >
                {period.name}
                <EvaluationPeriodMenu
                  isDemo={isDemo}
                  evaluationPeriod={period}
                />
              </p>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
