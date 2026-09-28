# 오딧 ODIT

> 어디까지 알고 있어? — 궁금한 역사 하나에서 시작해, 연결된 이야기까지

역사를 따로 공부하지 않는 20~30대를 위한 **역사 이야기 탐색 서비스**의 웹앱 구현입니다.
Figma 디자인을 기준으로, PC에서는 가운데 기기 목업 안에서, 모바일에서는 실제 화면에 맞춰 동작합니다.

로그인·회원가입·오딧 패스 결제는 백엔드 없이 동작하는 **데모(mock)** 입니다.

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 타입 검사 + 빌드
npm run lint     # oxlint
```

## 시연 퍼소나

| | 퍼소나 | 시작 상태 | 바로가기 |
|---|---|---|---|
| A | 이준호 · 드라마에서 본 역사가 궁금해 직접 찾아보는 사람 | 가입 전 (스플래시부터) | `/demo?persona=A` |
| B | 김지우 · 추천 피드에서 흥미로운 질문을 따라가는 사람 | 로그인된 기존 사용자 | `/demo?persona=B` |

PC에서는 기기 오른쪽 데모 가이드, 모바일에서는 `/demo` 화면과 DEMO 버튼으로 퍼소나를 고르고 초기화합니다.
시연 상태는 퍼소나별로 `localStorage`의 `odit:demo:v1:A` / `odit:demo:v1:B`에 저장됩니다.

## 기술

React + TypeScript + Vite · React Router (Declarative Mode) · CSS Modules + 디자인 토큰(CSS 변수) · motion

## 수정 위치

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 색·그림자·라운드·타이포 | `src/styles/tokens.css` |
| PC 배경·기기 크기·PC/모바일 전환 기준(1024px) | `src/config/showcase.ts` |
| 퍼소나 정보·초기 데이터 | `src/data/personas/` |
| URL | `src/routes/paths.ts`, `src/routes/AppRoutes.tsx` |

## 진행 상황

- [x] 2단계 공통 구조 — Vite, 토큰, 라우터·접근 제어, 퍼소나 상태, PC 기기 목업 / 모바일 전환, 404
- [ ] 3단계 대표 흐름 — A 가입·온보딩·신규 홈, B 기존 홈, 홈 → 상세 → 연결 선택
- [ ] 4단계 기능 — 탐색·검색, 저장·보관함, 지도·배지, VS 투표, 오딧 패스
- [ ] 5단계 검증과 배포 (Vercel)
