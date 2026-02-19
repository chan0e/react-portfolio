import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ContactSection } from '../sections/ContactSection';

export function MainLayout({ theme, onToggleTheme }) {
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
