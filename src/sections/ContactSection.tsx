import { motion } from 'framer-motion';
import { SectionTitle } from '../components/SectionTitle';
import type { Contact } from '../types/portfolio';
import { fadeInUp, sectionTransition, sectionViewport } from '../utils/animations';

interface ContactSectionProps {
  contact: Contact;
}

export function ContactSection({ contact }: ContactSectionProps): JSX.Element {
  return (
    <motion.section
      id="contact"
      className="section-wrap section-space section-divider"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={fadeInUp}
      transition={sectionTransition}
    >
      <SectionTitle
        title="Contact"
        description="협업 또는 채용 관련 문의는 아래 채널로 연락해주세요."
      />
      <div className="glass-card card-lift p-6 md:p-8">
        <p className="text-base leading-7 text-muted">{contact.message}</p>
        <ul className="mt-6 space-y-4 text-sm text-muted">
          <li className="text-sm md:text-base">
            <span className="font-bold text-text">Email:</span> {contact.email}
          </li>
          <li>
            <span className="font-bold text-text">GitHub:</span>{' '}
            <a
              className="contact-link ml-2"
              href={contact.github}
              target="_blank"
              rel="noreferrer"
            >
              바로가기
            </a>
          </li>
          <li>
            <span className="font-bold text-text">LinkedIn:</span>{' '}
            <a
              className="contact-link ml-2"
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              바로가기
            </a>
          </li>
          <li>
            <span className="font-bold text-text">Blog:</span>{' '}
            <a
              className="contact-link ml-2"
              href={contact.blog}
              target="_blank"
              rel="noreferrer"
            >
              바로가기
            </a>
          </li>
        </ul>
      </div>
    </motion.section>
  );
}
