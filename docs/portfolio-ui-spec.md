# React + Vite 포트폴리오 UI 스펙 문서

## 1. 목표
- React + Vite 기반의 **프론트엔드 전용 포트폴리오 UI**를 구축한다.
- 채용 담당자/협업자를 기준으로 빠르게 이해 가능한 구조와 가독성을 제공한다.
- v1 범위에서는 백엔드/API 연동을 제외한다.

## 2. 범위(v1)
- 섹션 기반 단일 페이지 포트폴리오
- 다크 모드 지원(수동 토글 + 시스템 설정 반영)
- 모바일 우선 반응형 레이아웃
- Tailwind CSS 기반 스타일링
- 재사용 가능한 컴포넌트 구조
- 기본 접근성/성능 기준 충족

## 3. 기술 스택
- 프레임워크: `React 18+`
- 번들러: `Vite`
- 스타일링: `Tailwind CSS`
- 아이콘: `lucide-react` 또는 `heroicons`
- 애니메이션: CSS + 경량 라이브러리(`framer-motion` 선택)
- 패키지 매니저: `npm`

## 4. 정보 구조(IA)
단일 페이지 섹션 구성:
1. Hero
2. About
3. Skills
4. Projects
5. Experience
6. Contact

공통 UI:
- Sticky Header 네비게이션
- 테마 토글(라이트/다크)
- Footer(소셜 링크/저작권)

## 5. 레이아웃 스펙
### 5.1 브레이크포인트
- `sm`: 640px 이상
- `md`: 768px 이상
- `lg`: 1024px 이상
- `xl`: 1280px 이상

### 5.2 컨테이너 규칙
- 최대 너비: `1200px` (Tailwind 기준 `max-w-6xl` ~ `max-w-7xl`)
- 수평 패딩:
  - 모바일: `px-4`
  - 태블릿: `px-6`
  - 데스크탑: `px-8`

### 5.3 섹션 간격
- 세로 여백:
  - 모바일: `py-16`
  - 데스크탑: `py-24`
- 모든 섹션은 제목 + 보조 설명 구조를 기본으로 한다.

## 6. 테마(다크 모드)
### 6.1 동작 규칙
초기 테마 우선순위:
1. 사용자 저장 설정(`localStorage`)
2. 시스템 설정(`prefers-color-scheme`)
3. 기본값: 다크

### 6.2 구현 방식
- Tailwind 설정: `darkMode: 'class'`
- `document.documentElement`에 `dark` 클래스 적용/해제
- CSS 변수 기반 시맨틱 컬러 토큰 사용

### 6.3 컬러 방향(트렌드 반영)
- 완전 흑백 대비 대신 레이어드 뉴트럴 사용
- 브랜드 포인트용 단일 액센트 컬러 사용
- 권장 팔레트:
  - 배경: `#0E1116`
  - 표면: `#151A22`
  - 본문 텍스트: `#E8EDF5`
  - 액센트: `#2DD4BF` 계열

## 7. 타이포그래피
- 제목 폰트: 개성 있는 기하학 계열 산세리프(예: `Space Grotesk`)
- 본문 폰트: 한글 가독성 우수 폰트(예: `IBM Plex Sans KR`, `Pretendard`)
- 권장 스케일:
  - H1: `text-4xl md:text-6xl`
  - H2: `text-2xl md:text-4xl`
  - Body: `text-sm md:text-base`

## 8. 컴포넌트 아키텍처
권장 폴더 구조:

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

## 9. 데이터 모델(v1)
`portfolioData.js`에 다음 정보를 구조화한다.
- `profile`: 이름, 직무, 한 줄 소개, 위치
- `skills`: 카테고리별 스킬(Frontend, Tooling 등)
- `projects`: 제목, 요약, 기술 스택, 역할, 링크, 이미지
- `experience`: 회사, 기간, 성과
- `contact`: 이메일, GitHub, LinkedIn, 블로그

## 10. UX 디테일
- 섹션 이동 시 스무스 스크롤 적용
- 현재 섹션 활성 상태를 헤더에 표시
- 프로젝트 카드에 다음 정보 포함:
  - 기술 태그
  - 핵심 임팩트(수치 가능 시)
  - CTA 버튼(Demo / GitHub)
- Contact 섹션은 명확한 1차 액션(연락 유도)을 제공

## 11. 접근성(A11y)
- 시맨틱 랜드마크(`header`, `main`, `section`, `footer`) 사용
- 키보드 내비게이션 가능해야 함
- 색 대비 WCAG AA 수준 목표
- 아이콘 전용 버튼에 `aria-label` 필수
- `prefers-reduced-motion` 존중

## 12. 성능
- Hero 이미지 최적화(WebP/AVIF 우선)
- 비핵심 이미지 lazy loading
- 초기 렌더에서 과도한 애니메이션 지양
- 로컬 Lighthouse 목표:
  - Performance 90+
  - Accessibility 90+
  - Best Practices 90+
  - SEO 90+

## 13. 개발 컨벤션
- 함수형 컴포넌트 + 훅 사용
- 프레젠테이셔널 컴포넌트는 가능한 상태 비보유
- 섹션 콘텐츠는 데이터 파일 중심 관리
- 네이밍 규칙:
  - 컴포넌트: `PascalCase`
  - 훅: `useSomething`
  - 데이터/상수: `camelCase` / `UPPER_SNAKE_CASE`

## 14. 마일스톤
1. **M1 - 기반 구축**
   - Vite + React + Tailwind 세팅
   - 전역 테마 토큰 + 다크모드 토글
   - 기본 레이아웃(헤더/푸터)
2. **M2 - 핵심 섹션 구현**
   - Hero/About/Skills/Projects/Experience/Contact
   - 반응형 디테일 보완
3. **M3 - 품질 개선**
   - 접근성 점검
   - 애니메이션 튜닝
   - 성능 최적화
4. **M4 - 배포 준비**
   - 최종 콘텐츠 반영
   - 메타/OG 정리
   - 배포(Vercel/Netlify)

## 15. 제외 범위(v1)
- 백엔드 API
- CMS/관리자 대시보드
- 인증/세션
- 다국어 지원(v2 후보)

## 16. 즉시 다음 작업
- 본 문서를 기준으로 `M1 - 기반 구축`부터 진행한다.
- 첫 구현 PR에는 다음이 포함되어야 한다.
  - React+Vite 스캐폴딩
  - Tailwind 설정
  - 다크모드 토글
  - 헤더 + Hero + 푸터 반응형 스켈레톤
