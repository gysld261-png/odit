import type { CSSProperties, ReactNode } from 'react'
import styles from './SpeechBubble.module.css'

interface SpeechBubbleProps {
  children: ReactNode
  /** 꼬리 방향: 마스코트가 있는 쪽 */
  tail: 'bottom' | 'left' | 'right'
  size?: 'md' | 'sm'
  className?: string
  style?: CSSProperties
}

/**
 * 마스코트 말풍선. 고정 UI 카피다(챗봇 아님).
 * 캐릭터 원칙: 질문·반응·안내만 하고 역사 사실을 1인칭으로 설명하지 않는다.
 */
export function SpeechBubble({ children, tail, size = 'md', className, style }: SpeechBubbleProps) {
  return (
    <span className={`${styles.wrap} ${className ?? ''}`} data-tail={tail} data-size={size} style={style}>
      <span className={styles.tail} aria-hidden="true" />
      <span className={styles.bubble}>{children}</span>
    </span>
  )
}
