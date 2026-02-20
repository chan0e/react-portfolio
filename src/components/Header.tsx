import { ThemeToggle } from './ThemeToggle';
import { portfolioData } from '../data/portfolioData';
import type { Theme } from '../types/portfolio';

interface HeaderProps {
  theme: Theme;
  onToggle: () => void;
}

export function Header({ theme, onToggle }: HeaderProps): JSX.Element {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-300/30 bg-bg/80 backdrop-blur-md dark:border-slate-700/50">
      <div className="section-wrap flex h-16 items-center justify-between">
        <a href="#hero" className="brand-font text-lg font-bold">
          {portfolioData.profile.name}
        </a>
        <nav className="hidden gap-5 md:flex" aria-label="메인 메뉴">
          {portfolioData.navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-muted transition hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle theme={theme} onToggle={onToggle} />
      </div>
      <nav
        className="section-wrap flex gap-2 overflow-x-auto pb-3 md:hidden"
        aria-label="모바일 메뉴"
      >
        {portfolioData.navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 rounded-full border border-slate-300/50 px-3 py-1 text-xs text-muted dark:border-slate-700"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
