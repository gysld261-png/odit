import type { CSSProperties, ReactNode } from 'react'
import { SHOWCASE_CONFIG } from '../../config/showcase'
import styles from './DeviceFrame.module.css'
import { HomeIndicator } from './HomeIndicator'
import { StatusBar } from './StatusBar'

export type DisplayMode = 'desktop' | 'mobile'

interface DeviceFrameProps {
  mode: DisplayMode
  children: ReactNode
}

/**
 * iPhone 16 Pro 목업. PC에서만 외곽 프레임·상태바·홈 인디케이터를 그린다.
 * 모바일에서는 같은 요소를 `display: contents`로 투명하게 만들어 children(AppViewport)만 남긴다.
 * → 모드가 바뀌어도 children이 다시 마운트되지 않아 현재 화면·입력값이 유지된다.
 */
export function DeviceFrame({ mode, children }: DeviceFrameProps) {
  const { device } = SHOWCASE_CONFIG
  const vars = {
    '--device-screen-w': `${device.screenWidth}px`,
    '--device-screen-h': `${device.screenHeight}px`,
    '--device-bezel': `${device.bezel}px`,
    '--device-screen-radius': `${device.screenRadius}px`,
    '--device-frame-color': device.frameColor,
    '--device-status-h': `${device.statusBarHeight}px`,
    '--device-home-h': `${device.homeIndicatorHeight}px`,
  } as CSSProperties

  return (
    <div className={styles.frame} data-mode={mode} style={vars}>
      <span className={`${styles.deco} ${styles.buttons}`} aria-hidden="true">
        <span className={styles.actionButton} />
        <span className={styles.volumeUp} />
        <span className={styles.volumeDown} />
        <span className={styles.powerButton} />
        <span className={styles.cameraControl} />
      </span>
      <div className={styles.screen}>
        {children}
        <StatusBar />
        <HomeIndicator />
      </div>
    </div>
  )
}
