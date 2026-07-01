import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EvaluationPeriodSelect from './evaluation-period-select';
import { Tables } from '../../../../../types/supabase';
import SectionEvaluationLayout from '@/components/evaluation/section-evaluation-layout';
import SectionEvaluationDetail from '@/components/evaluation/section-evaluation-detail';
import { Label } from '@/components/ui/label';
import SectionTitle from '@/components/shared/section-title';
import ProgressBar from '@/components/evaluation/progress-bar';
import { FormattedSectionRate } from '@/lib/utils/evaluation-format';
import { Staff } from '../../../../../types/staff';
import StaffList from './staff-list';

type EvaluationPeriod = Pick<
  Tables<'evaluation_periods'>,
  'id' | 'name' | 'is_current'
>;

type EvaluationSectionProps = {
  evaluationPeriods: EvaluationPeriod[];
  currentEvaluationPeriod?: EvaluationPeriod;
  rate: number;
  rank: string;
  skillRate: number;
  hospitalityRate: number;
  cleanlinessRate: number;
  formattedData: FormattedSectionRate[];
  progressRate: number;
  completedStaffs: number;
  notStartedStaffs: number;
  draftStaffs: number;
  unevaluatedStaffLists: Staff[];
  draftStaffLists: Staff[];
  label: string;
};

export default function EvaluationSection({
  evaluationPeriods,
  currentEvaluationPeriod,
  rank,
  rate,
  skillRate,
  hospitalityRate,
  cleanlinessRate,
  formattedData,
  progressRate,
  completedStaffs,
  notStartedStaffs,
  draftStaffs,
  unevaluatedStaffLists,
  draftStaffLists,
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
        <div className="max-w-200 mx-auto space-y-16">
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
          <SectionTitle>店舗全体評価</SectionTitle>
          <SectionEvaluationLayout>
            <SectionEvaluationDetail
              rank={rank}
              rate={rate}
              skillRate={skillRate}
              hospitalityRate={hospitalityRate}
              cleanlinessRate={cleanlinessRate}
              categoryItems={formattedData}
            />
          </SectionEvaluationLayout>
          <ProgressBar
            sectionRates={[{ label: '進捗率', rate: progressRate }]}
            label="評価進捗"
          />
          <div className="flex flex-col lg:flex-row gap-5 items-center">
            <div className="flex gap-5 w-full items-center justify-between border rounded-xl px-8 py-5">
              <span className="flex items-center text-sm sm:text-lg text-green-400">
                <Icons.Check className="w-5 h-5" />
                完了
              </span>
              <span className="text-2xl sm:text-3xl text-muted-foreground font-bold">
                {completedStaffs}
              </span>
            </div>
            <div className="flex gap-5 w-full items-center justify-between border rounded-xl px-8 py-5">
              <span className="flex gap-1 items-center text-sm sm:text-lg text-gray-400">
                <Icons.Users className="w-5 h-5" />
                未完了
              </span>
              <span className="text-2xl sm:text-3xl text-muted-foreground font-bold">
                {notStartedStaffs}
              </span>
            </div>
            <div className="flex gap-5 w-full items-center justify-between border rounded-xl px-8 py-5">
              <span className="flex gap-1 items-center text-sm sm:text-lg text-blue-400">
                <Icons.Edit3 className="w-5 h-5" />
                下書き
              </span>
              <span className="text-2xl sm:text-3xl text-muted-foreground font-bold">
                {draftStaffs}
              </span>
            </div>
          </div>
          <StaffList
            currentEvaluationPeriod={currentEvaluationPeriod?.id}
            staffs={unevaluatedStaffLists}
            title="未完了スタッフ一覧"
          />
          <StaffList
            currentEvaluationPeriod={currentEvaluationPeriod?.id}
            staffs={draftStaffLists}
            title="下書きスタッフ一覧"
          />
        </div>
      </CardContent>
    </Card>
  );
}
