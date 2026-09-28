import { useNavigate } from 'react-router'
import { Mascot } from '../../components/brand/Mascot'
import { Button } from '../../components/common/Button'
import { paths } from '../../routes/paths'
import styles from './StoryDetailPage.module.css'

/** 없는 이야기 id (예: /stories/abc). 잘못된 URL(404)과 구분해서 이야기 화면 안에서 안내한다. */
export function StoryNotFound() {
  const navigate = useNavigate()
  return (
    <div className={styles.notFound}>
      <Mascot pose="question" width={96} />
      <h1 className="title-card">삭제됐거나 존재하지 않는 이야기예요</h1>
      <p className={`${styles.meta} body-small`}>주소를 다시 확인하거나 다른 이야기를 찾아보세요.</p>
      <Button size="lg" onClick={() => navigate(paths.explore)} className={styles.notFoundButton}>
        다른 이야기 찾아보기
      </Button>
    </div>
  )
}
