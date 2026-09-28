import { useState } from 'react'
import { useLocation } from 'react-router'
import { paths } from '../../routes/paths'
import { DemoGuide } from './DemoGuide'
import styles from './MobileDemoToggle.module.css'

/**
 * 모바일 전용 접이식 DEMO 버튼. PC에서는 기기 바깥 패널이 같은 역할을 하므로 CSS로 숨긴다.
 * /demo 화면에서는 가이드가 이미 보이므로 버튼을 두지 않는다.
 */
export function MobileDemoToggle() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  if (pathname === paths.demo) return null

  return (
    <div className={styles.root}>
      {open && (
        <div className={styles.popover} role="dialog" aria-label="데모 가이드">
          <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="데모 가이드 닫기">
            ×
          </button>
          <DemoGuide variant="compact" onAction={() => setOpen(false)} />
        </div>
      )}
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        DEMO
      </button>
    </div>
  )
}
