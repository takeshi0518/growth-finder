import SectionTitle from './section-title';
import Container from '@/components/shared/contaienr';
import { Icons } from '@/components/icon/icons';
import Image from 'next/image';

export default function ProblemSolution() {
  return (
    <section id="problem-solution" className="scroll-mt-24">
      <Container>
        <SectionTitle>
          こんな
          <span className="text-2xl md:text-4xl font-bold text-primary">
            お悩み
          </span>
          ありませんか？
        </SectionTitle>
        
      </Container>
    </section>
  );
}
