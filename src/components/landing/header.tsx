import Link from 'next/link';
import HeaderNav from '@/components/landing/header-nav';
import MainLogo from '../shared/main-logo';
import Container from './container';

export default function Header() {
  return (
    <header className="fixed left-0 top-4 right-0 z-50 px-4 mx-w-[1440px]">
      <Container className="px-5 sm:px-8 h-14 md:h-16 flex items-center justify-between bg-background/80 shadow-sm backdrop-blur-sm rounded-2xl border">
        <MainLogo />

        <HeaderNav />
      </Container>
    </header>
  );
}
