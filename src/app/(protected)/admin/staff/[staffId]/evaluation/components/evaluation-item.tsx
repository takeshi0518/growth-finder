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
  return (
    <AccordionItem value={item_name} className="border-b last:border-b-0">
      <div className="flex flex-col sm:grid grid-cols-[1fr_auto] sm:items-center">
        <AccordionTrigger className="sm:pr-4 no-underline hover:no-underline">
          <div className="text-xs text-left ">{item_name}</div>
        </AccordionTrigger>
        <div className="flex items-center justify-center py-2 gap-4 sm:px-4 sm:py-0 lg:gap-6">
          {[1, 2, 3, 4].map((score) => (
            <button
              key={score}
              type="button"
              onClick={() =>
                setValue(`${sectionType}.${category}.${item_name}`, score)
              }
              className="w-7 h-7 rounded-full border text-xs flex items-center justify-center"
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
