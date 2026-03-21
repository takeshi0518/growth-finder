'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function EvaluationItemList() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item1" className="border-b last:border-b-0">
        <AccordionTrigger className="no-underline hover:no-underline">
          <div className="w-full flex flex-col justify-center sm:flex-row sm:items-center gap-3">
            <div className="text-xs text-center sm:flex-1">
              経営理念に沿った行動
            </div>
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
            <span>・内容を理解して、自らどう行動するか目標に出来ている</span>
            <span>・内容を理解して、自らどう行動するか目標に出来ている</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
