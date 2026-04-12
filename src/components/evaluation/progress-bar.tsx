'use client';

import { Label } from '../ui/label';
import { SectionType } from '../../../types/evaluations';

type ProgressBarProps = {
  label: string;
  sectionRates: { sectionType: SectionType; rate: number }[];
};

const sectionLabel: Record<SectionType, string> = {
  basic: '基本動作',
  barista: 'バリスタ',
  cashier: 'キャッシャー',
};

export default function ProgressBar({ label, sectionRates }: ProgressBarProps) {
  return (
    <>
      <Label>
        <span className="size-2 bg-primary rounded-full" />
        {label}
      </Label>
      <div className="mt-5  border rounded-xl p-5 sm:p-8">
        <div className="space-y-5">
          {sectionRates.map((section) => (
            <div key={section.sectionType} className="flex items-center gap-1">
              <span className="text-xs sm:text-sm w-22 sm:w-24 shrink-0">
                {sectionLabel[section.sectionType]}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-5 md:h-7">
                <div
                  className="bg-primary h-5 md:h-7 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${section.rate}%` }}
                >
                  <span className="text-white text-xs">{`${section.rate}%`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
