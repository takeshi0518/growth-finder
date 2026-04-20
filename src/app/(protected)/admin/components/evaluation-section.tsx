import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EvaluationPeriodSelect from './evaluation-period-select';
import { Tables } from '../../../../../types/supabase';

type EvaluationPeriod = Pick<
  Tables<'evaluation_periods'>,
  'id' | 'name' | 'is_current'
>;

type EvaluationSectionProps = {
  evaluationPeriods: EvaluationPeriod[];
  label: string;
};

export default function EvaluationSection({
  evaluationPeriods,
  label,
}: EvaluationSectionProps) {
  const currentEvaluationPeriod = evaluationPeriods.find(
    (period) => period.is_current
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.ClipboardList className="w-5 h-5" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-2">
          <p className="text-sm text-muted-foreground">
            現在の期間:
            {currentEvaluationPeriod ? (
              <span className="font-medium text-foreground">
                {currentEvaluationPeriod.name}
              </span>
            ) : (
              <span className="font-medium text-foreground">
                評価期間を作成して設定してください
              </span>
            )}
          </p>
        </div>
        <EvaluationPeriodSelect evaluationPeriods={evaluationPeriods} />
      </CardContent>
    </Card>
  );
}
