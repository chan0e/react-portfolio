# React + Vite 포트폴리오 UI 스펙 문서

## 1. 문서 목적
- 본 문서는 `react-portfolio` 프로젝트의 UI 설계 기준과 구현 상태를 정리한 기준 문서다.
- 백엔드 없이 프론트엔드 단일 페이지 포트폴리오를 안정적으로 운영하는 것을 목표로 한다.
- 실무에서 바로 확장 가능한 구조(타입 안정성, 접근성, 유지보수성)를 기본 원칙으로 둔다.

## 2. 현재 기준 정보
- 문서 기준일: `2026-02-23`
- 런타임: `React 18`, `TypeScript`, `Vite 5`
- 스타일: `Tailwind CSS` + 전역 CSS 토큰(`src/styles/index.css`)
- 아이콘: `lucide-react`

## 3. 목표
- 2026년 기준 모던하고 미니멀한 개발자 포트폴리오 UI
- 다크모드/라이트모드 동시 지원
- 모바일~데스크탑 반응형 완성도 확보
- 섹션 중심 정보 구조와 빠른 가독성
- 프로젝트 상세를 페이지 이탈 없이 확인 가능한 UX 제공

## 4. 정보 구조(IA)
단일 페이지 섹션 구성:
1. Hero
2. About
3. Skills
4. Projects
5. Experience
6. Contact

공통 UI:
- Sticky Header + 모바일 스크롤 메뉴
- Theme Toggle
- Footer

## 5. 실제 폴더 구조(현재 코드 기준)
```txt
docs/
  portfolio-ui-spec.md
  react-portfolio-for-beginners.md
public/
  images/
    profile/
      profile-photo.png
src/
  components/
    cards/
      ProjectCard.tsx
      SkillGroup.tsx
    modals/
      ProjectDetailModal.tsx
    Footer.tsx
    Header.tsx
    SectionTitle.tsx
    ThemeToggle.tsx
  data/
    portfolioData.ts
  hooks/
    useTheme.ts
  layouts/
    MainLayout.tsx
  sections/
    AboutSection.tsx
    ContactSection.tsx
    ExperienceSection.tsx
    HeroSection.tsx
    ProjectsSection.tsx
    SkillsSection.tsx
  styles/
    index.css
  types/
    portfolio.ts
  utils/
    techBadge.ts
  App.tsx
  main.tsx
```

## 6. 레이아웃/스타일 스펙
### 6.1 반응형
- 브레이크포인트: Tailwind 기본(`sm`, `md`, `lg`, `xl`) 사용
- 컨테이너 규칙: `.section-wrap` (`max-w-6xl`, `px-4/6/8`)
- 섹션 간격: `.section-space` (`py-16`, `md:py-24`)

### 6.2 간격 시스템
- 8px 기반 리듬 유지
- 카드/칩/버튼/섹션에서 `4, 8, 12, 16, 24, 32` 단위 사용

### 6.3 색상 시스템
- 방향: 다크 네이비 + 쿨 그레이 + 블루 포인트
- 전역 토큰:
  - `--color-bg`
  - `--color-surface`
  - `--color-surface-soft`
  - `--color-text`
  - `--color-muted`
  - `--color-accent`
  - `--color-accent-strong`
- 라이트/다크 모두 동일 토큰 이름으로 교체 가능하도록 구성

## 7. 다크모드 스펙
- 저장 키: `localStorage.theme`
- 우선순위:
1. 로컬 저장값
2. 시스템 설정(`prefers-color-scheme`)
3. 기본값
- 구현:
  - `useTheme` 훅에서 상태 관리
  - `document.documentElement`에 `dark` 클래스 토글

## 8. 컴포넌트/데이터 스펙
- 모든 핵심 화면 컴포넌트는 TSX 기반
- 데이터 소스는 `src/data/portfolioData.ts` 단일 진입점
- 타입은 `src/types/portfolio.ts`에서 관리
- 기술 스택 배지는 `src/utils/techBadge.ts`로 색상 매핑

## 9. Projects 상세 모달 스펙
- 위치: `src/components/modals/ProjectDetailModal.tsx`
- 열기 방식: 카드 `Detail` 버튼 클릭 시 섹션 내부 상태로 오픈
- 닫기 방식:
  - 우측 상단 `X` 버튼
  - 배경 오버레이 클릭
  - `Esc` 키
- 접근성:
  - `role="dialog"`
  - `aria-modal="true"`
  - 제목 `aria-labelledby` 연결
  - 포커스 트랩(탭 순환)
  - 닫힐 때 이전 포커스 복원
- 스크롤/반응형:
  - 모달 최대 높이: `max-h-[90vh]`
  - 내부 본문: `overflow-y-auto`
  - 긴 텍스트/상세 목록이 길어져도 모달 내부 스크롤로 대응
  - 배경 스크롤 잠금(`body.style.overflow = 'hidden'`)

## 10. 접근성/품질 기준
- 시맨틱 구조(`header/main/section/footer`) 유지
- 아이콘 버튼 `aria-label` 필수
- 키보드 접근(탭 이동, ESC 닫기) 보장
- 빌드 검증: `npm run build` 통과 상태 유지

## 11. 실무 관점 점검 결과
### 11.1 실무 사용 가능한 강점
- 섹션/컴포넌트/데이터/타입이 분리되어 변경 영향 범위가 명확함
- 테마 로직이 훅으로 독립되어 유지보수 용이
- 프로젝트 상세 모달에 접근성 및 오버플로우 대응이 들어가 있음
- 데이터 중심 렌더링으로 콘텐츠 변경 시 코드 수정량이 작음

### 11.2 보완 필요 항목(실무 표준 대비)
- `lint`, `test` 스크립트 부재
- 컴포넌트 단위 테스트(Vitest/Testing Library) 부재
- CI 파이프라인(GitHub Actions) 미구성
- ESLint/Prettier 규칙 문서화 미흡
- 배포 환경별 설정 문서(예: Vercel, Netlify) 미작성

### 11.3 권장 우선순위
1. `ESLint + Prettier + npm scripts(lint, format)` 정비
2. 핵심 UI 테스트 추가(테마 토글, 모달 열기/닫기, 섹션 렌더)
3. GitHub Actions로 `build + lint + test` 자동화
4. 배포 문서와 운영 체크리스트 작성

## 12. 마일스톤(업데이트)
1. M1 기반 구축: 완료
2. M2 핵심 섹션/디자인 고도화: 진행 중
3. M3 품질 자동화(테스트/CI): 예정
4. M4 배포/운영 정리: 예정

## 13. 변경 이력
### 2026-02-23
- `ProjectDetailModal`에 긴 콘텐츠 대응 스크롤 구조 적용
  - `max-h-[90vh]` + `overflow-y-auto` 추가
- Projects 상세 모달 접근성/닫기 UX 기준 재확인
- 본 스펙 문서를 실제 코드 구조(TSX 기준)로 최신화
- 실무 점검 항목 및 개선 우선순위 섹션 추가
