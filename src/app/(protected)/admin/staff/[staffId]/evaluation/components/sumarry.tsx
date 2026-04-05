import { Card, CardContent } from '@/components/ui/card';
import { ExistingEvaluation } from '../../../../../../../../types/evaluations';
import { calcEvaluation } from '@/lib/utils/evaluation-calc';

type SummaryProps = {
  existingEvaluations: ExistingEvaluation;
};

export default function Summary({ existingEvaluations }: SummaryProps) {
  const { rate: completionRate, rank: overallEvaluations } = calcEvaluation(
    existingEvaluations.evaluation_sections
  );
  return (
    <Card className="mt-10 max-w-200 mx-auto">
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
  );
}
