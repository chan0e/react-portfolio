import { SectionTitle } from '../components/SectionTitle';
import { portfolioData } from '../data/portfolioData';

export function ContactSection() {
  return (
    <section id="contact" className="section-wrap section-space border-t border-slate-300/20 dark:border-slate-700/40">
      <SectionTitle title="Contact" description="협업 또는 채용 관련 문의는 아래 채널로 연락해주세요." />
      <div className="rounded-xl border border-slate-300/40 bg-surface/90 p-6 dark:border-slate-700">
        <p className="text-sm md:text-base">Email: {portfolioData.contact.email}</p>
        <a className="mt-2 inline-block text-sm text-accent underline" href={portfolioData.contact.github} target="_blank" rel="noreferrer">
          GitHub 프로필
        </a>
      </div>
    </section>
  );
}
