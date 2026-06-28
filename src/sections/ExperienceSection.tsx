import { motion } from 'framer-motion';
import { SectionTitle } from '../components/SectionTitle';
import type { Experience } from '../types/portfolio';
import { fadeInUp, sectionTransition, sectionViewport } from '../utils/animations';

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps): JSX.Element {
  return (
    <motion.section
      id="experience"
      className="section-wrap section-space section-divider"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={fadeInUp}
      transition={sectionTransition}
    >
      <SectionTitle title="Experience" description="경력과 주요 성과를 타임라인 형태로 정리했습니다." />
      <div className="space-y-4">
        {experience.map((item) => (
          <article
            key={`${item.company}-${item.period}`}
            className="glass-card card-lift"
          >
            <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
              <h3 className="text-lg font-semibold">
                {item.company} · {item.position}
              </h3>
              <p className="text-sm text-muted">{item.period}</p>
            </div>
            <ul className="timeline-list">
              {item.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
