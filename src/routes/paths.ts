import type { PersonaRecord } from '../types/demo'

export type OnboardingStep = 1 | 2 | 3

/** URL은 이 파일에서만 만든다. 페이지에서 문자열로 경로를 조립하지 않는다. */
export const paths = {
  root: '/',
  demo: '/demo',
  welcome: '/welcome',
  authMethod: '/auth',
  login: '/login',
  signup: '/signup',
  onboarding: (step: OnboardingStep) => `/onboarding/${step}`,
  home: '/home',
  explore: '/explore',
  search: '/search',
  story: (storyId: string) => `/stories/${encodeURIComponent(storyId)}`,
  storyConnections: (storyId: string) => `/stories/${encodeURIComponent(storyId)}/connections`,
  map: '/map',
  badges: '/map/badges',
  library: '/library',
  profile: '/profile',
  pass: '/pass',
  passPlan: '/pass/plan',
  passComplete: '/pass/complete',
} as const

/** 퍼소나의 현재 상태에 맞는 시작 화면. `/`와 `/demo`에서만 쓴다. */
export function getStartPath(record: PersonaRecord): string {
  if (!record.signedIn || record.account === null) return paths.welcome
  if (!record.account.profileCompleted) return paths.onboarding(1)
  return paths.home
}

/** 가드가 "원래 가려던 곳"을 넘길 때 쓰는 location.state 형태 */
export interface ReturnState {
  from?: string
}

/**
 * 환영 화면에 스플래시(ODIT? → DO IT!)부터 보여달라는 표시.
 * 퍼소나 시작·처음부터 보기에서만 붙인다. 로그인 화면에서 뒤로 왔을 때는 스플래시를 다시 틀지 않는다.
 */
export interface SplashState {
  showSplash: true
}

export const SPLASH_STATE: SplashState = { showSplash: true }

export function wantsSplash(state: unknown): boolean {
  return typeof state === 'object' && state !== null && 'showSplash' in state && state.showSplash === true
}

/** 시작 경로가 환영 화면이면 스플래시부터 보여준다 */
export function startNavigation(record: PersonaRecord): { to: string; state?: SplashState } {
  const to = getStartPath(record)
  return to === paths.welcome ? { to, state: SPLASH_STATE } : { to }
}

/**
 * 로그인·퍼소나 선택 뒤 돌아갈 경로는 앱 내부 경로만 허용한다.
 * `//evil.com`, `https://…`, `javascript:` 같은 값은 버린다.
 */
export function toSafeReturnPath(value: unknown): string | null {
  if (typeof value !== 'string') return null
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return null
  if (value === paths.root || value.startsWith(paths.demo)) return null
  return value
}

export function readReturnPath(state: unknown): string | null {
  if (typeof state !== 'object' || state === null || !('from' in state)) return null
  return toSafeReturnPath((state as ReturnState).from)
}
