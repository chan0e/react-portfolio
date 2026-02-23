import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { getTechBadgeTone } from '../../utils/techBadge';

interface ProjectDetailModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({
  isOpen,
  project,
  onClose,
}: ProjectDetailModalProps): JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timerId = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
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
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (activeElement === firstElement || !modal.contains(activeElement)) {
          event.preventDefault();
          lastElement.focus();
        }
        return;
      }

      if (activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timerId);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      lastFocusedRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) {
    return null;
  }

  const modalTitleId = `project-modal-title-${project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8">
      <button
        type="button"
        aria-label="프로젝트 상세 팝업 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-300/45 bg-surface/95 p-6 shadow-2xl dark:border-slate-600/50 dark:bg-surface-soft/95 md:p-8"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="프로젝트 상세 팝업 닫기"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300/50 text-muted transition hover:bg-slate-100/70 hover:text-text dark:border-slate-600 dark:hover:bg-slate-800/70"
        >
          <X size={16} />
        </button>

        <div className="overflow-y-auto pr-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Project Detail
            </p>
            <h3 id={modalTitleId} className="mt-2 pr-12 text-2xl font-bold text-text">
              {project.title}
            </h3>
          </div>

          <p className="mt-6 text-sm leading-7 text-muted md:text-base">{project.summary}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-300/35 bg-surface-soft/70 p-4 dark:border-slate-700">
              <p className="text-xs uppercase tracking-wide text-muted">Role</p>
              <p className="mt-2 text-sm font-semibold text-text">{project.role}</p>
            </div>
            <div className="rounded-xl border border-slate-300/35 bg-surface-soft/70 p-4 dark:border-slate-700">
              <p className="text-xs uppercase tracking-wide text-muted">Impact</p>
              <p className="mt-2 text-sm leading-6 text-text">{project.impact}</p>
            </div>
          </div>

          {project.details && project.details.length > 0 && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-muted">Highlights</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                {project.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wide text-muted">Tech Stack</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className={`chip rounded-md ${getTechBadgeTone(tech)}`}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
