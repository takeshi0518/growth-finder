import { Card, CardContent } from '@/components/ui/card';
import {
  ExistingEvaluation,
  ExistingEvaluationSection,
} from '../../../../../../../../types/evaluations';

type SummaryProps = {
  existingEvaluations: ExistingEvaluation;
};

export default function Summary({ existingEvaluations }: SummaryProps) {
  const calcRate = (sections: ExistingEvaluationSection[]) => {
    const totalScore = sections.reduce(
      (sum, section) =>
        sum +
        section.skill_score +
        section.hospitality_score +
        section.cleanliness_score,
      0
    );
    const totalMax = sections.reduce(
      (sum, section) =>
        sum +
        section.skill_max +
        section.hospitality_max +
        section.cleanliness_max,
      0
    );

    return Math.floor((totalScore / totalMax) * 100);
  };

  const calcRank = (rate: number) => {
    if (rate >= 90) return 'A';
    if (rate >= 70) return 'B';
    if (rate >= 50) return 'C';
    return 'D';
  };

  const completionRate = calcRate(existingEvaluations.evaluation_sections);

  const overallEvaluations = calcRank(completionRate);

  return (
    <Card className="mt-10">
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
