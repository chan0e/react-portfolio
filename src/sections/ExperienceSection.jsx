import { SectionTitle } from '../components/SectionTitle';
import { portfolioData } from '../data/portfolioData';

export function ExperienceSection() {
  return (
    <section id="experience" className="section-wrap section-space border-t border-slate-300/20 dark:border-slate-700/40">
      <SectionTitle title="Experience" description="경력 및 주요 성과입니다." />
      <div className="space-y-4">
        {portfolioData.experience.map((item) => (
          <article key={item.company} className="rounded-xl border border-slate-300/40 bg-surface/90 p-5 dark:border-slate-700">
            <h3 className="text-lg font-semibold">{item.company}</h3>
            <p className="text-sm text-muted">{item.period}</p>
            <p className="mt-3 text-sm">{item.achievement}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
