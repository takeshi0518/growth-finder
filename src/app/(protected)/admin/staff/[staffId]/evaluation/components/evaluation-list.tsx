import { Card, CardContent, CardHeader } from '@/components/ui/card';
import EvaluationItemList from './evaluation-itemList';

export default function EvaluationList() {
  return (
    <Card className="w-full max-w-200 mx-auto">
      <CardHeader className="flex items-center justify-around">
        {/* <div className="text-sm bg-primary/10 rounded-xl p-2">評価項目</div>
        <div className="text-sm bg-primary/10 rounded-xl p-2">スコア</div> */}
      </CardHeader>
      <CardContent>
        <EvaluationItemList />
      </CardContent>
    </Card>
  );
}
