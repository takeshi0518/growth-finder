import { SCORE_COLORS, SCORE_OPTIONS } from '@/lib/constants/evaluation-items';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  EvaluationItem as EvaluationItemType,
  EvaluationItemConstant,
  Category,
} from '../../../types/evaluations';
import { Label } from '../ui/label';
import { useState } from 'react';
import {
  filterEvaluationItemsByCategory,
  isCategoryType,
} from '@/lib/utils/evaluation-utils';

type SectionTabProps = {
  items: {
    skill: EvaluationItemConstant[];
    hospitality: EvaluationItemConstant[];
    cleanliness: EvaluationItemConstant[];
  };
  targetEvaluationItems: EvaluationItemType[];
};

type EvaluationListProps = {
  evaluationItems: EvaluationItemConstant[];
  evaluatedItems: EvaluationItemType[];
};

type EvaluationItemProps = {
  itemName: string;
  checkPoints: string[] | null;
  evaluatedItems: EvaluationItemType[];
};

export default function SectionTab({
  items,
  targetEvaluationItems,
}: SectionTabProps) {
  const {
    skill: skillItems,
    hospitality: hospitalityItems,
    cleanliness: cleanlinessItems,
  } = items;
  const [activeTab, setActiveTab] = useState<Category>('skill');
  const evaluationItems = filterEvaluationItemsByCategory(
    targetEvaluationItems,
    activeTab
  );

  const handleTabChange = (v: string) => {
    if (isCategoryType(v)) {
      setActiveTab(v);
    }
  };

  return (
    <div>
      <Label>
        <span className="size-2 bg-primary rounded-full" />
        各セクション詳細スコア
      </Label>
      <Tabs
        defaultValue="skill"
        className="mt-8"
        onValueChange={(v) => handleTabChange(v)}
      >
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
          <EvaluationList
            evaluationItems={skillItems}
            evaluatedItems={evaluationItems}
          />
        </TabsContent>
        <TabsContent value="hospitality">
          <EvaluationList
            evaluationItems={hospitalityItems}
            evaluatedItems={evaluationItems}
          />
        </TabsContent>
        <TabsContent value="cleanliness">
          <EvaluationList
            evaluationItems={cleanlinessItems}
            evaluatedItems={evaluationItems}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EvaluationList({
  evaluationItems,
  evaluatedItems,
}: EvaluationListProps) {
  return (
    <Card className="w-full max-w-200 mx-auto mt-6">
      <CardContent>
        <Accordion type="single" collapsible>
          {evaluationItems.map((item) => (
            <EvaluationItem
              key={item.item_name}
              itemName={item.item_name}
              checkPoints={item.check_points ?? []}
              evaluatedItems={evaluatedItems}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

function EvaluationItem({
  itemName,
  checkPoints,
  evaluatedItems,
}: EvaluationItemProps) {
  const currentScore = evaluatedItems.find(
    (item) => item.item_name === itemName
  )?.score;
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
              className={`w-7 h-7 rounded-full border text-xs flex items-center justify-center ${
                currentScore === score ? SCORE_COLORS[score] : ''
              }`}
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
