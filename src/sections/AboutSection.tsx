import { motion } from 'framer-motion';
import { SectionTitle } from '../components/SectionTitle';
import { portfolioData } from '../data/portfolioData';
import { fadeInUp, sectionTransition, sectionViewport } from '../utils/animations';

export function AboutSection(): JSX.Element {
  return (
    <motion.section
      id="about"
      className="section-wrap section-space section-divider"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={fadeInUp}
      transition={sectionTransition}
    >
      <SectionTitle
        title="About"
        description="문제 정의부터 구현, 개선까지 책임지는 개발 문화를 지향합니다."
      />
      <div className="glass-card card-lift space-y-4 p-6 md:p-8">
        {portfolioData.profile.bio.map((line) => (
          <p key={line} className="max-w-3xl text-sm leading-7 text-muted md:text-base">
            {line}
          </p>
        ))}
      </div>
    </motion.section>
  );
}
