import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tables } from '../../../../../../types/supabase';
import { Icons } from '@/components/icon/icons';

type EvaluationPeriod = Pick<Tables<'evaluation_periods'>, 'id' | 'name'>;

type StaffEvaluationSectionProps = {
  selectedPeriod: EvaluationPeriod;
};

export default function StaffEvaluationSection({
  selectedPeriod,
}: StaffEvaluationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.ClipboardList className="w-5 h-5" />
          評価
        </CardTitle>
        <p className="flex items-center gap-2">
          <Icons.CalendarDays className="w-5 h-5" />
          <span className="text-muted-foreground">{selectedPeriod.name}</span>
        </p>
      </CardHeader>
    </Card>
  );
}
