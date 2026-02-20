'use client';

import Image from 'next/image';
import Link from 'next/link';

type MainLogoProps = {
  onClick?: () => void;
};

export default function MainLogo({ onClick }: MainLogoProps) {
  const handleClick = () => {
    onClick?.();
  };
  return (
    <Link href="/" onClick={handleClick}>
      <Image
        src="/svg/logo.svg"
        width={160}
        height={40}
        alt="Growth Finder"
        priority
        aria-label="Growth Finder ホームページへ"
        className="h-9 sm:h-10 w-auto"
      />
    </Link>
  );
}
