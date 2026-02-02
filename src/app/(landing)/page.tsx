import CallToAction from '@/components/landing/call-to-action';
import Feature from '@/components/landing/feature';
import Hero from '@/components/landing/hero';
import RealScreen from '@/components/landing/real-screen';
import Usage from '@/components/landing/usage';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Feature />
      <RealScreen />
      <Usage />
      <CallToAction />
    </>
  );
}
