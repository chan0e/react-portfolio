import { ThemeToggle } from './ThemeToggle';
import type { NavItem, Profile, Theme } from '../types/portfolio';

interface HeaderProps {
  theme: Theme;
  onToggle: () => void;
  profile: Profile;
  navItems: NavItem[];
}

export function Header({ theme, onToggle, profile, navItems }: HeaderProps): JSX.Element {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-300/20 bg-bg/70 backdrop-blur-xl dark:border-slate-700/40">
      <div className="section-wrap flex h-16 items-center justify-between">
        <a href="#hero" className="brand-font text-lg font-bold tracking-tight">
          {profile.name}
        </a>
        <nav className="hidden gap-5 md:flex" aria-label="메인 메뉴">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-md px-2 py-1 text-sm text-muted transition hover:bg-surface/60 hover:text-text"
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
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="chip shrink-0"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
