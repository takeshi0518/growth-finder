'use client';

import { Label } from '../ui/label';

type ProgressBarProps = {
  label: string;
  sectionRates: { label: string; rate: number }[];
};

export default function ProgressBar({ label, sectionRates }: ProgressBarProps) {
  return (
    <div className="lg:flex-1">
      <Label>
        <span className="size-2 bg-primary rounded-full" />
        {label}
      </Label>
      <div className="mt-5  border rounded-xl p-5 sm:p-8">
        <div className="space-y-5">
          {sectionRates.map((section) => (
            <div key={section.label} className="flex items-center gap-1">
              <span className="text-xs w-22 sm:w-24 shrink-0">
                {section.label}
              </span>
              <div className="flex-1 rounded-full h-5 md:h-7 bg-primary/10">
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
    </div>
  );
}
