import type { CSSProperties } from 'react'
import posesUrl from '../../assets/mascot/mascot-poses.webp'
import styles from './Mascot.module.css'

/**
 * 마스코트(두더지 탐험가). Figma도 캐릭터 시트 한 장에서 포즈를 잘라 쓰고 있어서 같은 방식으로 자른다.
 * 값은 Figma mascot 레이어의 이미지 채우기(크기·위치 %)를 그대로 옮긴 것이다.
 * TODO: Figma에서 포즈별 WebP 2x를 따로 내보내면 이 컴포넌트 안에서만 교체하면 된다.
 */
const POSES = {
  /** 기본 (스플래시·환영·로그인 등) */
  default: { width: 978.34, height: 514.57, left: -105.71, top: -238.16, aspect: 150 / 190.127 },
  /** 음~? (온보딩 1) */
  question: { width: 978.34, height: 478.5, left: -239.05, top: -211.72, aspect: 118 / 160.841 },
} as const

export type MascotPose = keyof typeof POSES

interface MascotProps {
  pose?: MascotPose
  width: number
  className?: string
  style?: CSSProperties
}

/** 캐릭터는 장식이다. 역사 사실을 말하지 않고, 정보는 옆의 텍스트가 전한다 → 스크린리더에서 숨긴다. */
export function Mascot({ pose = 'default', width, className, style }: MascotProps) {
  const crop = POSES[pose]
  return (
    <span
      className={`${styles.mascot} ${className ?? ''}`}
      style={{ width, height: width / crop.aspect, ...style }}
      aria-hidden="true"
    >
      <img
        src={posesUrl}
        alt=""
        draggable={false}
        style={{
          width: `${crop.width}%`,
          height: `${crop.height}%`,
          left: `${crop.left}%`,
          top: `${crop.top}%`,
        }}
      />
    </span>
  )
}
