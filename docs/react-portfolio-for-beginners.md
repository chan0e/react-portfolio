# React 포트폴리오 입문 가이드

## 1. 이 문서는 누구를 위한 문서인가?
- React를 막 시작한 입문자
- "파일이 많아 보이는데 어디부터 봐야 하지?"가 막막한 사람
- UI 중심 프로젝트를 구조적으로 이해하고 싶은 사람

이 문서 하나로 다음을 이해할 수 있다.
- 이 프로젝트가 어떤 흐름으로 화면을 그리는지
- 어떤 파일에서 어떤 역할을 담당하는지
- 데이터를 어떻게 바꾸면 화면이 바뀌는지
- 모달/다크모드/반응형이 어디서 동작하는지

## 2. 먼저 실행해보기
프로젝트 루트(`d:\react-portfolio`)에서:

```bash
npm install
npm run dev
```

빌드 검증:

```bash
npm run build
```

## 3. 전체 렌더링 흐름(가장 중요)
1. `src/main.tsx`
- 앱 시작점이다.
- 전역 CSS(`src/styles/index.css`)를 불러온다.
- `<App />`를 `#root`에 렌더링한다.

2. `src/App.tsx`
- `useTheme` 훅으로 현재 테마와 토글 함수를 가져온다.
- `MainLayout`에 `theme`, `onToggleTheme`를 전달한다.

3. `src/layouts/MainLayout.tsx`
- 실제 페이지 틀이다.
- `Header`, `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Contact`, `Footer` 순서로 배치한다.

즉, 흐름은 아래처럼 보면 된다.

`main.tsx -> App.tsx -> MainLayout.tsx -> 각 Section`

## 4. 폴더별 역할
### `src/components`
- 화면에서 재사용하는 작은 조각들
- 예: `Header`, `ThemeToggle`, `ProjectCard`, `ProjectDetailModal`

### `src/sections`
- 페이지의 큰 구역 단위 컴포넌트
- 예: `HeroSection`, `ProjectsSection`

### `src/data`
- 실제 화면 텍스트/링크/프로젝트 정보를 담는 데이터 파일
- 이 프로젝트는 `portfolioData.ts`를 바꾸면 UI 내용이 바뀐다.

### `src/types`
- 데이터 타입 정의
- 예: `Project`, `Profile`, `Contact`

### `src/hooks`
- 재사용 로직
- 현재 핵심은 `useTheme.ts`(다크모드/라이트모드)

### `src/styles`
- Tailwind + 커스텀 CSS 토큰/컴포넌트 클래스

### `src/utils`
- 기술 스택 칩 색상 같은 공통 유틸 로직

## 5. "내용 바꾸기"는 어디서?
대부분 `src/data/portfolioData.ts`만 수정하면 된다.

예를 들어:
- 이름/직무/소개 문구
- 스킬 목록
- 프로젝트 카드 정보
- 연락처 링크

코드 컴포넌트를 수정하지 않고도 포트폴리오 내용을 갱신할 수 있게 설계되어 있다.

## 6. 프로젝트 상세 모달은 어떻게 동작하나?
관련 파일:
- `src/sections/ProjectsSection.tsx`
- `src/components/cards/ProjectCard.tsx`
- `src/components/modals/ProjectDetailModal.tsx`

동작 순서:
1. 카드의 `Detail` 버튼 클릭
2. `ProjectsSection`의 `selectedProject` 상태에 선택된 프로젝트 저장
3. `ProjectDetailModal`이 열리면서 상세 정보 출력

닫기 방법:
- 상단 `X` 버튼
- 배경 클릭
- `Esc` 키

긴 내용 대응:
- 모달 전체는 `max-h-[90vh]`
- 내부 콘텐츠는 `overflow-y-auto`
- 내용이 길면 모달 안에서만 스크롤된다.

## 7. 다크모드는 어디서 바뀌나?
관련 파일:
- `src/hooks/useTheme.ts`
- `src/components/ThemeToggle.tsx`

핵심 개념:
- 현재 테마를 상태(`theme`)로 관리
- HTML 루트에 `dark` 클래스를 붙였다 떼면서 스타일 변경
- 사용자 선택은 `localStorage`에 저장해서 새로고침 후에도 유지

## 8. 프로필 사진은 어디에 넣나?
이미지 위치:
- `public/images/profile/profile-photo.png`

데이터 연결:
- `src/data/portfolioData.ts`의 `profile.photoSrc`

즉, 같은 경로/파일명을 유지하고 사진만 교체하면 화면이 자동 반영된다.

## 9. 입문자가 많이 하는 실수
1. `src/data/portfolioData.ts`를 안 바꾸고 컴포넌트만 수정함
- 이 프로젝트는 데이터 중심이므로 먼저 데이터 파일을 수정하는 게 맞다.

2. Tailwind 클래스와 커스텀 클래스 역할을 혼동함
- 공통 스타일은 `src/styles/index.css`의 `.section-wrap`, `.glass-card` 같은 클래스로 관리한다.

3. 모달 스크롤 누락
- 콘텐츠가 길어질 수 있는 UI는 `max-height + overflow`를 반드시 같이 고려해야 한다.

## 10. 실무형으로 더 발전시키려면
1. `lint`, `test` 스크립트 추가
2. 모달/테마 토글에 대한 단위 테스트 작성
3. GitHub Actions에 `build + lint + test` 자동화
4. 배포 문서와 운영 체크리스트 추가

이 4가지를 하면 "학습용"에서 "실무형"으로 한 단계 올라간다.
