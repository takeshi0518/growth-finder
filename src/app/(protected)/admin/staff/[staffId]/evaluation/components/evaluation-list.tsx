import { Card, CardContent } from '@/components/ui/card';
import { Accordion } from '@/components/ui/accordion';
import EvaluationItem from './evaluation-item';
import { EvaluationItemConstant } from '../../../../../../../../types/evaluations';
import { UseFormSetValue } from 'react-hook-form';
import { EvaluationInput } from '@/lib/validations/schemas';

type EvaluationListProps = {
  evaluationItems: EvaluationItemConstant[];
  setValue: UseFormSetValue<EvaluationInput>;
};

export default function EvaluationList({
  evaluationItems,
  setValue,
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
              setValue={setValue}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
