import { Outlet } from 'react-router'
import styles from './layout.module.css'

/**
 * 스플래시 ~ 온보딩. 하단 내비가 없다.
 * 이 화면들은 Figma에서 배경 그라데이션이 상태바 뒤까지 이어지므로, 상단 여백은 레이아웃이 아니라
 * 각 화면의 AuthScreen이 안쪽 여백으로 준다. 진행 바·뒤로가기도 화면마다 달라서 각 페이지가 그린다.
 */
export function AuthLayout() {
  return (
    <div className={`${styles.root} ${styles.fullBleed}`}>
      <div className={`${styles.scroll} ${styles.noInsetBottom}`} data-scroll-container>
        <Outlet />
      </div>
    </div>
  )
}
