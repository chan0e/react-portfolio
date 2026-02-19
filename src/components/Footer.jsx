import { portfolioData } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-slate-300/20 py-6 dark:border-slate-700/40">
      <div className="section-wrap flex flex-col gap-1 text-xs text-muted md:flex-row md:items-center md:justify-between">
        <span>
          {portfolioData.profile.name} · {portfolioData.profile.location}
        </span>
        <span>© {new Date().getFullYear()} All rights reserved.</span>
      </div>
    </footer>
  );
}
