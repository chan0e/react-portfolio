import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../types/portfolio';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps): JSX.Element {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300/40 bg-surface/70 text-text transition hover:scale-[1.03] hover:shadow-glow dark:border-slate-700"
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
