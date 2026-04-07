import { Card, CardContent } from '@/components/ui/card';
import {
  ExistingEvaluation,
  ExistingEvaluationSection,
  SectionType,
} from '../../../../../../../../types/evaluations';
import { calcEvaluation } from '@/lib/utils/evaluation-calc';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icon/icons';

type SummaryProps = {
  existingEvaluations: ExistingEvaluation;
};

type SectionSummaryCardProps = {
  section: ExistingEvaluationSection;
};

const sectionLabel = {
  basic: '基本動作',
  barista: 'バリスタ',
  cashier: 'キャッシャー',
};

function SectionSummaryCard({ section }: SectionSummaryCardProps) {
  const { rate, rank, skillRate, hospitalityRate, cleanlinessRate } =
    calcEvaluation([section]);

  return (
    <div className="mt-6 max-w-200 mx-auto">
      <Label>
        <div className="size-2 bg-primary rounded-full" />
        {sectionLabel[section.section_type as SectionType]}
      </Label>
      <Card className="mt-2">
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col items-center gap-1">
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                総合評価
              </p>
              <p className="text-2xl font-bold">{rank}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                総合達成率
              </p>
              <p className="text-2xl font-bold">{`${rate}%`}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-4 pt-4 border-t">
            <div className="flex flex-col items-center gap-1">
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                スキル達成率
              </p>
              <p className="text-2xl font-bold">{`${skillRate}%`}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                ホスピタリティ達成率
              </p>
              <p className="text-2xl font-bold">{`${hospitalityRate}%`}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                クレンリネス達成率
              </p>
              <p className="text-2xl font-bold">{`${cleanlinessRate}%`}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-4 border-t">
            <div className="flex-1 p-1">
              <div className="flex items-center gap-2 text-xs mb-4 text-primary">
                <Icons.ThumbsUp className="w-4 h-4" />
                良かった点
              </div>
              <ul className="flex flex-wrap text-xs gap-2">
                {section.good_points?.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 bg-primary/10 rounded-2xl px-2 py-1"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 p-1">
              <div className="flex items-center gap-2 text-xs mb-4 text-primary">
                <Icons.Sprout className="w-4 h-4" />
                もっと良くなる点
              </div>
              <ul className="flex flex-wrap text-xs gap-2">
                {section.improvement_points?.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 bg-primary/10 rounded-2xl px-2 py-1"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Summary({ existingEvaluations }: SummaryProps) {
  const { rate, rank } = calcEvaluation(
    existingEvaluations.evaluation_sections
  );
  return (
    <>
      <div className="mt-10 max-w-200 mx-auto">
        <Label>
          <div className="size-2 bg-primary rounded-full" />
          サマリー
        </Label>
        <Card className="mt-2">
          <CardContent className="flex justify-around items-center py-4">
            <div className="flex flex-col flex-1 items-center gap-1 border-r">
              <p className="text-sm text-muted-foreground">総合評価</p>
              <p className="text-2xl font-bold">{rank}</p>
            </div>
            <div className="flex flex-col flex-1 items-center gap-1">
              <p className="text-sm text-muted-foreground">総合達成率</p>
              <p className="text-2xl font-bold">{`${rate}%`}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {existingEvaluations.evaluation_sections.map((section) => (
        <SectionSummaryCard key={section.section_type} section={section} />
      ))}
    </>
  );
}
