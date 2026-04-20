import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EvaluationPeriodSelect from './evaluation-period-select';
import { Tables } from '../../../../../types/supabase';
import SectionEvaluationLayout from '@/components/evaluation/section-evaluation-layout';
import SectionEvaluationDetail from '@/components/evaluation/section-evaluation-detail';
import { Label } from '@/components/ui/label';

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
      <CardContent className="space-y-10">
        <div>
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
        <Label>
          <span className="size-2 bg-primary rounded-full" />
          店舗全体評価
        </Label>
        <SectionEvaluationLayout>
          <SectionEvaluationDetail
            rank="A"
            rate={100}
            skillRate={100}
            hospitalityRate={100}
            cleanlinessRate={100}
            categoryItems={[
              { label: 'スキル', rate: 100 },
              { label: 'ホスピタリティ', rate: 100 },
              { label: 'クレンリネス', rate: 100 },
            ]}
          />
        </SectionEvaluationLayout>
      </CardContent>
    </Card>
  );
}
