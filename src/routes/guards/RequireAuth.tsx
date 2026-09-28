import { Navigate, Outlet, useLocation } from 'react-router'
import { useDemo, useSession } from '../../hooks/useDemo'
import { paths, type ReturnState } from '../paths'

/**
 * 로그인 + 초기 설정 완료 사용자만 들어온다 (홈·탐색·검색·상세·지도·배지·보관함·프로필·패스).
 * 막힐 때는 원래 목적지(from)를 넘겨서, 퍼소나 선택·로그인 뒤 그 화면으로 돌아오게 한다.
 * 프론트에서 막는 것은 화면 흐름용이지 보안이 아니다. 백엔드가 생기면 서버에서도 검증해야 한다.
 */
export function RequireAuth() {
  const { personaId } = useDemo()
  const { status, profileCompleted } = useSession()
  const location = useLocation()
  const from: ReturnState = { from: location.pathname + location.search }

  if (status === 'restoring') return null
  if (personaId === null) return <Navigate to={paths.demo} replace state={from} />
  if (status !== 'authenticated') return <Navigate to={paths.welcome} replace state={from} />
  if (!profileCompleted) return <Navigate to={paths.onboarding(1)} replace />
  return <Outlet />
}
