import { Card, CardContent, CardHeader } from '@/components/ui/card';
import EvaluationComments from './evaluation-comments';

export default function EvaluationList() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-around">
        <div className="text-sm bg-primary/10 rounded-xl p-2">評価項目</div>
        <div className="text-sm bg-primary/10 rounded-xl p-2">スコア</div>
      </CardHeader>
      <CardContent>
        {/* Todo: evaluation-itemをループ */}
        <EvaluationComments />
      </CardContent>
    </Card>
  );
}
