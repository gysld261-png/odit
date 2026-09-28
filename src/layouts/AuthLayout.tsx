import { Outlet } from 'react-router'
import styles from './layout.module.css'

/**
 * 스플래시 ~ 온보딩. 하단 내비가 없다.
 * 온보딩 진행 바·뒤로가기는 화면마다 Figma가 달라서 각 페이지가 그린다.
 */
export function AuthLayout() {
  return (
    <div className={styles.root}>
      <div className={styles.scroll} data-scroll-container>
        <Outlet />
      </div>
    </div>
  )
}
