import { useCallback, useMemo, type ReactNode } from 'react'
import { useDemo } from '../hooks/useDemo'
import type { InterestId, SessionStatus } from '../types/demo'
import { SessionContext, type LoginResult, type SessionContextValue } from './contexts'

/**
 * 로그인 상태는 퍼소나와 별개다.
 * A도 가입하면 로그인 사용자가 되고, B도 로그아웃하면 비로그인이 된다. ("B면 항상 로그인" 아님)
 * 실제 데이터는 DemoProvider의 퍼소나별 record에 있고, 여기서는 세션 관점의 값과 동작만 제공한다.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  const { personaId, record, updateRecord } = useDemo()

  // DemoProvider가 저장소를 동기로 복원하므로 지금은 'restoring'이 나오지 않는다.
  // 백엔드 세션 확인이 생기면 그동안 'restoring'을 돌려주고, 가드는 이미 이 값을 기다리도록 되어 있다.
  const status: SessionStatus = record?.signedIn && record.account ? 'authenticated' : 'guest'
  const account = status === 'authenticated' ? (record?.account ?? null) : null

  const login = useCallback(
    (email: string): LoginResult => {
      if (personaId === null || record === null) return { ok: false, reason: 'no-persona' }
      const target = record.account
      if (target === null || target.email.toLowerCase() !== email.trim().toLowerCase()) {
        return { ok: false, reason: 'no-account' }
      }
      updateRecord((prev) => ({ ...prev, signedIn: true }))
      return { ok: true, account: target }
    },
    [personaId, record, updateRecord],
  )

  const signup = useCallback(
    ({ email, nickname }: { email: string; nickname: string }) => {
      if (personaId === null) return
      updateRecord((prev) => ({
        ...prev,
        account: { id: `user-${personaId}`, email: email.trim(), nickname, interests: [], profileCompleted: false },
        signedIn: true,
      }))
    },
    [personaId, updateRecord],
  )

  const completeSetup = useCallback(
    (interests: InterestId[]) => {
      updateRecord((prev) =>
        prev.account === null ? prev : { ...prev, account: { ...prev.account, interests, profileCompleted: true } },
      )
    },
    [updateRecord],
  )

  const logout = useCallback(() => {
    updateRecord((prev) => ({ ...prev, signedIn: false }))
  }, [updateRecord])

  const value = useMemo<SessionContextValue>(
    () => ({
      status,
      currentUser: account,
      profileCompleted: account?.profileCompleted ?? false,
      login,
      signup,
      completeSetup,
      logout,
    }),
    [status, account, login, signup, completeSetup, logout],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
