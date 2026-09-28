import { createContext } from 'react'
import type { Account, InterestId, PersonaId, PersonaMeta, PersonaRecord, SessionStatus, User } from '../types/demo'

/** 'continue' = 저장된 진행 상태로 이어서, 'fromSplash' = 스플래시부터 다시 보기 */
export type StartMode = 'continue' | 'fromSplash'

export interface DemoContextValue {
  personaId: PersonaId | null
  /** 현재 퍼소나의 시연 상태. personaId가 null이면 null */
  record: PersonaRecord | null
  personas: PersonaMeta[]
  /** 퍼소나를 고르고, 이동할 시작 경로 계산에 쓸 상태를 돌려준다 */
  startPersona: (id: PersonaId, mode?: StartMode) => PersonaRecord
  /** 해당 퍼소나의 시연 데이터만 seed로 되돌린다 */
  resetPersona: (id: PersonaId) => PersonaRecord
  updateRecord: (updater: (record: PersonaRecord) => PersonaRecord) => void
}

export const DemoContext = createContext<DemoContextValue | null>(null)

export type LoginResult = { ok: true; account: Account } | { ok: false; reason: 'no-persona' | 'no-account' }

export interface SessionContextValue {
  status: SessionStatus
  currentUser: User | null
  profileCompleted: boolean
  /** 데모 로그인: 이 퍼소나로 가입된 이메일인지만 확인한다 (비밀번호는 저장·비교하지 않음) */
  login: (email: string) => LoginResult
  signup: (input: { email: string; nickname: string }) => void
  completeSetup: (interests: InterestId[]) => void
  /** 실제 세션 종료. 계정은 남아서 다시 로그인할 수 있다. */
  logout: () => void
}

export const SessionContext = createContext<SessionContextValue | null>(null)
