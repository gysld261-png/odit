import type { ReactNode } from 'react'
import statusDot from '../../assets/icons/status-dot.svg'
import styles from './SectionTitle.module.css'

interface SectionTitleProps {
  /** 제목 위 작은 머리말 (예: "맞춤 탐색", "지우님의 탐색 기록") */
  eyebrow?: ReactNode
  title: string
  /** 노란 점 + 보조 설명 한 줄 (Desc=Yes) */
  desc?: string
}

/** ODIT/SectionTitle — 제목(Pretendard 20 Bold) + 보조 설명 한 줄(점 + 메타) */
export function SectionTitle({ eyebrow, title, desc }: SectionTitleProps) {
  return (
    <div className={styles.wrap}>
      {eyebrow && <p className={`${styles.eyebrow} ui-meta-1l`}>{eyebrow}</p>}
      <div className={styles.titleGroup}>
        <h2 className="title-section-1l">{title}</h2>
        {desc && (
          <p className={`${styles.desc} ui-meta-1l`}>
            <img src={statusDot} alt="" width={8} height={8} />
            {desc}
          </p>
        )}
      </div>
    </div>
  )
}
