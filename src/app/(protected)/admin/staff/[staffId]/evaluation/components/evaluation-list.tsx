import { Card, CardContent } from '@/components/ui/card';
import { Accordion } from '@/components/ui/accordion';
import EvaluationItem from './evaluation-item';
import { EvaluationItemConstant } from '../../../../../../../../types/evaluations';

type EvaluationListProps = {
  evaluationItems: EvaluationItemConstant[];
};

export default function EvaluationList({
  evaluationItems,
}: EvaluationListProps) {
  return (
    <Card className="w-full max-w-200 mx-auto mt-6">
      <CardContent>
        <Accordion type="single" collapsible>
          {evaluationItems.map((item) => (
            <EvaluationItem
              key={item.item_name}
              item_name={item.item_name}
              check_points={item.check_points}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
