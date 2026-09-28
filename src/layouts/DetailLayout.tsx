import { Outlet } from 'react-router'
import styles from './layout.module.css'

/**
 * 이야기 상세·연결 선택·프로필·오딧 패스.
 * TODO(3단계): AppHeader(Detail = 뒤로 + 저장·공유 / 뒤로 + 제목)를 붙이고, 연결 선택 화면에만 BottomNav를 표시한다.
 */
export function DetailLayout() {
  return (
    <div className={styles.root}>
      <div className={styles.scroll} data-scroll-container>
        <Outlet />
      </div>
    </div>
  )
}
