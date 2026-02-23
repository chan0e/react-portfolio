import { portfolioData } from '../data/portfolioData';

export function HeroSection(): JSX.Element {
  const projectCount = portfolioData.projects.length;
  const skillCategoryCount = portfolioData.skills.length;

  return (
    <section id="hero" className="section-wrap section-space fade-up">
      <div className="hero-grid">
        <div className="max-w-3xl">
          <p className="hero-kicker">Frontend Portfolio</p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] text-text md:text-6xl">
            {portfolioData.profile.headline}
          </h1>
          <p className="mt-6 text-base leading-7 text-muted md:text-lg md:leading-8">
            {portfolioData.profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary min-w-[136px] text-center">
              프로젝트 보기
            </a>
            <a href="#contact" className="btn-ghost min-w-[136px] text-center">
              연락하기
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            <li className="chip">React + TypeScript</li>
            <li className="chip">Design System</li>
            <li className="chip">Performance Mindset</li>
          </ul>
        </div>
        <aside className="hero-panel">
          <div className="profile-photo-wrap">
            <img
              src={portfolioData.profile.photoSrc}
              alt={portfolioData.profile.photoAlt}
              className="profile-photo"
              loading="eager"
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Profile Snapshot
          </p>
          <h2 className="mt-3 text-2xl font-bold text-text">{portfolioData.profile.role}</h2>
          <p className="mt-2 text-sm text-muted">{portfolioData.profile.location}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="hero-meta">
              <p className="text-xs text-muted">Projects</p>
              <p className="mt-2 text-2xl font-bold text-accent">{projectCount}</p>
            </div>
            <div className="hero-meta">
              <p className="text-xs text-muted">Skill Groups</p>
              <p className="mt-2 text-2xl font-bold text-accent">{skillCategoryCount}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
