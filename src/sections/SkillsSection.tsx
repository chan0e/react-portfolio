import { SectionTitle } from '../components/SectionTitle';
import { SkillGroup } from '../components/cards/SkillGroup';
import { portfolioData } from '../data/portfolioData';

export function SkillsSection(): JSX.Element {
  return (
    <section
      id="skills"
      className="section-wrap section-space border-t border-slate-300/20 dark:border-slate-700/40"
    >
      <SectionTitle title="Skills" description="카테고리별 핵심 기술 스택입니다." />
      <div className="grid gap-4 sm:grid-cols-2">
        {portfolioData.skills.map((group) => (
          <SkillGroup key={group.category} group={group} />
        ))}
      </div>
    </section>
  );
}
