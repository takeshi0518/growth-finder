import { Icons } from '../icon/icons';

type DemoBannerProps = {
  isDemo: boolean;
};

export default function DemoBanner({ isDemo }: DemoBannerProps) {
  if (!isDemo) return null;

  return (
    <div className="max-w-7xl mx-auto sticky top-20 sm:top-5 z-50 px-4">
      <div className="flex items-center gap-2 justify-center bg-yellow-400 text-yellow-900 text-sm rounded-3xl p-2">
        <Icons.TriangleAlert />
        デモモードで閲覧中です
      </div>
    </div>
  );
}
