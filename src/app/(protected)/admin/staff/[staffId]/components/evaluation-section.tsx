import { Icons } from '@/components/icon/icons';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const dummyPeriods = [
  { id: '1', name: '2025年4月〜5月' },
  { id: '2', name: '2025年6月〜7月' },
  { id: '3', name: '2025年8月〜9月' },
];
export default function EvaluationSection() {
  return (
    <div className="mt-3">
      <Select>
        <SelectTrigger size="sm">
          <Icons.CalendarDays className="w-4 h-4" />
          <SelectValue placeholder="評価期間" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>評価期間を選択</SelectLabel>
            {dummyPeriods.map((period) => (
              <SelectItem
                key={period.id}
                value={period.name}
                className="cursor-pointer"
              >
                {period.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
