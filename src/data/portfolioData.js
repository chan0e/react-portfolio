export const portfolioData = {
  profile: {
    name: '홍길동',
    role: 'Frontend Developer',
    headline: '사용자 문제를 구조적으로 풀어내는 프론트엔드 개발자',
    summary:
      '비즈니스 목표와 사용자 경험 사이의 균형을 맞추며, 유지보수 가능한 UI 아키텍처를 만드는 데 집중합니다.',
    location: 'Seoul, KR',
    bio: [
      '디자인 의도를 코드로 정확하게 전달하고, 반복 가능한 컴포넌트 시스템을 선호합니다.',
      '기획, 디자인, 개발 간의 커뮤니케이션 비용을 줄이는 UI 설계에 강점을 가지고 있습니다.',
    ],
  },
  navItems: [
    { id: 'hero', label: '홈' },
    { id: 'about', label: '소개' },
    { id: 'skills', label: '기술' },
    { id: 'projects', label: '프로젝트' },
    { id: 'experience', label: '경험' },
    { id: 'contact', label: '연락' },
  ],
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    },
    {
      category: 'State & Data',
      items: ['TanStack Query', 'Zustand', 'React Hook Form', 'Zod'],
    },
    {
      category: 'Testing & Tooling',
      items: ['Vitest', 'Testing Library', 'Vite', 'ESLint', 'Prettier'],
    },
    {
      category: 'Collaboration',
      items: ['Figma', 'Storybook', 'GitHub Actions', 'Notion'],
    },
  ],
  projects: [
    {
      title: 'Design System Portal',
      summary: '사내 서비스 공통 UI를 표준화한 디자인 시스템 포털 구축',
      stack: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS'],
      role: '프론트엔드 리드',
      impact: '컴포넌트 재사용률 40% 향상, 신규 화면 개발 리드타임 30% 단축',
      links: {
        demo: 'https://example.com',
        github: 'https://github.com/chan0e/react-portfolio',
      },
    },
    {
      title: 'Commerce Dashboard',
      summary: '운영 지표 모니터링 및 관리 기능을 제공하는 관리자 대시보드 개발',
      stack: ['React', 'Vite', 'TanStack Query', 'Chart.js'],
      role: '프론트엔드 개발',
      impact: '대시보드 초기 로딩 25% 개선, 운영팀 반복 업무 시간 절감',
      links: {
        demo: 'https://example.com',
        github: 'https://github.com/chan0e/react-portfolio',
      },
    },
    {
      title: 'Portfolio UI',
      summary: 'React + Vite 기반 단일 페이지 포트폴리오 UI',
      stack: ['React', 'Vite', 'Tailwind CSS'],
      role: '개인 프로젝트',
      impact: '다크모드/반응형/재사용 컴포넌트 구조를 포함한 기준 템플릿 수립',
      links: {
        demo: 'https://example.com',
        github: 'https://github.com/chan0e/react-portfolio',
      },
    },
  ],
  experience: [
    {
      company: 'Sample Company',
      position: 'Frontend Engineer',
      period: '2024.01 - 현재',
      achievements: [
        '디자인 시스템 기반 UI 표준화 주도',
        '공통 레이아웃/폼 컴포넌트 아키텍처 설계',
        'CI 품질 게이트 도입으로 배포 안정성 개선',
      ],
    },
    {
      company: 'Example Startup',
      position: 'Frontend Developer',
      period: '2022.03 - 2023.12',
      achievements: [
        'B2B 운영 도구 화면 20여 개 구축',
        '사용성 개선 A/B 테스트를 통해 전환율 향상',
      ],
    },
  ],
  contact: {
    email: 'hello@example.com',
    github: 'https://github.com/chan0e',
    linkedin: 'https://www.linkedin.com',
    blog: 'https://velog.io',
    message: '협업, 채용, 프리랜스 문의 모두 환영합니다.',
  },
};
