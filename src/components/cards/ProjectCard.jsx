export function ProjectCard({ project }) {
  return (
    <article className="rounded-2xl border border-slate-300/40 bg-surface/90 p-5 dark:border-slate-700">
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
          <li
            key={item}
            className="rounded-md border border-slate-300/40 bg-slate-100/60 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-800"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex gap-3">
        <a
          className="rounded-md bg-accent px-3 py-2 text-xs font-semibold text-slate-900 transition hover:opacity-90"
          href={project.links.demo}
          target="_blank"
          rel="noreferrer"
        >
          Demo
        </a>
        <a
          className="rounded-md border border-slate-300/50 px-3 py-2 text-xs font-semibold transition hover:bg-surface/80 dark:border-slate-700"
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
