import type { CSSProperties, ReactNode } from 'react'
import styles from './AuthScreen.module.css'

interface AuthScreenProps {
  /** 위쪽 콘텐츠 */
  children: ReactNode
  /** 화면 하단에 붙는 주요 버튼 영역 */
  footer?: ReactNode
  /** Yellow 100 → Canvas 그라데이션이 끝나는 위치 (Figma 화면마다 35~60%) */
  gradientStop?: string
  /** 온보딩은 버튼이 홈 인디케이터에 더 가깝다 (Figma: 아래 여백 16 vs 로그인 계열 22) */
  footerSpacing?: 'default' | 'tight'
  className?: string
}

/**
 * 스플래시~온보딩 화면의 공통 틀.
 * Figma는 402×874에 절대 좌표로 그려져 있지만, 기기 높이가 달라도 버튼이 화면 아래에 붙도록
 * 위 콘텐츠 + 아래 footer의 세로 흐름으로 옮겼다. 키 작은 화면에서는 전체가 스크롤된다.
 */
export function AuthScreen({ children, footer, gradientStop = '40%', footerSpacing = 'default', className }: AuthScreenProps) {
  return (
    <div className={`${styles.screen} ${className ?? ''}`} style={{ '--gradient-stop': gradientStop } as CSSProperties}>
      <div className={styles.body}>{children}</div>
      {footer && (
        <div className={styles.footer} data-spacing={footerSpacing}>
          {footer}
        </div>
      )}
    </div>
  )
}
