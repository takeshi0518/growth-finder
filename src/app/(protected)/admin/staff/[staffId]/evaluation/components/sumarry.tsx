import { Card, CardContent } from '@/components/ui/card';
import { ExistingEvaluation } from '../../../../../../../../types/evaluations';
import { calcEvaluation } from '@/lib/utils/evaluation-calc';
import { Label } from '@/components/ui/label';

type SummaryProps = {
  existingEvaluations: ExistingEvaluation;
};

export default function Summary({ existingEvaluations }: SummaryProps) {
  const { rate: completionRate, rank: overallEvaluations } = calcEvaluation(
    existingEvaluations.evaluation_sections
  );
  return (
    <>
      <div className="mt-6 max-w-200 mx-auto">
        <Label>サマリー</Label>
        <Card className="mt-2">
          <CardContent className="flex justify-around items-center py-4">
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm text-muted-foreground">総合評価</p>
              <p className="text-2xl font-bold">{overallEvaluations}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm text-muted-foreground">総合達成率</p>
              <p className="text-2xl font-bold">{`${completionRate}%`}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 max-w-200 mx-auto">
        <Label>基本動作</Label>
        <Card className="mt-2">
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              <div className="flex flex-col items-center gap-1">
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                  総合評価
                </p>
                <p className="text-2xl font-bold">A</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                  総合達成率
                </p>
                <p className="text-2xl font-bold">100%</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                  スキル達成率
                </p>
                <p className="text-2xl font-bold">100%</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                  ホスピタリティ達成率
                </p>
                <p className="text-2xl font-bold">100%</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                  クレンリネス達成率
                </p>
                <p className="text-2xl font-bold">100%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
