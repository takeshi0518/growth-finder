import Image from 'next/image';

export default function RealScreen() {
  return (
    <div className="pt-16 pb-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl mb-12 text-center font-bold">
          実際の画面
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <Image
              src="/images/dummy-large.png"
              alt="Growth Finderのダッシュボード画像"
              priority
              width={1000}
              height={600}
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div>
            <Image
              src="/images/dummy-large.png"
              alt="Growth Finderの評価入力画面"
              width={1000}
              height={600}
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div>
            <Image
              src="/images/dummy-large.png"
              alt="Growth Finderのレーダーチャート画像"
              width={1000}
              height={600}
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
