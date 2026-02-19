# React + Vite Portfolio UI Spec

## 1. Goal
- Build a **frontend-only portfolio UI** with React + Vite.
- Focus on a modern, recruiter-friendly UX that works well on desktop and mobile.
- Backend/API integration is explicitly out of scope for v1.

## 2. Scope (v1)
- Single-page portfolio with section-based navigation.
- Dark mode support (manual toggle + system preference fallback).
- Fully responsive layout (mobile-first).
- Tailwind CSS based styling system.
- Reusable component architecture.
- Basic accessibility and performance baseline.

## 3. Tech Stack
- Framework: `React 18+`
- Bundler: `Vite`
- Styling: `Tailwind CSS`
- Icons: `lucide-react` (or `heroicons`)
- Animation: CSS + light utility library (`framer-motion` optional)
- Package manager: `npm`

## 4. Information Architecture
Sections (single-page):
1. Hero
2. About
3. Skills
4. Projects
5. Experience
6. Contact

Global UI:
- Sticky header navigation
- Theme toggle (light/dark)
- Footer with social links / copyright

## 5. Layout Spec
### 5.1 Breakpoints
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+

### 5.2 Container Rules
- Max width: `1200px` (or Tailwind `max-w-6xl` ~ `max-w-7xl`)
- Horizontal padding:
  - Mobile: `px-4`
  - Tablet: `px-6`
  - Desktop: `px-8`

### 5.3 Section Rhythm
- Vertical spacing:
  - Mobile: `py-16`
  - Desktop: `py-24`
- Clear section titles + short supporting text.

## 6. Theme (Dark Mode)
### 6.1 Behavior
- Default priority:
  1. User saved preference (`localStorage`)
  2. System preference (`prefers-color-scheme`)
  3. Fallback: dark
- Toggle button in header.

### 6.2 Implementation
- Tailwind `darkMode: 'class'`
- Apply/remove `dark` class on `document.documentElement`.
- Maintain semantic color tokens via CSS variables.

### 6.3 Color Direction (trend)
- Avoid plain black/white contrast.
- Use layered neutrals + one accent color.
- Suggested palette:
  - Background: warm neutral dark (`#0E1116`)
  - Surface: `#151A22`
  - Text primary: `#E8EDF5`
  - Accent: cyan/teal (`#2DD4BF` range)

## 7. Typography
- Headline font: expressive geometric sans (e.g., `Space Grotesk`)
- Body font: readable sans with Korean support (e.g., `IBM Plex Sans KR`, `Pretendard`)
- Scale:
  - H1: `text-4xl md:text-6xl`
  - H2: `text-2xl md:text-4xl`
  - Body: `text-sm md:text-base`

## 8. Component Architecture
Recommended folder structure:

```txt
src/
  assets/
  components/
    common/
      Button.jsx
      SectionTitle.jsx
      ThemeToggle.jsx
    navigation/
      Header.jsx
      MobileMenu.jsx
    cards/
      ProjectCard.jsx
      SkillBadge.jsx
  sections/
    HeroSection.jsx
    AboutSection.jsx
    SkillsSection.jsx
    ProjectsSection.jsx
    ExperienceSection.jsx
    ContactSection.jsx
  data/
    portfolioData.js
  hooks/
    useTheme.js
    useActiveSection.js
  utils/
    cn.js
  App.jsx
  main.jsx
```

## 9. Data Model (v1)
`portfolioData.js` should contain:
- `profile`: name, role, short bio, location
- `skills`: grouped by category (Frontend, Tooling, etc.)
- `projects`: title, summary, stack, role, links, image
- `experience`: company, period, achievements
- `contact`: email, github, linkedin, blog

## 10. UX Details
- Smooth scroll for section navigation.
- Active section highlight in header.
- Project cards:
  - tech tags
  - key impact metric (if available)
  - CTA buttons (Demo / GitHub)
- Contact section with clear primary CTA.

## 11. Accessibility (A11y)
- Use semantic landmarks (`header`, `main`, `section`, `footer`).
- Keyboard navigable menu and controls.
- Color contrast WCAG AA target.
- All icon-only buttons require `aria-label`.
- Respect reduced motion preference.

## 12. Performance
- Keep hero assets optimized (WebP/AVIF where possible).
- Lazy-load non-critical images.
- Avoid heavy animation on initial render.
- Lighthouse target (local):
  - Performance 90+
  - Accessibility 90+
  - Best Practices 90+
  - SEO 90+

## 13. Development Conventions
- Use function components + hooks.
- Keep presentational components stateless when possible.
- Keep section-level content driven by data file.
- Naming:
  - Components: `PascalCase`
  - Hooks: `useSomething`
  - Data/constants: `camelCase` / `UPPER_SNAKE_CASE`

## 14. Milestones
1. **M1 - Foundation**
   - Vite + React + Tailwind setup
   - global theme tokens + dark mode toggle
   - base layout + header/footer
2. **M2 - Core Sections**
   - Hero/About/Skills/Projects/Experience/Contact
   - responsive polish
3. **M3 - Quality**
   - accessibility pass
   - animation tuning
   - performance optimization
4. **M4 - Deploy Ready**
   - final content replacement
   - metadata/OG setup
   - deploy (Vercel/Netlify)

## 15. Out of Scope (v1)
- Backend APIs
- CMS/admin dashboard
- Auth/user session
- Multilingual support (can be v2)

## 16. Next Action
- Start with `M1 - Foundation` using this spec as source of truth.
- First implementation PR should include:
  - React+Vite scaffold
  - Tailwind setup
  - theme toggle
  - header + hero + footer responsive skeleton
