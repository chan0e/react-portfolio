export type Theme = 'light' | 'dark';

export interface NavItem {
  id: string;
  label: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  bio: string[];
  photoSrc: string;
  photoAlt: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProjectLinks {
  demo: string;
  github: string;
}

export interface Project {
  title: string;
  summary: string;
  stack: string[];
  role: string;
  impact: string;
  links: ProjectLinks;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  achievements: string[];
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  blog: string;
  message: string;
}

export interface PortfolioData {
  profile: Profile;
  navItems: NavItem[];
  skills: SkillGroup[];
  projects: Project[];
  experience: Experience[];
  contact: Contact;
}
