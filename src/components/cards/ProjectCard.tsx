import type { Project } from '../../types/portfolio';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  return (
    <article className="glass-card card-lift">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
          {project.role}
        </span>
      </div>
      <p className="mt-3 text-sm text-muted">{project.summary}</p>
      <p className="mt-3 text-sm">{project.impact}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li key={item} className="chip rounded-md">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex gap-3">
        <a className="btn-primary px-3 py-2 text-xs" href={project.links.demo} target="_blank" rel="noreferrer">
          Demo
        </a>
        <a className="btn-ghost px-3 py-2 text-xs" href={project.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </article>
  );
}
