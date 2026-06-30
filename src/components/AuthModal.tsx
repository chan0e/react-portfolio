import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthModalProps {
  loading: boolean;
  error: string | null;
  onSubmit: (password: string) => Promise<void>;
  onClearError: () => void;
}

const modalTitleId = 'portfolio-auth-title';
const modalDescriptionId = 'portfolio-auth-description';
const modalErrorId = 'portfolio-auth-error';

export function AuthModal({
  loading,
  error,
  onSubmit,
  onClearError,
}: AuthModalProps): JSX.Element {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    passwordInputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const modal = modalRef.current;
      if (!modal) {
        return;
      }

      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await onSubmit(password);
  };

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
    if (error) {
      onClearError();
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4 py-10 text-text">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-accent)_/_0.16),transparent_42%)]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <motion.section
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        aria-describedby={error ? `${modalDescriptionId} ${modalErrorId}` : modalDescriptionId}
        className="glass-card relative z-10 w-full max-w-md overflow-hidden p-6 shadow-2xl md:p-8"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/12 text-accent shadow-glow">
          <LockKeyhole size={22} aria-hidden="true" />
        </div>
        <p className="hero-kicker mt-6">Private Portfolio</p>
        <h1 id={modalTitleId} className="mt-5 text-3xl font-bold leading-tight text-text md:text-4xl">
          비밀번호가 필요한 포트폴리오입니다.
        </h1>
        <p id={modalDescriptionId} className="mt-4 text-sm leading-7 text-muted">
          공유받은 비밀번호를 입력하면 포트폴리오 데이터를 불러옵니다.
        </p>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="portfolio-password" className="text-sm font-semibold text-text">
              열람 비밀번호
            </label>
            <div className="relative mt-2">
              <input
                ref={passwordInputRef}
                id="portfolio-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => handlePasswordChange(event.target.value)}
                autoComplete="current-password"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${modalDescriptionId} ${modalErrorId}` : modalDescriptionId}
                disabled={loading}
                required
                className="w-full rounded-xl border border-slate-300/60 bg-surface/80 px-4 py-3 pr-12 text-base text-text outline-none transition placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700/70 dark:bg-surface-soft/70"
                placeholder="비밀번호 입력"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition hover:bg-surface-soft hover:text-text focus:outline-none focus:ring-4 focus:ring-accent/15"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {error && (
            <p id={modalErrorId} role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? '확인 중...' : '포트폴리오 보기'}
          </button>
        </form>
      </motion.section>
    </main>
  );
}
