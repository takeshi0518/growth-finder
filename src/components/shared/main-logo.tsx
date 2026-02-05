import Image from 'next/image';
import Link from 'next/link';

export default function MainLogo() {
  return (
    <Link href="/">
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
