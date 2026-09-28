import { Navigate, Outlet } from 'react-router'
import { useDemo, useSession } from '../../hooks/useDemo'
import { paths } from '../paths'

/** 온보딩(관심사 설정)은 가입했지만 아직 설정을 마치지 않은 사용자만 들어온다. */
export function RequireSetup() {
  const { personaId } = useDemo()
  const { status, profileCompleted } = useSession()

  if (status === 'restoring') return null
  if (personaId === null) return <Navigate to={paths.demo} replace />
  if (status !== 'authenticated') return <Navigate to={paths.welcome} replace />
  if (profileCompleted) return <Navigate to={paths.home} replace />
  return <Outlet />
}
