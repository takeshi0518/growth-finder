'use client';

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
        <div className="text-2xl sm:text-4xl">総合評価</div>
        <div className="text-3xl sm:text-5xl">{rank}</div>
      </div>
      <div className="relative flex items-center justify-center">
        <PieChart width={250} height={250}>
          <Pie
            data={[{ value: 100 }]}
            innerRadius={90}
            outerRadius={110}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            fill="#e5e7eb"
          />
          <Pie
            data={[{ value: rate }]}
            innerRadius={90}
            outerRadius={110}
            startAngle={90}
            endAngle={endAngle}
            dataKey="value"
            fill="#0284c7"
          />
        </PieChart>
        <div className="absolute text-3xl font-bold">{rate}%</div>
      </div>
    </>
  );
}
