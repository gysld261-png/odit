import { NavLink } from 'react-router'
import activeHalo from '../../assets/nav/active-halo.svg'
import activeIndicator from '../../assets/nav/active-indicator.svg'
import exploreActive from '../../assets/nav/explore-active.svg'
import explore from '../../assets/nav/explore.svg'
import homeActive from '../../assets/nav/home-active.svg'
import home from '../../assets/nav/home.svg'
import libraryActive from '../../assets/nav/library-active.svg'
import library from '../../assets/nav/library.svg'
import liquidBridge from '../../assets/nav/liquid-bridge.svg'
import mapActive from '../../assets/nav/map-active.svg'
import map from '../../assets/nav/map.svg'
import { paths } from '../../routes/paths'
import styles from './BottomNav.module.css'

/** 탭 이름 "오딧맵"은 2026-09-28 결정 (라우트는 /map 그대로) */
const TABS = [
  { to: paths.home, label: '홈', icon: home, activeIcon: homeActive },
  { to: paths.explore, label: '탐색', icon: explore, activeIcon: exploreActive },
  { to: paths.map, label: '오딧맵', icon: map, activeIcon: mapActive },
  { to: paths.library, label: '보관함', icon: library, activeIcon: libraryActive },
]

/**
 * ODIT/BottomNav — 떠 있는 캡슐형 하단 탭.
 * 활성 탭은 URL로 판단한다. NavLink는 하위 경로도 활성으로 보므로 /map/badges에서는 오딧맵 탭이 켜진다
 * (Figma 배지 화면이 '보관함' 활성으로 잘못돼 있던 것을 코드에서 바로잡음).
 */
export function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="주요 메뉴">
      <span className={styles.surface} aria-hidden="true" />
      <ul className={styles.tabs}>
        {TABS.map((tab) => (
          <li key={tab.to}>
            <NavLink to={tab.to} className={styles.tab}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className={styles.activeDeco} aria-hidden="true">
                      <img className={styles.bridge} src={liquidBridge} alt="" width={68} height={40} />
                      <img className={styles.halo} src={activeHalo} alt="" width={58} height={58} />
                      <img className={styles.indicator} src={activeIndicator} alt="" width={48} height={48} />
                    </span>
                  )}
                  <img className={styles.icon} src={isActive ? tab.activeIcon : tab.icon} alt="" width={24} height={24} />
                  <span className={`${styles.label} ${isActive ? 'ui-nav-active-1l' : 'ui-nav-1l'}`}>{tab.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
