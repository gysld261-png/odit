import { useToast } from '../../hooks/useToast'
import styles from './ToastHost.module.css'

/** AppViewport 안에서 토스트를 그린다. 스크린리더에는 status로 읽힌다. */
export function ToastHost() {
  const { toasts } = useToast()
  return (
    <div className={styles.host} role="status" aria-live="polite">
      {toasts.map((toast) => (
        <p key={toast.id} className={`${styles.toast} body-small-strong-1l`}>
          {toast.text}
        </p>
      ))}
    </div>
  )
}
