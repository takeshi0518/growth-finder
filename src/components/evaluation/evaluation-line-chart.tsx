'use client';

import { CHART_COLORS } from '@/lib/constants/chart-colors';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { Label } from '../ui/label';

const chartData = [
  { name: '2025年12月~2026年2月', value: 65 },
  { name: '2026年6月~2026年7月', value: 78 },
  { name: '2026年8月~2026年10月', value: 89 },
];

export default function EvaluationLineChart() {
  return (
    <div>
      <Label>
        <span className="size-2 bg-primary rounded-full" />
        総合達成率推移グラフ
      </Label>

      <ResponsiveContainer width="100%" height={230} className="mt-5">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={false} />
          <YAxis domain={[0, 'auto']} />
          <Line dataKey="value" stroke={CHART_COLORS.primary} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-3">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-1 text-[10px] text-muted-foreground"
          >
            <span className="w-1 h-0.5 bg-primary inline-block" />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
