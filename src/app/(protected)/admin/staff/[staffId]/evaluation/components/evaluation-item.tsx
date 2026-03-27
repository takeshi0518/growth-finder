import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tables } from '../../../../../../../../types/supabase';
import { EvaluationInput } from '@/lib/validations/schemas';
import { UseFormSetValue } from 'react-hook-form';
import {
  Category,
  SectionType,
} from '../../../../../../../../types/evaluations';
import { useState } from 'react';
import { SCORE_OPTIONS } from '@/lib/constants/evaluation-items';

type EvaluationItemData = Pick<
  Tables<'evaluation_items'>,
  'item_name' | 'check_points'
>;

type EvaluationItemProps = {
  setValue: UseFormSetValue<EvaluationInput>;
  sectionType: SectionType;
  category: Category;
} & EvaluationItemData;

export default function EvaluationItem({
  item_name,
  check_points,
  sectionType,
  category,
  setValue,
}: EvaluationItemProps) {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const handleScoring = (score: number) => {
    setSelectedScore(score);
    setValue(`${sectionType}.${category}.${item_name}`, score);
  };

  const scoreColors: Record<number, string> = {
    1: 'bg-red-100 text-red-600 border-red-300',
    2: 'bg-yellow-100 text-yellow-600 border-yellow-300',
    3: 'bg-blue-100 text-blue-600 border-blue-300',
    4: 'bg-green-100 text-green-600 border-green-300',
  };
  return (
    <AccordionItem value={item_name} className="border-b last:border-b-0">
      <div className="flex flex-col sm:grid grid-cols-[1fr_auto] sm:items-center">
        <AccordionTrigger className="sm:pr-4 no-underline hover:no-underline">
          <div className="text-xs text-left ">{item_name}</div>
        </AccordionTrigger>
        <div className="flex items-center justify-center py-2 gap-4 sm:px-4 sm:py-0 lg:gap-6">
          {SCORE_OPTIONS.map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => handleScoring(score)}
              className={`w-7 h-7 rounded-full border text-xs flex items-center justify-center ${
                selectedScore === score ? scoreColors[score] : ''
              }`}
            >
              {score}
            </button>
          ))}
        </div>
      </div>
      <AccordionContent>
        <div className="text-xs flex flex-wrap gap-2">
          {check_points?.map((point, index) => (
            <span key={index}>{`・${point}`}</span>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
