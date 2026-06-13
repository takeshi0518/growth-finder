import CallToAction from './components/call-to-action';
import ProblemSolution from './components/problem-solution';
import Footer from './components/footer';
import Hero from './components/hero';
import RealScreen from './components/real-screen';
import Usage from './components/usage';
import FadeIn from './components/fade-in';

export default function LandingPage() {
  return (
    <div className="space-y-24 md:space-y-32 lg:space-y-40">
      <Hero />

      <ProblemSolution />

      <FadeIn delay={0}>
        <RealScreen />
      </FadeIn>

      <FadeIn delay={0}>
        <Usage />
      </FadeIn>

      <FadeIn delay={0}>
        <CallToAction />
      </FadeIn>
      <Footer />
    </div>
  );
}
