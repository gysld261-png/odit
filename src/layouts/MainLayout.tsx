import { Outlet } from 'react-router'
import styles from './layout.module.css'

/**
 * 홈·탐색·검색 결과·지도·배지·보관함. 스크롤 콘텐츠 + 떠 있는 캡슐형 BottomNav.
 * TODO(3단계): AppHeader(Main·Sub)와 BottomNav를 붙인다. 탭 아이콘은 Figma에서 SVG로 내보낸 뒤 연결한다.
 */
export function MainLayout() {
  return (
    <div className={styles.root}>
      <div className={`${styles.scroll} ${styles.withBottomNav}`} data-scroll-container>
        <Outlet />
      </div>
    </div>
  )
}
