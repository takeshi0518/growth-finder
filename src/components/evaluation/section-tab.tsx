import { SCORE_OPTIONS } from '@/lib/constants/evaluation-items';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { EvaluationItemConstant } from '../../../types/evaluations';
import { Label } from '../ui/label';

type SectionTabProps = {
  skillItems: EvaluationItemConstant[];
  hospitalityItems: EvaluationItemConstant[];
  cleanlinessItems: EvaluationItemConstant[];
};

type EvaluationListProps = {
  evaluationItems: EvaluationItemConstant[];
};

type EvaluationItemProps = {
  itemName: string;
  checkPoints: string[] | null;
};

function EvaluationItem({ itemName, checkPoints }: EvaluationItemProps) {
  return (
    <AccordionItem value={itemName} className="border-b last:border-b-0">
      <div className="flex flex-col sm:grid grid-cols-[1fr_auto] sm:items-center">
        <AccordionTrigger className="sm:pr-4 no-underline hover:no-underline">
          <div className="text-xs text-left">{itemName}</div>
        </AccordionTrigger>
        <div className="flex items-center justify-center py-2 gap-4 sm:px-4 sm:py-0 lg:gap-6">
          {SCORE_OPTIONS.map((score) => (
            <div
              key={score}
              className="w-7 h-7 rounded-full border text-xs flex items-center justify-center"
            >
              {score}
            </div>
          ))}
        </div>
      </div>
      <AccordionContent>
        <div className="text-xs flex flex-wrap gap-2">
          {checkPoints?.map((point, index) => (
            <span key={index}>{`・${point}`}</span>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function EvaluationList({ evaluationItems }: EvaluationListProps) {
  return (
    <Card className="w-full max-w-200 mx-auto mt-6">
      <CardContent>
        <Accordion type="single" collapsible>
          {evaluationItems.map((item) => (
            <EvaluationItem
              key={item.item_name}
              itemName={item.item_name}
              checkPoints={item.check_points ?? []}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default function SectionTab({
  skillItems,
  hospitalityItems,
  cleanlinessItems,
}: SectionTabProps) {
  return (
    <div>
      <Label>
        <span className="size-2 bg-primary rounded-full" />
        各セクション詳細スコア
      </Label>
      <Tabs defaultValue="skill" className="mt-8">
        <div className="rounded-2xl">
          <div className="flex justify-center">
            <TabsList variant="line" className="h-auto w-full max-w-lg">
              <TabsTrigger
                value="skill"
                className="data-[state=active]:after:bg-primary data-[state=active]:after:w-1/2 data-[state=active]:after:mx-auto"
              >
                スキル
              </TabsTrigger>
              <TabsTrigger
                value="hospitality"
                className="data-[state=active]:after:bg-primary data-[state=active]:after:w-1/2 data-[state=active]:after:mx-auto"
              >
                ホスピタリティ
              </TabsTrigger>
              <TabsTrigger
                value="cleanliness"
                className="data-[state=active]:after:bg-primary data-[state=active]:after:w-1/2 data-[state=active]:after:mx-auto"
              >
                クレンリネス
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex flex-col max-w-200 mx-auto items-center space-y-3 rounded-2xl mt-6 p-3 bg-muted-foreground/3">
            <h2 className="text-sm">スコア基準</h2>
            <div className="grid grid-cols-2 gap-y-1 gap-x-8 text-[8px] sm:text-xs text-muted-foreground">
              <p className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                指導できる…4点
              </p>
              <p className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                理解している…3点
              </p>
              <p className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />
                サポートが必要…2点
              </p>
              <p className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                理解不足…1点
              </p>
            </div>
          </div>
        </div>

        <TabsContent value="skill">
          <EvaluationList evaluationItems={skillItems} />
        </TabsContent>
        <TabsContent value="hospitality">
          <EvaluationList evaluationItems={hospitalityItems} />
        </TabsContent>
        <TabsContent value="cleanliness">
          <EvaluationList evaluationItems={cleanlinessItems} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
