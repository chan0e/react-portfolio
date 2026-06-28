import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../components/SectionTitle';
import { ProjectCard } from '../components/cards/ProjectCard';
import type { Project } from '../types/portfolio';
import {
  fadeInUp,
  sectionTransition,
  sectionViewport,
  staggerContainer,
} from '../utils/animations';

const ProjectDetailModal = lazy(() =>
  import('../components/modals/ProjectDetailModal').then((module) => ({
    default: module.ProjectDetailModal,
  }))
);

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [shouldLoadModal, setShouldLoadModal] = useState(false);

  const handleOpenDetail = (project: Project): void => {
    setShouldLoadModal(true);
    setSelectedProject(project);
  };

  const handleCloseDetail = (): void => {
    setSelectedProject(null);
  };

  return (
    <motion.section
      id="projects"
      className="section-wrap section-space section-divider"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={fadeInUp}
      transition={sectionTransition}
    >
      <SectionTitle
        title="Projects"
        description="문제 정의, 구현 선택, 성과를 한눈에 확인할 수 있도록 카드 구조를 고도화했습니다."
      />
      <motion.div
        className="grid gap-6 xl:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {projects.map((project) => (
          <motion.div key={project.title} variants={fadeInUp}>
            <ProjectCard
              project={project}
              onOpenDetail={handleOpenDetail}
            />
          </motion.div>
        ))}
      </motion.div>
      {shouldLoadModal && (
        <Suspense fallback={null}>
          <ProjectDetailModal
            isOpen={selectedProject !== null}
            project={selectedProject}
            onClose={handleCloseDetail}
          />
        </Suspense>
      )}
    </motion.section>
  );
}
