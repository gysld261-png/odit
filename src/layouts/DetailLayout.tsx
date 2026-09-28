import { useRef } from 'react'
import { Outlet, useMatch, useParams } from 'react-router'
import { AppHeader } from '../components/common/AppHeader'
import { BottomNav } from '../components/common/BottomNav'
import { useScrollRestore } from '../hooks/useScrollRestore'
import { useToast } from '../hooks/useToast'
import { useUserData } from '../hooks/useUserData'
import { paths } from '../routes/paths'
import { storyService } from '../services/storyService'
import styles from './layout.module.css'

/**
 * 이야기 상세·연결 선택·프로필·오딧 패스.
 * 이야기 화면: 뒤로 + 저장·공유 헤더를 스크롤 영역 밖에 고정한다 [제안: 긴 글에서 뒤로·저장을 늘 누를 수 있게].
 * 연결 선택 화면만 하단 내비를 보여준다 (Figma 04_connection_select).
 * TODO(4단계): 프로필·패스는 뒤로 + 제목 헤더.
 */
export function DetailLayout() {
  const scrollRef = useRef<HTMLDivElement>(null)
  useScrollRestore(scrollRef)
  const { storyId } = useParams()
  const isConnections = useMatch('/stories/:storyId/connections') !== null
  const story = storyId ? storyService.getStory(storyId) : null
  const { progress, dispatch } = useUserData()
  const { showToast } = useToast()

  const saved = story !== null && progress.savedStoryIds.includes(story.id)

  const toggleSave = () => {
    if (story === null) return
    dispatch({ type: 'story/toggleSave', storyId: story.id })
    showToast(saved ? '저장을 취소했어요.' : '보관함에 저장했어요.')
  }

  // [제안] 공유 = 이 이야기 주소 복사
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      showToast('링크를 복사했어요.')
    } catch {
      showToast('링크를 복사하지 못했어요. 주소창의 주소를 복사해 주세요.')
    }
  }

  return (
    <div className={`${styles.root} ${styles.detailRoot}`}>
      {storyId !== undefined && (
        <AppHeader
          type="detail"
          backFallback={paths.explore}
          saved={saved}
          onSave={story ? toggleSave : undefined}
          onShare={story ? share : undefined}
        />
      )}
      <div
        ref={scrollRef}
        className={`${styles.scroll} ${isConnections ? styles.withBottomNav : ''}`}
        data-scroll-container
      >
        <Outlet />
      </div>
      {isConnections && (
        <div className={styles.bottomNav}>
          <BottomNav />
        </div>
      )}
    </div>
  )
}
