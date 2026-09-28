import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * cta = 화면 하단 주요 행동 (온보딩 v2 btn_primary: 56px · 모서리 16 · Shadow/Float)
   * lg  = ODIT/Button Size=Large (51px · 모서리 12 · 테두리)
   * sm  = ODIT/Button Size=Small (카드 안 보조 행동, 흰 pill)
   */
  size?: 'cta' | 'lg' | 'sm'
}

/** ODIT/Button. disabled면 Figma State=Disabled(Surface Soft + Muted 글자)로 보인다. */
export function Button({ size = 'cta', type = 'button', className, ...rest }: ButtonProps) {
  return <button type={type} className={`${styles.button} ${className ?? ''}`} data-size={size} {...rest} />
}
