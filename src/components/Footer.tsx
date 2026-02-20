import { portfolioData } from '../data/portfolioData';

export function Footer(): JSX.Element {
  return (
    <footer className="section-divider py-8">
      <div className="section-wrap flex flex-col gap-1 text-xs text-muted md:flex-row md:items-center md:justify-between">
        <span>
          {portfolioData.profile.name} · {portfolioData.profile.location}
        </span>
        <span>© {new Date().getFullYear()} All rights reserved.</span>
      </div>
    </footer>
  );
}
