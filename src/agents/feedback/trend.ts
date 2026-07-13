import type { TrendDirection } from './types';

const THRESHOLD = 5;
const RECENT_COUNT = 3;

export function judgeDirection(rates: number[]): TrendDirection {
  if (rates.length <= RECENT_COUNT) return 'stable';

  const recent = rates.slice(-RECENT_COUNT); //直近3件
  const earlier = rates.slice(0, -RECENT_COUNT); //それ以前

  const recentAvg = average(recent);
  const earlierAvg = average(earlier);
  const diff = recentAvg - earlierAvg;

  if (diff > THRESHOLD) return 'improving';
  if (diff < -THRESHOLD) return 'declining';
  return 'stable';
}

function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}
