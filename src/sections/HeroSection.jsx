import { portfolioData } from '../data/portfolioData';

export function HeroSection() {
  return (
    <section id="hero" className="section-wrap section-space">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        Frontend Portfolio
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
        {portfolioData.profile.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-sm text-muted md:text-base">
        {portfolioData.profile.summary}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-slate-900 transition hover:opacity-90"
        >
          프로젝트 보기
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-slate-300/50 px-5 py-3 text-sm font-semibold text-text transition hover:bg-surface/80 dark:border-slate-700"
        >
          연락하기
        </a>
      </div>
    </section>
  );
}
