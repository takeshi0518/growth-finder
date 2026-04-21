import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EvaluationPeriodSelect from './evaluation-period-select';
import { Tables } from '../../../../../types/supabase';
import SectionEvaluationLayout from '@/components/evaluation/section-evaluation-layout';
import SectionEvaluationDetail from '@/components/evaluation/section-evaluation-detail';
import { Label } from '@/components/ui/label';
import ProgressBar from '@/components/evaluation/progress-bar';
import { Button } from '@/components/ui/button';

type EvaluationPeriod = Pick<
  Tables<'evaluation_periods'>,
  'id' | 'name' | 'is_current'
>;

type EvaluationSectionProps = {
  evaluationPeriods: EvaluationPeriod[];
  currentEvaluationPeriod?: EvaluationPeriod;
  label: string;
};

export default function EvaluationSection({
  evaluationPeriods,
  currentEvaluationPeriod,
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
        <div className="mt-15 max-w-200 mx-auto space-y-16">
          <div className="flex flex-col-reverse gap-y-8 sm:flex-row sm:justify-between">
            <div className="flex flex-col gap-1">
              <Label>
                <Icons.CalendarDays className="w-5 h-5" />
                現在の評価期間
              </Label>

              <p className="text-sm text-muted-foreground">
                {currentEvaluationPeriod
                  ? currentEvaluationPeriod.name
                  : '評価期間を作成して設定してください'}
              </p>
            </div>
            <EvaluationPeriodSelect evaluationPeriods={evaluationPeriods} />
          </div>
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
          <ProgressBar
            sectionRates={[{ label: '進捗率', rate: 100 }]}
            label="評価進捗"
          />
          <div className="flex gap-10 justify-around">
            <div className="flex flex-col aspect-square w-full max-w-45 items-center justify-center gap-1 border rounded-xl p-5">
              <span className="flex gap-1 items-center text-sm sm:text-lg text-green-400">
                <Icons.Check className="w-5 h-5" />
                完了
              </span>
              <span className="text-2xl sm:text-3xl text-muted-foreground font-bold">
                21人
              </span>
            </div>
            <div className="flex flex-col aspect-square w-full max-w-45 items-center justify-center gap-1 border rounded-xl p-5">
              <span className="flex gap-1 items-center text-sm sm:text-lg text-gray-400">
                <Icons.Users className="w-5 h-5" />
                未完了
              </span>
              <span className="text-2xl sm:text-3xl text-muted-foreground font-bold">
                9人
              </span>
            </div>
          </div>
          <Label>
            <span className="size-2 bg-primary rounded-full" />
            未評価スタッフ一覧
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pb-4">
                <div className="flex flex-col justify-center gap-y-5">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center overflow-hidden shrink-0">
                      <Icons.UserCircle className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-sm">山田太郎</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-primary">
                    <span>評価する</span>
                    <Icons.ArrowBigRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
