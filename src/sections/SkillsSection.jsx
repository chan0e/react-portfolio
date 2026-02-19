import { SectionTitle } from '../components/SectionTitle';
import { portfolioData } from '../data/portfolioData';

export function SkillsSection() {
  return (
    <section id="skills" className="section-wrap section-space border-t border-slate-300/20 dark:border-slate-700/40">
      <SectionTitle title="Skills" description="주요 기술 스택입니다." />
      <ul className="flex flex-wrap gap-3">
        {portfolioData.skills.map((skill) => (
          <li key={skill} className="rounded-full border border-slate-300/40 bg-surface/90 px-4 py-2 text-sm dark:border-slate-700">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
