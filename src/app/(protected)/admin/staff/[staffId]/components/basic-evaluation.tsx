import OverallScore from '@/components/evaluation/overall-score';
import { ExistingEvaluation } from '../../../../../../../types/evaluations';
import { calcEvaluation, getSectionRate } from '@/lib/utils/evaluation-calc';
import RateCircleChart from '@/components/evaluation/rate-circle-chart';

type BasicEvaluationProps = {
  targetEvaluation: ExistingEvaluation;
};

export default function BasicEvaluation({
  targetEvaluation,
}: BasicEvaluationProps) {
  const { sectionRates } = calcEvaluation(targetEvaluation.evaluation_sections);
  const basicSection = getSectionRate(sectionRates, 'basic');
  return (
    <div className="mt-15 max-w-200 mx-auto space-y-10">
      <OverallScore rank={basicSection?.rank ?? ''} />
      <div className="flex flex-col space-y-10 lg:flex-row lg:gap-20 lg:space-y-0">
        <div className="flex-1">
          <RateCircleChart rate={basicSection?.rate ?? 0} />
        </div>
      </div>
    </div>
  );
}
