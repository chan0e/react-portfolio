import { SectionTitle } from '../components/SectionTitle';
import { SkillGroup } from '../components/cards/SkillGroup';
import { portfolioData } from '../data/portfolioData';

export function SkillsSection(): JSX.Element {
  return (
    <section id="skills" className="section-wrap section-space section-divider">
      <SectionTitle
        title="Skills"
        description="카테고리별 핵심 기술 스택을 빠르게 파악할 수 있도록 정리했습니다."
      />
      <div className="grid gap-6 fade-up md:grid-cols-2">
        {portfolioData.skills.map((group) => (
          <SkillGroup key={group.category} group={group} />
        ))}
      </div>
    </section>
  );
}
