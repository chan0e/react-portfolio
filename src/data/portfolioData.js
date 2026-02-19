export const portfolioData = {
  profile: {
    name: '홍길동',
    role: 'Frontend Developer',
    summary: '문제를 구조적으로 해결하고 사용자 경험을 개선하는 프론트엔드 개발자입니다.',
    location: 'Seoul, KR',
  },
  navItems: [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ],
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js'],
  projects: [
    {
      title: 'Portfolio UI',
      summary: 'React + Vite 기반 단일 페이지 포트폴리오 UI',
      stack: ['React', 'Vite', 'Tailwind'],
    },
  ],
  experience: [
    {
      company: 'Sample Company',
      period: '2024.01 - 현재',
      achievement: '디자인 시스템 기반 UI 표준화 주도',
    },
  ],
  contact: {
    email: 'hello@example.com',
    github: 'https://github.com/chan0e',
  },
};
