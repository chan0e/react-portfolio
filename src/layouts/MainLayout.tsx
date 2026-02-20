import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ContactSection } from '../sections/ContactSection';
import type { Theme } from '../types/portfolio';

interface MainLayoutProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function MainLayout({ theme, onToggleTheme }: MainLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen">
      <Header theme={theme} onToggle={onToggleTheme} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
