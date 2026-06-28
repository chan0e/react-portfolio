import { motion } from 'framer-motion';
import { SectionTitle } from '../components/SectionTitle';
import { SkillGroup } from '../components/cards/SkillGroup';
import { portfolioData } from '../data/portfolioData';
import {
  fadeInUp,
  sectionTransition,
  sectionViewport,
  staggerContainer,
} from '../utils/animations';

export function SkillsSection(): JSX.Element {
  return (
    <motion.section
      id="skills"
      className="section-wrap section-space section-divider"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={fadeInUp}
      transition={sectionTransition}
    >
      <SectionTitle
        title="Skills"
        description="카테고리별 핵심 기술 스택을 빠르게 파악할 수 있도록 정리했습니다."
      />
      <motion.div
        className="grid gap-6 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {portfolioData.skills.map((group) => (
          <motion.div key={group.category} variants={fadeInUp}>
            <SkillGroup group={group} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
