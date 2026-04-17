'use client';

import { CHART_COLORS } from '@/lib/constants/chart-colors';
import { Pie, PieChart } from 'recharts';
import { Label } from '../ui/label';

type RateCircleChartProps = {
  rate: number;
};

export default function RateCircleChart({ rate }: RateCircleChartProps) {
  const endAngle = 90 - 360 * (rate / 100);
  return (
    <div className="relative flex items-center justify-center p-5">
      <Label className="absolute top-0 left-0">
        <span className="size-2 bg-primary rounded-full" />
        達成率
      </Label>
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
  );
}
