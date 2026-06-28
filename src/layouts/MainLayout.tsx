import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ContactSection } from '../sections/ContactSection';
import type { PortfolioData, Theme } from '../types/portfolio';

interface MainLayoutProps {
  theme: Theme;
  onToggleTheme: () => void;
  data: PortfolioData;
}

export function MainLayout({ theme, onToggleTheme, data }: MainLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen overflow-x-clip bg-bg text-text">
      <Header
        theme={theme}
        onToggle={onToggleTheme}
        profile={data.profile}
        navItems={data.navItems}
      />
      <main>
        <HeroSection profile={data.profile} projects={data.projects} skills={data.skills} />
        <AboutSection profile={data.profile} />
        <SkillsSection skills={data.skills} />
        <ProjectsSection projects={data.projects} />
        <ExperienceSection experience={data.experience} />
        <ContactSection contact={data.contact} />
      </main>
      <Footer profile={data.profile} />
    </div>
  );
}
