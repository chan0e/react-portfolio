import { SectionTitle } from '../components/SectionTitle';
import { ProjectCard } from '../components/cards/ProjectCard';
import { portfolioData } from '../data/portfolioData';

export function ProjectsSection(): JSX.Element {
  return (
    <section
      id="projects"
      className="section-wrap section-space border-t border-slate-300/20 dark:border-slate-700/40"
    >
      <SectionTitle
        title="Projects"
        description="핵심 프로젝트, 기술 선택, 성과를 카드 단위로 정리했습니다."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {portfolioData.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
