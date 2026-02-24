# Portfolio Field Reference for REST API

## 1. 문서 목적
- 현재 프론트엔드(`react-portfolio`)에서 실제로 사용하는 데이터 필드를 정리한다.
- Notion/정적 파일 기반 데이터에서 RESTful API로 전환할 때 필요한 필드 기준안을 제공한다.
- 백엔드/프론트엔드 간 필드 계약(Contract) 수립 시 체크리스트로 사용한다.

## 2. 기준 소스
- 타입 정의: `src/types/portfolio.ts`
- 정적 데이터: `src/data/portfolioData.ts`
- 실제 사용처: `src/components/**`, `src/sections/**`

## 3. 최상위 데이터 구조(현재)
```ts
interface PortfolioData {
  profile: Profile;
  navItems: NavItem[];
  skills: SkillGroup[];
  projects: Project[];
  experience: Experience[];
  contact: Contact;
}
```

## 4. 필드 사용 현황

### 4.1 profile
| field | type | 현재 사용 여부 | 주요 사용처 |
|---|---|---|---|
| name | string | 사용 | Header, Footer |
| role | string | 사용 | Hero |
| headline | string | 사용 | Hero |
| summary | string | 사용 | Hero |
| location | string | 사용 | Hero, Footer |
| bio | string[] | 사용 | About |
| photoSrc | string | 사용 | Hero |
| photoAlt | string | 사용 | Hero |

### 4.2 navItems
| field | type | 현재 사용 여부 | 주요 사용처 |
|---|---|---|---|
| id | string | 사용 | Header(anchor href, key) |
| label | string | 사용 | Header(nav text) |

### 4.3 skills[]
| field | type | 현재 사용 여부 | 주요 사용처 |
|---|---|---|---|
| category | string | 사용 | SkillsSection, SkillGroup |
| items | string[] | 사용 | SkillGroup |

### 4.4 projects[]
| field | type | 현재 사용 여부 | 주요 사용처 |
|---|---|---|---|
| title | string | 사용 | ProjectCard, Modal |
| summary | string | 사용 | ProjectCard, Modal |
| stack | string[] | 사용 | ProjectCard, Modal |
| role | string | 사용 | ProjectCard, Modal |
| impact | string | 사용 | ProjectCard, Modal |
| details | string[] (optional) | 사용(조건부) | Modal(highlights) |
| links.github | string | 사용 | ProjectCard |
| links.demo | string | 미사용(UI 기준) | 타입/데이터에는 존재 |

### 4.5 experience[]
| field | type | 현재 사용 여부 | 주요 사용처 |
|---|---|---|---|
| company | string | 사용 | ExperienceSection |
| position | string | 사용 | ExperienceSection |
| period | string | 사용 | ExperienceSection |
| achievements | string[] | 사용 | ExperienceSection |

### 4.6 contact
| field | type | 현재 사용 여부 | 주요 사용처 |
|---|---|---|---|
| email | string | 사용 | Contact |
| github | string | 사용 | Contact |
| linkedin | string | 사용 | Contact |
| blog | string | 사용 | Contact |
| message | string | 사용 | Contact |

## 5. REST API 전환 시 필수 필드(최소)
아래 필드만 있어도 현재 UI를 깨지지 않게 전환 가능하다.

- `profile`: `name`, `role`, `headline`, `summary`, `location`, `bio`, `photoSrc`, `photoAlt`
- `navItems[]`: `id`, `label`
- `skills[]`: `category`, `items`
- `projects[]`: `title`, `summary`, `stack`, `role`, `impact`, `details?`, `links.github`
- `experience[]`: `company`, `position`, `period`, `achievements`
- `contact`: `email`, `github`, `linkedin`, `blog`, `message`

## 6. REST API 전환 시 권장 추가 필드
운영/정렬/확장성을 위해 아래 필드 추가를 권장한다.

### 6.1 공통 메타
- `id: string` (각 엔티티 고유값)
- `order: number` (정렬 제어)
- `isVisible: boolean` (노출 제어)
- `createdAt: string(ISO8601)`
- `updatedAt: string(ISO8601)`

### 6.2 projects 권장 확장
- `slug: string` (URL/라우팅 친화)
- `thumbnailUrl?: string`
- `links.demo?: string` (현재 미사용이지만 확장 대비)
- `status?: "draft" | "published"`

### 6.3 navItems 권장 확장
- `targetSection?: string` (`hero`, `about` 등)
- `isExternal?: boolean`
- `externalUrl?: string`

## 7. API 응답 형태 제안

### 7.1 1차 전환(프론트 변경 최소화)
- `GET /api/v1/portfolio`
- 현재 `PortfolioData`와 거의 동일한 shape로 반환

예시:
```json
{
  "profile": { "name": "", "role": "", "headline": "", "summary": "", "location": "", "bio": [], "photoSrc": "", "photoAlt": "" },
  "navItems": [{ "id": "hero", "label": "Home" }],
  "skills": [{ "category": "Frontend", "items": ["React", "TypeScript"] }],
  "projects": [{ "title": "", "summary": "", "stack": [], "role": "", "impact": "", "details": [], "links": { "github": "", "demo": "" } }],
  "experience": [{ "company": "", "position": "", "period": "", "achievements": [] }],
  "contact": { "email": "", "github": "", "linkedin": "", "blog": "", "message": "" },
  "meta": { "syncedAt": "2026-02-24T00:00:00Z", "source": "notion" }
}
```

### 7.2 2차 전환(정규화)
- `GET /api/v1/profile`
- `GET /api/v1/nav-items`
- `GET /api/v1/skills`
- `GET /api/v1/projects`
- `GET /api/v1/experience`
- `GET /api/v1/contact`

## 8. 프론트 전환 체크리스트
- [ ] `portfolioData` 정적 import를 API fetch로 대체
- [ ] `Project.links.demo` 사용 여부 결정(미사용 유지/노출 추가)
- [ ] `period` 문자열 정책 유지 여부 확인(예: "2024.01 - 현재")
- [ ] 필드 누락 대비 fallback UI 적용
- [ ] API 실패/로딩 상태 UI 반영
