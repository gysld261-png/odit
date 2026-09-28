/** 시연 퍼소나. A = 이준호(신규), B = 김지우(기존). 인증·권한 수단이 아니다. */
export type PersonaId = 'A' | 'B'

export type SessionStatus = 'restoring' | 'guest' | 'authenticated'

/** 온보딩 관심사 6개 (Figma 3D 아이콘 파일명 기준) */
export const INTEREST_IDS = ['daily-life', 'relationships', 'food-trends', 'work-money', 'power', 'world-stories'] as const
export type InterestId = (typeof INTEREST_IDS)[number]

export interface User {
  id: string
  nickname: string
  email: string
  interests: InterestId[]
}

/** 가입된 데모 계정. 비밀번호는 저장하지 않는다(입력값 검증만 한다). */
export interface Account extends User {
  profileCompleted: boolean
}

/**
 * 퍼소나별로 저장되는 시연 상태 (`odit:demo:v1:{A|B}`).
 * 계정(account)과 로그인 여부(signedIn)를 나눈 이유: 로그아웃해도 가입 정보는 남아 있어야 다시 로그인할 수 있다.
 */
export interface PersonaRecord {
  version: 1
  account: Account | null
  signedIn: boolean
  progress: PersonaProgress
}

/**
 * 시연 중 바뀌는 개인 기록. 공개 콘텐츠(이야기·논쟁)는 공통 seed에 두고 여기에는 id만 남긴다.
 * 수치는 목록에서 계산한다 (예: 저장한 이야기 수 = savedStoryIds.length).
 */
export interface PersonaProgress {
  /** 이번 주 역사 유형. 신규 사용자는 아직 없다(null) */
  historyType: string | null
  /** 이번 주 발견한 연결 수 (홈 "n개의 연결고리를 발견했어요!") */
  weeklyConnectionCount: number
  /** 이번 주 발견한 연결에 찍힌 노드 이름 (홈 연결 지도, 최대 5개 표시) */
  weeklyNodes: string[]
  /** 역사 지도에 기록된 이야기 (연결 선택 화면에 도착하면 추가) */
  readStoryIds: string[]
  savedStoryIds: string[]
  /** VS 투표: 논쟁 id → 고른 선택지 id */
  votes: Record<string, string>
}

export interface PersonaMeta {
  id: PersonaId
  name: string
  kind: 'new' | 'existing'
  kindLabel: string
  /** 데모 가이드에 보이는 이용 목적 한 줄 */
  tagline: string
  /** 로그인·가입 화면 자동 입력용 데모 이메일 */
  demoEmail: string
  /** 가입할 때 쓰는 닉네임 (Figma 가입 화면에 닉네임 입력란이 없어서 데모 기본값을 쓴다) */
  defaultNickname: string
}
