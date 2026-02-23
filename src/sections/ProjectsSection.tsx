import { useState } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { ProjectCard } from '../components/cards/ProjectCard';
import { ProjectDetailModal } from '../components/modals/ProjectDetailModal';
import { portfolioData } from '../data/portfolioData';
import type { Project } from '../types/portfolio';

export function ProjectsSection(): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenDetail = (project: Project): void => {
    setSelectedProject(project);
  };

  const handleCloseDetail = (): void => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="section-wrap section-space section-divider">
      <SectionTitle
        title="Projects"
        description="문제 정의, 구현 선택, 성과를 한눈에 확인할 수 있도록 카드 구조를 고도화했습니다."
      />
      <div className="grid gap-6 fade-up xl:grid-cols-2">
        {portfolioData.projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onOpenDetail={handleOpenDetail}
          />
        ))}
      </div>
      <ProjectDetailModal
        isOpen={selectedProject !== null}
        project={selectedProject}
        onClose={handleCloseDetail}
      />
    </section>
  );
}
