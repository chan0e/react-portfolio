import type { Project } from '../../types/portfolio';

interface ProjectCardProps {
  project: Project;
  onOpenDetail: (project: Project) => void;
}

export function ProjectCard({ project, onOpenDetail }: ProjectCardProps): JSX.Element {
  return (
    <article className="glass-card card-lift flex h-full flex-col p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold tracking-tight text-text">{project.title}</h3>
        <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold tracking-wide text-accent">
          {project.role}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted md:text-base">{project.summary}</p>
      <p className="mt-6 border-l-2 border-accent/45 pl-3 text-sm leading-7 text-text/90">
        {project.impact}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li key={item} className="chip rounded-md">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          className="btn-primary px-4 py-2 text-xs"
          onClick={() => onOpenDetail(project)}
          aria-label={`${project.title} 상세 보기`}
        >
          Detail
        </button>
        <a
          className="btn-ghost px-4 py-2 text-xs"
          href={project.links.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </article>
  );
}
