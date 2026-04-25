'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icon/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverallEvaluation from './overall-evaluation';
import { useState } from 'react';
import {
  getEvaluationItemsBySection,
  isSectionType,
} from '@/lib/utils/evaluation-utils';
import SectionEvaluationContent from './section-evaluation-content';
import { Tables } from '../../../types/supabase';
import {
  ChartDataPoint,
  ExistingEvaluation,
  SectionType,
} from '../../../types/evaluations';

type EvaluationPeriod = Pick<Tables<'evaluation_periods'>, 'id' | 'name'>;

type StaffEvaluationSectionProps = {
  selectedPeriod: EvaluationPeriod;
  targetEvaluation: ExistingEvaluation;
  chartData: ChartDataPoint[];
};

export default function StaffEvaluationSection({
  selectedPeriod,
  targetEvaluation,
  chartData,
}: StaffEvaluationSectionProps) {
  const [activeTab, setActiveTab] = useState<SectionType>('basic');
  const handleTabChange = (v: string) => {
    if (v === 'all') return;

    if (isSectionType(v)) {
      setActiveTab(v);
    }
  };

  const targetEvaluationItems = getEvaluationItemsBySection(
    targetEvaluation.evaluation_sections,
    activeTab
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.ClipboardList className="w-5 h-5" />
          評価
        </CardTitle>
        <p className="flex items-center gap-2">
          <Icons.CalendarDays className="w-5 h-5" />
          <span className="text-muted-foreground">{selectedPeriod.name}</span>
        </p>
      </CardHeader>
      <CardContent className="mt-6">
        <p className="flex items-center gap-2 mb-6 text-md font-bold">
          <Icons.ClipboardPenLine className="w-5 h-5" />
          <span>各セクション評価</span>
        </p>

        <Tabs defaultValue="all" onValueChange={(v) => handleTabChange(v)}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto w-full">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
            >
              総合
            </TabsTrigger>
            <TabsTrigger
              value="basic"
              className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
            >
              基本動作
            </TabsTrigger>
            <TabsTrigger
              value="barista"
              className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
            >
              バリスタ
            </TabsTrigger>
            <TabsTrigger
              value="cashier"
              className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
            >
              キャッシャー
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <OverallEvaluation
              targetEvaluation={targetEvaluation}
              chartData={chartData}
            />
          </TabsContent>
          <TabsContent value="basic">
            <SectionEvaluationContent
              targetEvaluation={targetEvaluation}
              targetEvaluationItems={targetEvaluationItems}
              sectionType={activeTab}
            />
          </TabsContent>
          <TabsContent value="barista">
            <SectionEvaluationContent
              targetEvaluation={targetEvaluation}
              targetEvaluationItems={targetEvaluationItems}
              sectionType={activeTab}
            />
          </TabsContent>
          <TabsContent value="cashier">
            <SectionEvaluationContent
              targetEvaluation={targetEvaluation}
              targetEvaluationItems={targetEvaluationItems}
              sectionType={activeTab}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
