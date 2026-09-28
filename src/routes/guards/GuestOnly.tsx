import { Navigate, Outlet, useLocation } from 'react-router'
import { useDemo, useSession } from '../../hooks/useDemo'
import { paths, readReturnPath } from '../paths'

/**
 * 비로그인 전용 (환영·로그인 방식·로그인·가입).
 * 이미 로그인했다면 설정 완료 여부에 따라 홈 또는 온보딩으로 보낸다.
 * 가입·로그인 결과를 기록할 퍼소나가 있어야 하므로 퍼소나가 없으면 데모 가이드로 보낸다.
 */
export function GuestOnly() {
  const { personaId } = useDemo()
  const { status, profileCompleted } = useSession()
  const location = useLocation()

  if (status === 'restoring') return null
  if (personaId === null) return <Navigate to={paths.demo} replace />
  if (status === 'authenticated') {
    const target = profileCompleted ? (readReturnPath(location.state) ?? paths.home) : paths.onboarding(1)
    return <Navigate to={target} replace />
  }
  return <Outlet />
}
