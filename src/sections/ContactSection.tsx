import { SectionTitle } from '../components/SectionTitle';
import { portfolioData } from '../data/portfolioData';

export function ContactSection(): JSX.Element {
  return (
    <section
      id="contact"
      className="section-wrap section-space section-divider"
    >
      <SectionTitle
        title="Contact"
        description="협업 또는 채용 관련 문의는 아래 채널로 연락해주세요."
      />
      <div className="glass-card card-lift p-6">
        <p className="text-sm md:text-base">{portfolioData.contact.message}</p>
        <ul className="mt-4 space-y-3 text-sm text-muted">
          <li className="text-sm md:text-base">Email: {portfolioData.contact.email}</li>
          <li>
            GitHub:{' '}
            <a
              className="contact-link ml-2"
              href={portfolioData.contact.github}
              target="_blank"
              rel="noreferrer"
            >
              바로가기
            </a>
          </li>
          <li>
            LinkedIn:{' '}
            <a
              className="contact-link ml-2"
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              바로가기
            </a>
          </li>
          <li>
            Blog:{' '}
            <a
              className="contact-link ml-2"
              href={portfolioData.contact.blog}
              target="_blank"
              rel="noreferrer"
            >
              바로가기
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
