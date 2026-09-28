import { useContext } from 'react'
import { DemoContext, SessionContext } from '../state/contexts'

export function useDemo() {
  const value = useContext(DemoContext)
  if (value === null) throw new Error('useDemo는 DemoProvider 안에서만 쓸 수 있어요.')
  return value
}

export function useSession() {
  const value = useContext(SessionContext)
  if (value === null) throw new Error('useSession은 SessionProvider 안에서만 쓸 수 있어요.')
  return value
}
