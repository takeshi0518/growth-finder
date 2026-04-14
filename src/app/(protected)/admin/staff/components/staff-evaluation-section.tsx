import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tables } from '../../../../../../types/supabase';
import { Icons } from '@/components/icon/icons';
import {
  ChartDataPoint,
  ExistingEvaluation,
} from '../../../../../../types/evaluations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverallEvaluation from '../[staffId]/components/overall-evaluation';
import BasicEvaluation from '../[staffId]/components/basic-evaluation';

type EvaluationPeriod = Pick<Tables<'evaluation_periods'>, 'id' | 'name'>;

type StaffEvaluationSectionProps = {
  selectedPeriod: EvaluationPeriod;
  targetEvaluation: ExistingEvaluation;
  chartData: ChartDataPoint[];
};

export default function StaffEvaluationSection({
  selectedPeriod,
  targetEvaluation,
  chartData,
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
      <CardContent className="mt-6">
        <p className="flex items-center gap-2 mb-6 text-md font-bold">
          <Icons.ClipboardPenLine className="w-5 h-5" />
          <span>各セクション評価</span>
        </p>

        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto w-full">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
            >
              総合
            </TabsTrigger>
            <TabsTrigger
              value="basic"
              className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
            >
              基本動作
            </TabsTrigger>
            <TabsTrigger
              value="barista"
              className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
            >
              バリスタ
            </TabsTrigger>
            <TabsTrigger
              value="cashier"
              className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
            >
              キャッシャー
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <OverallEvaluation
              targetEvaluation={targetEvaluation}
              chartData={chartData}
            />
          </TabsContent>
          <TabsContent value="basic">
            <BasicEvaluation targetEvaluation={targetEvaluation} />
          </TabsContent>
          <TabsContent value="barista"></TabsContent>
          <TabsContent value="cashier"></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
