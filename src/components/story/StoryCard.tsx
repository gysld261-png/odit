import { Link } from 'react-router'
import styles from './StoryCard.module.css'

interface StoryCardProps {
  to: string
  eyebrow: string
  /** 줄바꿈은 \n으로 */
  title: string
  description: string
  icon: string
}

/**
 * ODIT/StoryCard Layout=Vertical — 홈 맞춤 탐색 카드 (175×228).
 * TODO(4단계): Layout=Horizontal (탐색 작품 목록)
 */
export function StoryCard({ to, eyebrow, title, description, icon }: StoryCardProps) {
  return (
    <Link to={to} className={styles.card}>
      <span className={styles.top}>
        <img src={icon} alt="" width={61} height={61} />
        <span className={`${styles.eyebrow} ui-label-1l`}>{eyebrow}</span>
      </span>
      <span className={styles.bottom}>
        <strong className={`${styles.title} body-strong`}>{title}</strong>
        <span className={`${styles.desc} ui-caption`}>{description}</span>
      </span>
    </Link>
  )
}
