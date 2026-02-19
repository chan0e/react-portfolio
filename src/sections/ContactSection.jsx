import { SectionTitle } from '../components/SectionTitle';
import { portfolioData } from '../data/portfolioData';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-wrap section-space border-t border-slate-300/20 dark:border-slate-700/40"
    >
      <SectionTitle
        title="Contact"
        description="협업 또는 채용 관련 문의는 아래 채널로 연락해주세요."
      />
      <div className="rounded-2xl border border-slate-300/40 bg-surface/90 p-6 dark:border-slate-700">
        <p className="text-sm md:text-base">{portfolioData.contact.message}</p>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li>Email: {portfolioData.contact.email}</li>
          <li>
            GitHub:{' '}
            <a
              className="text-accent underline"
              href={portfolioData.contact.github}
              target="_blank"
              rel="noreferrer"
            >
              {portfolioData.contact.github}
            </a>
          </li>
          <li>
            LinkedIn:{' '}
            <a
              className="text-accent underline"
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              {portfolioData.contact.linkedin}
            </a>
          </li>
          <li>
            Blog:{' '}
            <a
              className="text-accent underline"
              href={portfolioData.contact.blog}
              target="_blank"
              rel="noreferrer"
            >
              {portfolioData.contact.blog}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
