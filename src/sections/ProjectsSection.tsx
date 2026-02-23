import { SectionTitle } from '../components/SectionTitle';
import { ProjectCard } from '../components/cards/ProjectCard';
import { portfolioData } from '../data/portfolioData';

export function ProjectsSection(): JSX.Element {
  return (
    <section id="projects" className="section-wrap section-space section-divider">
      <SectionTitle
        title="Projects"
        description="문제 정의, 구현 선택, 성과를 한눈에 확인할 수 있도록 카드 구조를 고도화했습니다."
      />
      <div className="grid gap-6 fade-up xl:grid-cols-2">
        {portfolioData.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
