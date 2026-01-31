import Image from 'next/image';
import SectionTitle from './section-title';

const screenshots = [
  {
    src: '/images/dummy-large.png',
    alt: 'Growth Finderのダッシュボード画像',
  },
  {
    src: '/images/dummy-large.png',
    alt: 'Growth Finderの評価入力画面',
  },
  {
    src: '/images/dummy-large.png',
    alt: 'Growth Finderのスタッフ管理画面',
  },
];

type ScreenshotProps = {
  src: string;
  alt: string;
  priority?: boolean;
  isFirst?: boolean;
};

function Screenshot({ src, alt, priority, isFirst }: ScreenshotProps) {
  return (
    <div className={isFirst ? 'md:col-span-2' : ''}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        width={1000}
        height={600}
        className="rounded-lg shadow-xl w-full h-auto"
      />
    </div>
  );
}

export default function RealScreen() {
  return (
    <div className="pt-16 pb-20">
      <div className="container mx-auto px-4">
        <SectionTitle>実際の画面</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {screenshots.map((screenshot, index) => (
            <Screenshot
              key={screenshot.alt}
              {...screenshot}
              priority={index === 0}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
