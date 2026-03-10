import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CreateEvaluationPeriodDialog from './create-evaluation-period-dialog';
import { Icons } from '@/components/icon/icons';
import { ScrollArea } from '@/components/ui/scroll-area';

const dummyData = [
  { name: '2025年3月〜2025年4月' },
  { name: '2025年5月〜2025年6月' },
  { name: '2025年7月〜2025年8月' },
  { name: '2025年10月〜2025年11月' },
  { name: '2026年1月〜2026年2月' },
  { name: '2026年4月〜2026年5月' },
];

export default function EvaluationPeriodList() {
  return (
    <Card>
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
            {dummyData.map((period) => (
              <p
                key={period.name}
                className="flex justify-between items-center text-sm p-2 border-b"
              >
                {period.name}
                <Icons.EllipsisVerticalIcon className="w-4 h-4" />
              </p>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
