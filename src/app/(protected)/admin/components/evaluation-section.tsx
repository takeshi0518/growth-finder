import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EvaluationPeriodSelect from './evaluation-period-select';
import { Tables } from '../../../../../types/supabase';

type EvaluationPeriod = Pick<Tables<'evaluation_periods'>, 'id' | 'name'>;

type EvaluationSectionProps = {
  evaluationPeriods: EvaluationPeriod[];
  label: string;
};

export default function EvaluationSection({
  evaluationPeriods,
  label,
}: EvaluationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.ClipboardList className="w-5 h-5" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EvaluationPeriodSelect evaluationPeriods={evaluationPeriods} />
      </CardContent>
    </Card>
  );
}
