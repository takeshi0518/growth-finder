'use client';

import { RANKCOLOR } from '@/lib/constants/rank-color';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Icons } from '../icon/icons';

type OverallScoreProps = {
  rank: string;
};

export default function OverallScore({ rank }: OverallScoreProps) {
  return (
    <div className="relative border rounded-xl p-5">
      <div className="absolute top-3 right-5">
        <Tooltip>
          <TooltipTrigger>
            <div className="rounded-full p-1 bg-yellow-100">
              <Icons.Lightbulb className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1 text-xs p-2">
              <p>A: 90%〜100%</p>
              <p>B: 70%〜89%</p>
              <p>C: 50%〜69%</p>
              <p>D: 49%以下</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="w-full flex items-center gap-5 justify-center">
        <div className="text-xl sm:text-xl">総合評価</div>
        <div className={`text-3xl sm:text-4xl ${RANKCOLOR[rank]}`}>{rank}</div>
      </div>
    </div>
  );
}
