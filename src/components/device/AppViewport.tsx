import type { CSSProperties, ReactNode } from 'react'
import { APP_PORTAL_ROOT_ID } from '../../config/app'
import { SHOWCASE_CONFIG } from '../../config/showcase'
import styles from './AppViewport.module.css'
import type { DisplayMode } from './DeviceFrame'

interface AppViewportProps {
  mode: DisplayMode
  children: ReactNode
}

/**
 * 앱 화면의 경계. PC에서는 목업 스크린(402×874), 모바일에서는 실제 화면(100dvh)을 채운다.
 *
 * 앱 콘텐츠의 위·아래 여백은 CSS 변수로 넘긴다.
 * - PC: Figma의 StatusBar 62px / HomeIndicator 34px (목업이 그 자리를 그린다)
 * - 모바일: env(safe-area-inset-*) (실제 기기가 그 자리를 그린다)
 * 레이아웃은 --app-inset-top/bottom만 쓰면 되므로 여백이 두 번 적용되지 않는다.
 *
 * 모달·바텀시트·토스트는 portal 영역(스크롤 콘텐츠 바깥, 이 경계 안)에 띄운다.
 * 그래야 어두운 배경이 PC 배경 전체가 아니라 기기 화면만 덮는다.
 */
export function AppViewport({ mode, children }: AppViewportProps) {
  const { device, mobileMaxAppWidth } = SHOWCASE_CONFIG
  const vars = {
    '--device-inset-top': `${device.statusBarHeight}px`,
    '--device-inset-bottom': `${device.homeIndicatorHeight}px`,
    '--mobile-max-app-width': `${mobileMaxAppWidth}px`,
  } as CSSProperties

  return (
    <div className={styles.viewport} data-mode={mode} style={vars}>
      {children}
      <div id={APP_PORTAL_ROOT_ID} className={styles.portal} />
    </div>
  )
}
