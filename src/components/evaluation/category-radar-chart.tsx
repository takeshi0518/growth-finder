'use client';

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { Label } from '../ui/label';
import { CHART_COLORS } from '@/lib/constants/chart-colors';

type CategoryRadarChartProps = {
  skillRate: number;
  hospitalityRate: number;
  cleanlinessRate: number;
};

export default function CategoryRadarChart({
  skillRate,
  hospitalityRate,
  cleanlinessRate,
}: CategoryRadarChartProps) {
  const data = [
    { category: 'スキル', value: skillRate },
    { category: 'ホスピタリティ', value: hospitalityRate },
    { category: 'クレンリネス', value: cleanlinessRate },
  ];
  return (
    <div>
      <Label>
        <span className="size-2 bg-primary rounded-full" />
        カテゴリ別達成率
      </Label>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart
          data={data}
          margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="category" tick={{ fontSize: 8 }} />
          <Radar
            dataKey="value"
            fill={CHART_COLORS.primary}
            stroke={CHART_COLORS.accent}
            fillOpacity={0.3}
            isAnimationActive={true}
            animationDuration={1800}
            animationEasing="ease-in-out"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
