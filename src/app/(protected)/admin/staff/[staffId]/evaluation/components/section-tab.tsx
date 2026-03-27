import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EvaluationList from './evaluation-list';
import {
  EvaluationItemConstant,
  SectionType,
} from '../../../../../../../../types/evaluations';
import { useRef, useState } from 'react';
import FeedbackCommets from './feedback-commets';
import { UseFormSetValue } from 'react-hook-form';
import { EvaluationInput } from '@/lib/validations/schemas';

type SectionTablProps = {
  skillItems: EvaluationItemConstant[];
  hospitalityItems: EvaluationItemConstant[];
  cleanlinessItems: EvaluationItemConstant[];
  sectionType: SectionType;
  setValue: UseFormSetValue<EvaluationInput>;
};

export default function SectionTab({
  skillItems,
  hospitalityItems,
  cleanlinessItems,
  sectionType,
  setValue,
}: SectionTablProps) {
  const [activeTab, setActiveTab] = useState<
    'skill' | 'hospitality' | 'cleanliness'
  >('skill');
  const stickyRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (v: string) => {
    setActiveTab(v as 'skill' | 'hospitality' | 'cleanliness');

    const offset = window.innerWidth >= 768 ? 0 : 80;
    if (stickyRef.current) {
      const top =
        stickyRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - offset, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Tabs
        defaultValue="skill"
        className="mt-8"
        onValueChange={(v) => handleTabChange(v)}
        ref={stickyRef}
      >
        <div className="sticky top-20 rounded-2xl md:top-5 bg-card/80 backdrop-blur-sm z-10">
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
            setValue={setValue}
            sectionType={sectionType}
            category="skill"
          />
        </TabsContent>

        <TabsContent value="hospitality">
          <EvaluationList
            evaluationItems={hospitalityItems}
            setValue={setValue}
            sectionType={sectionType}
            category="hospitality"
          />
        </TabsContent>

        <TabsContent value="cleanliness">
          <EvaluationList
            evaluationItems={cleanlinessItems}
            setValue={setValue}
            sectionType={sectionType}
            category="cleanliness"
          />
        </TabsContent>
      </Tabs>
      <FeedbackCommets activeCategory={activeTab} />
    </>
  );
}
