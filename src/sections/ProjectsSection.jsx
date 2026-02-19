import { SectionTitle } from '../components/SectionTitle';
import { portfolioData } from '../data/portfolioData';

export function ProjectsSection() {
  return (
    <section id="projects" className="section-wrap section-space border-t border-slate-300/20 dark:border-slate-700/40">
      <SectionTitle title="Projects" description="핵심 프로젝트와 기술 선택을 정리했습니다." />
      <div className="grid gap-4 md:grid-cols-2">
        {portfolioData.projects.map((project) => (
          <article key={project.title} className="rounded-xl border border-slate-300/40 bg-surface/90 p-5 dark:border-slate-700">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm text-muted">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-md bg-slate-200/60 px-2 py-1 text-xs dark:bg-slate-800">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
