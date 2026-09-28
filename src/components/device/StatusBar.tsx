import styles from './DeviceFrame.module.css'

/**
 * 목업용 iOS 상태바 (Figma `StatusBar` 402×62: 9:41 · 다이내믹 아일랜드 · 신호·와이파이·배터리).
 * 서비스의 AppHeader와 다른 장식 요소라 클릭·스크린리더 대상이 아니다.
 */
export function StatusBar() {
  return (
    <div className={`${styles.deco} ${styles.statusBar}`} aria-hidden="true">
      <span className={styles.time}>9:41</span>
      <span className={styles.island} />
      <span className={styles.systemIcons}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="7.5" width="3" height="4.5" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <path d="M8.5 2.4c2.4 0 4.6.9 6.2 2.5l1.2-1.2A10.2 10.2 0 0 0 8.5.7 10.2 10.2 0 0 0 1.1 3.7l1.2 1.2a8.6 8.6 0 0 1 6.2-2.5Zm0 3.4c1.4 0 2.8.6 3.8 1.5l1.2-1.2a7 7 0 0 0-10 0l1.2 1.2c1-.9 2.4-1.5 3.8-1.5Zm0 3.4c.6 0 1.2.2 1.6.6L8.5 11.4 6.9 9.8c.4-.4 1-.6 1.6-.6Z" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" stroke="currentColor" opacity="0.35" />
          <rect x="2" y="2" width="20" height="9" rx="2.5" fill="currentColor" />
          <path d="M25 4.5v4c.8-.3 1.5-1.1 1.5-2s-.7-1.7-1.5-2Z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  )
}
