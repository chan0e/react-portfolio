# Frontend Agent Skillset Rules (react-portfolio)

## 1. 목적
- 이 문서는 `react-portfolio` 프론트엔드 작업 시 에이전트가 반드시 따르는 실행 규칙이다.
- 목표는 UI 완성도보다 `구조적 일관성`, `보안`, `유지보수성`, `배포 안정성`을 우선하는 것이다.

## 2. 프로젝트 적용 범위
- 현재 스택: `React 18`, `TypeScript`, `Vite 5`, `Tailwind CSS`, `lucide-react`
- 현재 데이터 소스: `src/data/portfolioData.ts` (정적 데이터)
- 목표 아키텍처: REST API 기반 데이터 공급(문서: `docs/portfolio-api-field-reference.md`)
- 화면 구조: 단일 페이지 섹션 조합(`Hero/About/Skills/Projects/Experience/Contact`)

## 3. 에이전트 역할
- 요구사항을 "컴포넌트 수정"이 아니라 "도메인 데이터 흐름 변경"으로 해석한다.
- 변경마다 아래 4가지를 함께 검증한다.
  - 기능 정확성
  - 구조 일관성
  - 성능 영향
  - 보안 리스크

## 4. 구조 규칙

### 4.1 디렉터리 책임
- `src/components`: 재사용 가능한 UI 조각 (표시 중심)
- `src/sections`: 페이지 섹션 단위 화면 구성
- `src/layouts`: 페이지 골격/섹션 배치
- `src/data`: 정적/임시 데이터 소스
- `src/types`: 도메인 타입 정의
- `src/hooks`: 상태/효과 재사용 로직
- `src/utils`: 순수 유틸리티 함수

### 4.2 의존성 방향
- `sections`는 `components`를 조합할 수 있지만 역방향 참조 금지
- API/데이터 접근 로직은 UI 컴포넌트 내부에 직접 두지 않는다
- 순환 참조(circular dependency) 금지

### 4.3 컴포넌트 설계
- 컴포넌트 단일 책임 원칙 준수
- `any` 타입 금지, props 타입 명시
- 접근성 속성(`aria-*`, 버튼 역할 등)을 기능 요구사항으로 취급

## 5. 데이터/API 규칙
- 서버 응답 타입과 UI 표시 타입을 분리한다(DTO -> ViewModel 매핑)
- 필수/옵셔널 필드 및 누락 폴백을 명확히 둔다
- 로딩/에러/빈 상태를 기본 경로로 구현한다
- REST 전환 시 `PortfolioData`와의 호환 단계를 먼저 만든다

### 5.1 전환 단계 원칙
1. 1차: `GET /api/v1/portfolio`로 기존 shape 유지
2. 2차: 도메인별 엔드포인트 분리(`profile`, `projects`, `skills` 등)
3. 3차: 정렬/노출/버전 메타(`order`, `isVisible`, `updatedAt`) 확장

## 6. 보안 규칙

### 6.1 XSS/출력 안전
- `dangerouslySetInnerHTML` 사용 금지(예외 시 sanitize 필수)
- 외부/사용자 입력 문자열은 신뢰하지 않고 검증 후 출력
- URL은 allowlist 기반 검증(`javascript:` 스킴 차단)

### 6.2 인증/비밀정보
- 액세스 토큰의 장기 `localStorage` 저장 지양, 가능하면 HttpOnly Cookie 우선
- API 키/비밀값 하드코딩 금지
- `.env` 값이 클라이언트 번들로 노출되는지 항상 확인

### 6.3 브라우저/네트워크
- `target="_blank"` 링크는 `rel="noreferrer noopener"` 기본 적용
- CORS/CSRF 정책은 백엔드 계약 문서와 일치시킨다
- 업로드 기능 추가 시 확장자/크기/MIME을 프론트+서버 양쪽에서 검증

### 6.4 의존성 보안
- 신규 라이브러리 도입 전 유지보수 상태/보안 이슈 확인
- 배포 전 취약점 점검(`npm audit` 또는 동등 절차) 수행

## 7. 접근성/UX 규칙
- 시맨틱 태그(`header/main/section/footer/button`) 우선 사용
- 키보드만으로 핵심 흐름 조작 가능해야 함
- 모달은 포커스 트랩, ESC 닫기, 포커스 복원 보장
- 색상만으로 상태 전달 금지(텍스트/아이콘 동반)

## 8. 성능 규칙
- 리스트 key는 안정적 식별자 사용
- 큰 컴포넌트/모달은 필요 시 lazy loading 검토
- 이미지는 실제 렌더 크기에 맞춰 제공
- 최적화 훅(`memo`, `useMemo`, `useCallback`)은 측정 근거 기반 적용

## 9. 품질/검증 규칙
- 현재 저장소 최소 기준: `npm run build` 통과
- `typecheck`/`lint` 스크립트가 추가되면 필수 게이트로 승격
- 회귀 위험 변경은 테스트 또는 체크리스트 증거를 남긴다

## 10. 리뷰 체크리스트
- 구조: 책임 분리와 계층 방향이 유지되는가?
- 데이터: 필드 누락/에러/빈 상태 대응이 충분한가?
- 보안: XSS/비밀값/외부 링크 취약점이 없는가?
- 성능: 불필요한 리렌더/번들 증가가 없는가?
- 접근성: 키보드/aria/대체 텍스트가 충족되는가?

## 11. 작업 원칙
- 큰 변경은 작은 안전 단계로 분할한다
- 계약 변경 시 코드보다 계약 문서를 먼저 갱신한다
- 푸시 전 변경 의도/영향 범위/리스크를 3줄 이내로 요약한다
