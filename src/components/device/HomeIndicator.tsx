import styles from './DeviceFrame.module.css'

/** 목업용 홈 인디케이터 (Figma `HomeIndicator` 34px). 서비스의 BottomNav와 다른 장식 요소다. */
export function HomeIndicator() {
  return (
    <div className={`${styles.deco} ${styles.homeIndicator}`} aria-hidden="true">
      <span className={styles.homeBar} />
    </div>
  )
}
