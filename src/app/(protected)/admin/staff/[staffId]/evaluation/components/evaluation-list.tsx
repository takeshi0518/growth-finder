import { Card, CardContent } from '@/components/ui/card';
import { Accordion } from '@/components/ui/accordion';
import EvaluationItem from './evaluation-item';

export default function EvaluationList() {
  return (
    <Card className="w-full max-w-200 mx-auto">
      <CardContent>
        <Accordion type="single" collapsible>
          <EvaluationItem />
        </Accordion>
      </CardContent>
    </Card>
  );
}
