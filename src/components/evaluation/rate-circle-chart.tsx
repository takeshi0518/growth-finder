'use client';

import { CHART_COLORS } from '@/lib/constants/chart-colors';
import { Pie, PieChart } from 'recharts';

type RateCircleChartProps = {
  rate: number;
  rank: string;
};

export default function RateCircleChart({ rate, rank }: RateCircleChartProps) {
  const endAngle = 90 - 360 * (rate / 100);
  return (
    <>
      <div className="flex items-center gap-5 mb-5 justify-center">
        <div className="text-2xl sm:text-3xl">総合評価</div>
        <div className="text-3xl sm:text-4xl">{rank}</div>
      </div>
      <div className="relative flex items-center justify-center">
        <PieChart width={200} height={200}>
          <Pie
            data={[{ value: 100 }]}
            innerRadius={70}
            outerRadius={90}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            fill={CHART_COLORS.background}
          />
          <Pie
            data={[{ value: rate }]}
            innerRadius={70}
            outerRadius={90}
            startAngle={90}
            endAngle={endAngle}
            dataKey="value"
            fill={CHART_COLORS.primary}
            isAnimationActive={true}
            animationDuration={1800}
          />
        </PieChart>
        <div className="absolute text-3xl font-bold">{rate}%</div>
      </div>
    </>
  );
}
