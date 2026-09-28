import { Link } from 'react-router'
import styles from './ConnectionCard.module.css'

interface ConnectionCardProps {
  to: string
  type: string
  title: string
  description: string
}

/** 연결 선택 화면의 이어지는 이야기 (Figma ConnectionCard: 유형 배지 + 제목 + 설명) */
export function ConnectionCard({ to, type, title, description }: ConnectionCardProps) {
  return (
    <Link to={to} className={styles.card}>
      <span className={`${styles.type} ui-caption-1l`}>{type}</span>
      <span className={styles.content}>
        <strong className="title-card-1l">{title}</strong>
        <span className={`${styles.desc} body-small-1l`}>{description}</span>
      </span>
    </Link>
  )
}
