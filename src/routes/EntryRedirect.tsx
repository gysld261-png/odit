import { Navigate } from 'react-router'
import { useDemo } from '../hooks/useDemo'
import { getStartPath, paths } from './paths'

/** `/` 최초 진입 분기. 퍼소나를 고른 적이 없으면 데모 가이드, 있으면 그 퍼소나의 현재 시작 화면. */
export function EntryRedirect() {
  const { record } = useDemo()
  return <Navigate to={record === null ? paths.demo : getStartPath(record)} replace />
}
