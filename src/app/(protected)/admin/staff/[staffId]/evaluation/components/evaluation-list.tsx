import { Card, CardContent, CardHeader } from '@/components/ui/card';
import EvaluationItemList from './evaluation-itemList';

export default function EvaluationList() {
  return (
    <Card className="w-full max-w-200 mx-auto">
      <CardHeader className="flex items-center justify-around"></CardHeader>
      <CardContent>
        <EvaluationItemList />
      </CardContent>
    </Card>
  );
}
