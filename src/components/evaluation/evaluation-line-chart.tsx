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
import { ChartDataPoint } from '../../../types/evaluations';

type EvaluationLineChart = {
  chartData: ChartDataPoint[];
};

export default function EvaluationLineChart({
  chartData,
}: EvaluationLineChart) {
  return (
    <div>
      <Label>
        <span className="size-2 bg-primary rounded-full" />
        総合達成率推移グラフ
      </Label>
      <span className="text-muted-foreground text-[10px]">
        ※最新から過去4件のデータを表示
      </span>

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
