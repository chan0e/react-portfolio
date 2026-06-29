import { lazy, Suspense, useState, type CSSProperties } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SkillGroup as SkillGroupCard } from '../components/cards/SkillGroup';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useScrollSection } from '../hooks/useScrollSection';
import type {
  Contact,
  Experience,
  PortfolioData,
  Profile,
  Project,
  Theme,
} from '../types/portfolio';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { getTechBadgeTone } from '../utils/techBadge';

const ProjectDetailModal = lazy(() =>
  import('../components/modals/ProjectDetailModal').then((module) => ({
    default: module.ProjectDetailModal,
  })),
);

type ScrollSectionStyle = CSSProperties & {
  '--section-screens'?: number;
};

interface MainLayoutProps {
  theme: Theme;
  onToggleTheme: () => void;
  data: PortfolioData;
}

export function MainLayout({ theme, onToggleTheme, data }: MainLayoutProps): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [shouldLoadModal, setShouldLoadModal] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const isCompactLayout = useMediaQuery('(max-width: 768px)');
  const isStaticProjectList = Boolean(shouldReduceMotion) || isCompactLayout;

  const heroSection = useScrollSection<HTMLElement>({
    offset: ['start start', 'end start'],
  });
  const projectsSection = useScrollSection<HTMLElement>({
    offset: ['start start', 'end end'],
  });
  const skillsSection = useScrollSection<HTMLElement>();
  const experienceSection = useScrollSection<HTMLElement>();
  const contactSection = useScrollSection<HTMLElement>();

  const heroOpacity = useTransform(heroSection.progress, [0, 0.08, 0.78, 1], [0.8, 1, 1, 0]);
  const heroY = useTransform(heroSection.progress, [0, 0.08, 0.78, 1], [20, 0, 0, -42]);
  const heroPhotoScale = useTransform(heroSection.progress, [0, 0.4, 0.86], [0.98, 1.05, 0.98]);
  const skillsOpacity = useTransform(skillsSection.progress, [0.12, 0.34], [0, 1]);
  const skillsY = useTransform(skillsSection.progress, [0.12, 0.34], [44, 0]);
  const experienceOpacity = useTransform(experienceSection.progress, [0.1, 0.32], [0, 1]);
  const experienceY = useTransform(experienceSection.progress, [0.1, 0.32], [48, 0]);
  const contactOpacity = useTransform(contactSection.progress, [0.08, 0.34], [0, 1]);
  const contactScale = useTransform(contactSection.progress, [0.08, 0.34], [0.94, 1]);

  useMotionValueEvent(projectsSection.progress, 'change', (latest) => {
    if (data.projects.length === 0) {
      return;
    }

    const nextIndex = Math.min(
      data.projects.length - 1,
      Math.max(0, Math.floor(latest * data.projects.length)),
    );
    setActiveProjectIndex((currentIndex) => (
      currentIndex === nextIndex ? currentIndex : nextIndex
    ));
  });

  const openProjectDetail = (project: Project): void => {
    setShouldLoadModal(true);
    setSelectedProject(project);
  };

  const closeProjectDetail = (): void => {
    setSelectedProject(null);
  };

  const projectSectionStyle: ScrollSectionStyle = {
    '--section-screens': Math.max(data.projects.length + 1, 3),
  };
  const featuredStack = data.skills.flatMap((group) => group.items).slice(0, 4);

  return (
    <div className="min-h-screen overflow-x-clip bg-bg text-text">
      <Header
        theme={theme}
        onToggle={onToggleTheme}
        profile={data.profile}
        navItems={data.navItems}
      />
      <main className="scroll-story">
        <section
          ref={heroSection.ref}
          id="hero"
          className="scroll-section scroll-section-hero"
          aria-labelledby="hero-title"
        >
          <div className="sticky-content">
            <motion.div
              className="scroll-inner hero-scroll-grid"
              style={shouldReduceMotion ? undefined : { opacity: heroOpacity, y: heroY }}
            >
              <div className="hero-scroll-copy">
                <p className="scroll-kicker">Frontend Portfolio</p>
                <p className="scroll-role">{data.profile.role}</p>
                <h1 id="hero-title" className="hero-scroll-title">
                  {data.profile.headline}
                </h1>
                <p className="hero-scroll-summary">{data.profile.summary}</p>
              </div>

              <motion.aside
                className="hero-visual-panel"
                style={shouldReduceMotion ? undefined : { scale: heroPhotoScale }}
                aria-label={`${data.profile.name} 프로필 요약`}
              >
                <div className="hero-photo-frame">
                  <img
                    src={data.profile.photoSrc}
                    alt={data.profile.photoAlt}
                    className="profile-photo"
                    loading="eager"
                  />
                </div>
                <div className="hero-profile-meta">
                  <p className="scroll-label">{data.profile.name}</p>
                  <p>{data.profile.location}</p>
                </div>
                <div id="about" className="hero-bio-panel">
                  <p className="scroll-label">About</p>
                  {data.profile.bio.map((line, index) => (
                    <BioRevealLine
                      key={line}
                      line={line}
                      index={index}
                      total={data.profile.bio.length}
                      progress={heroSection.progress}
                      shouldReduceMotion={Boolean(shouldReduceMotion)}
                    />
                  ))}
                </div>
              </motion.aside>
            </motion.div>
          </div>
          <div className="scroll-cue-wrap" aria-hidden="true">
            <span className="scroll-cue-text">Scroll to explore</span>
            <div className="scroll-cue-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </section>

        <section
          ref={projectsSection.ref}
          id="projects"
          className="scroll-section-extended scroll-section-projects"
          style={projectSectionStyle}
          aria-labelledby="projects-title"
        >
          <div className="sticky-content">
            <div className="scroll-inner">
              <div className="section-scroll-heading">
                <p className="scroll-kicker">Selected Work</p>
                <h2 id="projects-title" className="scroll-section-title">
                  스크롤로 확인하는 핵심 프로젝트
                </h2>
                <p className="scroll-section-description">
                  문제 정의, 구현 선택, 성과를 프로젝트별로 하나씩 집중해서 볼 수 있도록 구성했습니다.
                </p>
              </div>

              <div className="project-stage">
                {data.projects.length > 0 ? (
                  data.projects.map((project, index) => (
                    <ProjectScrollCard
                      key={project.title}
                      project={project}
                      index={index}
                      total={data.projects.length}
                      progress={projectsSection.progress}
                      isActive={activeProjectIndex === index}
                      isStaticList={isStaticProjectList}
                      onOpenDetail={openProjectDetail}
                    />
                  ))
                ) : (
                  <article className="glass-card p-6">
                    <p className="text-muted">등록된 프로젝트가 없습니다.</p>
                  </article>
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          ref={skillsSection.ref}
          id="skills"
          className="scroll-section scroll-section-skills"
          aria-labelledby="skills-title"
        >
          <div className="sticky-content">
            <motion.div
              className="scroll-inner"
              style={shouldReduceMotion ? undefined : { opacity: skillsOpacity, y: skillsY }}
            >
              <div className="section-scroll-heading">
                <p className="scroll-kicker">Skill Signal</p>
                <h2 id="skills-title" className="scroll-section-title">
                  프로젝트를 지탱하는 기술 스택
                </h2>
                <p className="scroll-section-description">
                  채용 담당자가 빠르게 검증할 수 있도록 카테고리별 핵심 역량을 압축했습니다.
                </p>
              </div>
              <motion.div
                className="skills-scroll-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={staggerContainer}
              >
                {data.skills.map((group) => (
                  <motion.div key={group.category} variants={fadeInUp}>
                    <SkillGroupCard group={group} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section
          ref={experienceSection.ref}
          id="experience"
          className="scroll-section scroll-section-experience"
          aria-labelledby="experience-title"
        >
          <div className="sticky-content">
            <motion.div
              className="scroll-inner"
              style={shouldReduceMotion ? undefined : { opacity: experienceOpacity, y: experienceY }}
            >
              <div className="section-scroll-heading">
                <p className="scroll-kicker">Experience</p>
                <h2 id="experience-title" className="scroll-section-title">
                  실행 과정과 성과 중심의 경력
                </h2>
                <p className="scroll-section-description">
                  역할, 기간, 주요 성과가 한 화면에서 이어지도록 타임라인 형태로 정리했습니다.
                </p>
              </div>
              <div className="experience-scroll-list">
                {data.experience.map((item, index) => (
                  <ExperienceTimelineItem
                    key={`${item.company}-${item.period}`}
                    item={item}
                    index={index}
                    progress={experienceSection.progress}
                    shouldReduceMotion={Boolean(shouldReduceMotion)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section
          ref={contactSection.ref}
          id="contact"
          className="scroll-section scroll-section-contact"
          aria-labelledby="contact-title"
        >
          <div className="sticky-content">
            <motion.div
              className="scroll-inner contact-scroll-layout"
              style={shouldReduceMotion ? undefined : { opacity: contactOpacity, scale: contactScale }}
            >
              <div>
                <p className="scroll-kicker">Contact</p>
                <h2 id="contact-title" className="contact-scroll-title">
                  협업, 채용, 프로젝트 문의를 기다립니다.
                </h2>
                <p className="contact-scroll-message">{data.contact.message}</p>
              </div>
              <ContactPanel
                contact={data.contact}
                profile={data.profile}
                featuredStack={featuredStack}
              />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer profile={data.profile} />

      {shouldLoadModal && (
        <Suspense fallback={null}>
          <ProjectDetailModal
            isOpen={selectedProject !== null}
            project={selectedProject}
            onClose={closeProjectDetail}
          />
        </Suspense>
      )}
    </div>
  );
}

interface BioRevealLineProps {
  line: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  shouldReduceMotion: boolean;
}

function BioRevealLine({
  line,
  index,
  total,
  progress,
  shouldReduceMotion,
}: BioRevealLineProps): JSX.Element {
  // Bio는 처음부터 보이고, 스크롤하면 서서히 사라짐
  const segment = 0.15 / Math.max(total, 1);
  const start = index * segment * 0.5;
  const fadeOutStart = 0.6;
  const fadeOutEnd = 0.85;
  const opacity = useTransform(
    progress,
    [start, start + 0.08, fadeOutStart, fadeOutEnd],
    [0.7, 1, 1, 0]
  );
  const y = useTransform(progress, [start, start + 0.08], [8, 0]);

  return (
    <motion.p
      className="bio-line"
      style={shouldReduceMotion ? undefined : { opacity, y }}
    >
      {line}
    </motion.p>
  );
}

interface ProjectScrollCardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isActive: boolean;
  isStaticList: boolean;
  onOpenDetail: (project: Project) => void;
}

function ProjectScrollCard({
  project,
  index,
  total,
  progress,
  isActive,
  isStaticList,
  onOpenDetail,
}: ProjectScrollCardProps): JSX.Element {
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const mid = start + segment * 0.5;
  const end = Math.min(start + segment, 1);
  const opacity = useTransform(progress, [Math.max(0, start - 0.08), mid, end], [0, 1, 0]);
  const y = useTransform(progress, [start, mid, end], [72, 0, -72]);
  const scale = useTransform(progress, [start, mid, end], [0.92, 1, 0.92]);
  const githubUrl = getSafeExternalUrl(project.links.github);
  const demoUrl = getSafeExternalUrl(project.links.demo);
  const interactiveTabIndex = isActive || isStaticList ? undefined : -1;

  return (
    <motion.article
      className={`project-slide ${isActive ? 'is-active' : ''}`}
      style={isStaticList ? undefined : { opacity, y, scale, zIndex: total - index }}
      aria-hidden={!isActive && !isStaticList}
    >
      <div className="project-scroll-card">
        <div className="project-scroll-copy">
          <p className="project-counter">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <p className="project-impact">{project.impact}</p>
        </div>

        <div className="project-feature-card glass-card">
          <div className="flex items-start justify-between gap-4">
            <span className="scroll-label">Role</span>
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
              {project.role}
            </span>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li key={item} className={`chip rounded-md ${getTechBadgeTone(item)}`}>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-primary px-4 py-2 text-xs"
              onClick={() => onOpenDetail(project)}
              aria-label={`${project.title} 상세 보기`}
              tabIndex={interactiveTabIndex}
            >
              Detail
            </button>
            {githubUrl && (
              <a
                className="btn-ghost px-4 py-2 text-xs"
                href={githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                tabIndex={interactiveTabIndex}
              >
                GitHub
              </a>
            )}
            {demoUrl && (
              <a
                className="btn-ghost px-4 py-2 text-xs"
                href={demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                tabIndex={interactiveTabIndex}
              >
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

interface ExperienceTimelineItemProps {
  item: Experience;
  index: number;
  progress: MotionValue<number>;
  shouldReduceMotion: boolean;
}

function ExperienceTimelineItem({
  item,
  index,
  progress,
  shouldReduceMotion,
}: ExperienceTimelineItemProps): JSX.Element {
  const start = 0.18 + index * 0.12;
  const end = Math.min(start + 0.2, 0.86);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start, end], [-32, 0]);

  return (
    <motion.article
      className="experience-scroll-item"
      style={shouldReduceMotion ? undefined : { opacity, x }}
    >
      <div className="experience-dot" aria-hidden="true" />
      <div className="glass-card">
        <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <h3 className="text-lg font-semibold">
            {item.company} · {item.position}
          </h3>
          <p className="text-sm text-muted">{item.period}</p>
        </div>
        <ul className="timeline-list">
          {item.achievements.map((achievement) => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

interface ContactPanelProps {
  contact: Contact;
  profile: Profile;
  featuredStack: string[];
}

function ContactPanel({ contact, profile, featuredStack }: ContactPanelProps): JSX.Element {
  const githubUrl = getSafeExternalUrl(contact.github);
  const linkedInUrl = getSafeExternalUrl(contact.linkedin);
  const blogUrl = getSafeExternalUrl(contact.blog);

  return (
    <aside className="contact-panel glass-card">
      <p className="scroll-label">{profile.name}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{profile.role}</p>
      {featuredStack.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {featuredStack.map((item) => (
            <li key={item} className={`chip ${getTechBadgeTone(item)}`}>
              {item}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        {contact.email && (
          <a
            className="btn-primary px-4 py-2 text-xs"
            href={`mailto:${encodeURIComponent(contact.email)}`}
          >
            Email
          </a>
        )}
        {githubUrl && <ExternalContactLink href={githubUrl} label="GitHub" />}
        {linkedInUrl && <ExternalContactLink href={linkedInUrl} label="LinkedIn" />}
        {blogUrl && <ExternalContactLink href={blogUrl} label="Blog" />}
      </div>
    </aside>
  );
}

interface ExternalContactLinkProps {
  href: string;
  label: string;
}

function ExternalContactLink({ href, label }: ExternalContactLinkProps): JSX.Element {
  return (
    <a
      className="btn-ghost px-4 py-2 text-xs"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${label} 새 탭에서 열기`}
    >
      {label}
    </a>
  );
}

function getSafeExternalUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
  } catch {
    return null;
  }
}
