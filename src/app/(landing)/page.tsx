import CallToAction from './components/call-to-action';
import ProblemSolution from './components/problem-solution';
import Footer from './components/footer';
import Hero from './components/hero';
import RealScreen from './components/real-screen';
import Usage from './components/usage';

export default function LandingPage() {
  return (
    <div className="space-y-40">
      <Hero />
      <ProblemSolution />
      <RealScreen />
      <Usage />
      <CallToAction />
      <Footer />
    </div>
  );
}
