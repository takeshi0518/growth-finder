'use client';

import { Icons } from '@/components/icon/icons';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SectionTab from './section-tab';
import { Button } from '@/components/ui/button';
import { EvaluationItemConstant } from '../../../../../../../../types/evaluations';

type EvaluationFormProps = {
  basicSkillItems: EvaluationItemConstant[];
  basicHospitalityItems: EvaluationItemConstant[];
  basicCleanlinessItems: EvaluationItemConstant[];
  cashierSkillItems: EvaluationItemConstant[];
  cashierHospitalityItems: EvaluationItemConstant[];
  cashierCleanlinessItems: EvaluationItemConstant[];
  baristaSkillItems: EvaluationItemConstant[];
  baristaHospitalityItems: EvaluationItemConstant[];
  baristaCleanliness: EvaluationItemConstant[];
};

export default function EvaluationForm({
  basicSkillItems,
  basicHospitalityItems,
  basicCleanlinessItems,
  cashierSkillItems,
  cashierHospitalityItems,
  cashierCleanlinessItems,
  baristaSkillItems,
  baristaHospitalityItems,
  baristaCleanliness,
}: EvaluationFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.ClipboardPenLine className="w-4 h-4" />
          各セクション評価入力
        </CardTitle>
      </CardHeader>
      <form>
        <CardContent className="mb-6">
          <Tabs defaultValue="all">
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

            <TabsContent value="all"></TabsContent>
            <TabsContent value="basic">
              <SectionTab
                skillItems={basicSkillItems}
                hospitalityItems={basicHospitalityItems}
                cleanlinessItems={basicCleanlinessItems}
              />
            </TabsContent>
            <TabsContent value="cashier">
              <SectionTab
                skillItems={cashierSkillItems}
                hospitalityItems={cashierHospitalityItems}
                cleanlinessItems={cashierCleanlinessItems}
              />
            </TabsContent>
            <TabsContent value="barista">
              <SectionTab
                skillItems={baristaSkillItems}
                hospitalityItems={baristaHospitalityItems}
                cleanlinessItems={baristaCleanliness}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-around">
          <Button variant="secondary">下書き</Button>
          <Button variant="default">保存</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
