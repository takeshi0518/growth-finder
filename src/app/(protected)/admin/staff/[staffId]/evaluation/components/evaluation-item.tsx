import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tables } from '../../../../../../../../types/supabase';
import { EvaluationInput } from '@/lib/validations/schemas';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import {
  Category,
  SectionType,
} from '../../../../../../../../types/evaluations';
import { SCORE_OPTIONS, SCORE_COLORS } from '@/lib/constants/evaluation-items';

type EvaluationItemData = Pick<
  Tables<'evaluation_items'>,
  'item_name' | 'check_points'
>;

type EvaluationItemProps = {
  setValue: UseFormSetValue<EvaluationInput>;
  watch: UseFormWatch<EvaluationInput>;
  sectionType: SectionType;
  category: Category;
} & EvaluationItemData;

export default function EvaluationItem({
  item_name,
  watch,
  check_points,
  sectionType,
  category,
  setValue,
}: EvaluationItemProps) {
  const currentScore = watch(`${sectionType}.${category}.${item_name}`);
  const handleScoring = (score: number) => {
    setValue(`${sectionType}.${category}.${item_name}`, score);
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
                currentScore === score ? SCORE_COLORS[score] : ''
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
