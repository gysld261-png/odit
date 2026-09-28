import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ToastContext, type ToastMessage } from './contexts'

const TOAST_DURATION_MS = 2400

/**
 * 토스트 목록 상태. 실제로 그리는 곳은 AppViewport 안의 ToastHost라서
 * PC에서도 브라우저 전체가 아니라 기기 화면 안에 뜬다.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const nextId = useRef(1)
  const timers = useRef(new Map<number, number>())

  const showToast = useCallback((text: string) => {
    const id = nextId.current++
    // 같은 문구를 연달아 누르면 하나만 남긴다
    setToasts((prev) => [...prev.filter((toast) => toast.text !== text), { id, text }])
    const timer = window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
      timers.current.delete(id)
    }, TOAST_DURATION_MS)
    timers.current.set(id, timer)
  }, [])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const value = useMemo(() => ({ toasts, showToast }), [toasts, showToast])
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
