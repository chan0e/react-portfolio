import { portfolioData } from '../data/portfolioData';

export function HeroSection(): JSX.Element {
  const projectCount = portfolioData.projects.length;
  const skillCategoryCount = portfolioData.skills.length;

  return (
    <section id="hero" className="section-wrap section-space fade-up">
      <div className="hero-grid">
        <div>
          <p className="hero-kicker">Frontend Portfolio</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            {portfolioData.profile.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-sm text-muted md:text-base">
            {portfolioData.profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              프로젝트 보기
            </a>
            <a href="#contact" className="btn-ghost">
              연락하기
            </a>
          </div>
        </div>
        <aside className="hero-panel">
          <p className="text-xs uppercase tracking-widest text-muted">Profile Snapshot</p>
          <h2 className="mt-2 text-xl font-bold">{portfolioData.profile.role}</h2>
          <p className="mt-2 text-sm text-muted">{portfolioData.profile.location}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="hero-meta">
              <p className="text-xs text-muted">Projects</p>
              <p className="mt-1 text-xl font-bold text-accent">{projectCount}</p>
            </div>
            <div className="hero-meta">
              <p className="text-xs text-muted">Skill Groups</p>
              <p className="mt-1 text-xl font-bold text-accent">{skillCategoryCount}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
