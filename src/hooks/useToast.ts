import { useContext } from 'react'
import { ToastContext } from '../state/contexts'

/** 자주 쓰는 안내 문구 */
export const TOAST_TEXT = {
  preparing: '준비 중인 기능이에요.',
  emailOnly: '데모에서는 이메일 가입만 지원해요.',
} as const

export function useToast() {
  const value = useContext(ToastContext)
  if (value === null) throw new Error('useToast는 ToastProvider 안에서만 쓸 수 있어요.')
  return value
}
