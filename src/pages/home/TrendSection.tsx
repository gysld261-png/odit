import { Link } from 'react-router'
import { TRENDS } from '../../data/common/home'
import { paths } from '../../routes/paths'
import styles from './HomePage.module.css'

/** 지금 화제에서 발견한 역사 — 구현요청서가 허용한 '의도된 가로 스크롤' 영역 */
export function TrendSection() {
  return (
    <section className={styles.trendSection} aria-label="지금 화제에서 발견한 역사">
      <ul className={styles.trendList}>
        {TRENDS.map((trend) => (
          <li key={trend.storyId}>
            <Link to={paths.story(trend.storyId)} className={styles.trendCard}>
              <img className={styles.trendBg} src={trend.image} alt="" />
              <span className={styles.trendText}>
                <span className="ui-meta-1l">지금 화제에서 발견한 역사</span>
                <strong className="title-card">{trend.title}</strong>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
