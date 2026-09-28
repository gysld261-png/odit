import { Link } from 'react-router'
import { paths } from '../../routes/paths'
import styles from './NotFoundPage.module.css'

/**
 * 없는 URL. (없는 이야기 ID는 이 화면이 아니라 StoryDetailPage 안의 빈 상태로 따로 처리한다.)
 * 홈으로 보낼 때는 `/`를 거쳐 퍼소나·로그인 상태에 맞는 시작 화면으로 간다.
 */
export function NotFoundPage() {
  return (
    <main className={styles.page}>
      <p className={`${styles.code} point-hero-1l`}>404</p>
      <h1 className="title-section">페이지를 찾을 수 없어요</h1>
      <p className={`${styles.desc} body-small`}>주소가 바뀌었거나 없는 페이지예요.</p>
      <Link to={paths.root} className={`${styles.home} body-strong-1l`}>
        홈으로
      </Link>
    </main>
  )
}
