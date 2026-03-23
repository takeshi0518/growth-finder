import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tables } from '../../../../../../../../types/supabase';

type EvaluationItemProps = Pick<
  Tables<'evaluation_items'>,
  'item_name' | 'check_points'
>;

export default function EvaluationItem({
  item_name,
  check_points,
}: EvaluationItemProps) {
  return (
    <AccordionItem value={item_name} className="border-b last:border-b-0">
      <AccordionTrigger className="no-underline hover:no-underline">
        <div className="w-full flex flex-col justify-center sm:flex-row sm:items-center gap-3">
          <div className="text-xs text-left sm:flex-1">{item_name}</div>
          <div className="flex sm:flex-1 items-center justify-center gap-3 lg:gap-6">
            {[1, 2, 3, 4].map((score) => (
              <div
                key={score}
                className="w-7 h-7 rounded-full border text-xs flex items-center justify-center"
              >
                {score}
              </div>
            ))}
          </div>
        </div>
      </AccordionTrigger>
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
