import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import nodeDotVisited from '../../assets/home/node-dot-visited.svg'
import { Mascot } from '../../components/brand/Mascot'
import { Button } from '../../components/common/Button'
import { ConnectionCard } from '../../components/story/ConnectionCard'
import { useUserData } from '../../hooks/useUserData'
import { paths } from '../../routes/paths'
import { storyService } from '../../services/storyService'
import { StoryNotFound } from './StoryNotFound'
import styles from './ConnectionSelectPage.module.css'

/**
 * /stories/:storyId/connections — 연결 선택 (Figma 04_connection_select).
 * 이 화면에 도착하면 이야기를 다 읽은 것으로 보고 역사 지도에 기록한다 (중복 기록 없음).
 * Figma의 'CHAR' 자리 표시는 마스코트로, 지도 썸네일의 임시 문구는 이 이야기 정보로 바꿨다 (구현요청서 부록).
 */
export function ConnectionSelectPage() {
  const { storyId = '' } = useParams()
  const navigate = useNavigate()
  const story = storyService.getStory(storyId)
  const { progress, dispatch } = useUserData()

  // 도착하기 전에 이미 기록돼 있었는지 — 기록한 뒤에도 문구가 바뀌지 않게 처음 값만 기억한다
  const [wasRecorded] = useState(() => progress.readStoryIds.includes(storyId))

  useEffect(() => {
    if (story) dispatch({ type: 'story/read', storyId: story.id, mapLabel: story.mapLabel })
  }, [story, dispatch])

  if (story === null) return <StoryNotFound />

  const yearTag = story.tags.find((tag) => /\d/.test(tag.label))?.label ?? story.era

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <h1 className="point-title-1l">{story.connectionIntro.title}</h1>
        <p className={`${styles.desc} body-small`}>{story.connectionIntro.description}</p>
      </header>

      <section className={styles.list} aria-labelledby="connections-title">
        <h2 id="connections-title" className={`${styles.listTitle} body-small-strong-1l`}>
          이어지는 이야기
        </h2>
        <ul>
          {story.connections.map((connection) => (
            <li key={connection.storyId}>
              <ConnectionCard
                to={paths.story(connection.storyId)}
                type={connection.type}
                title={connection.title}
                description={connection.description}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.record} aria-live="polite">
        <p className="body-strong-1l">{story.subject}의 이야기가 역사 지도에 기록됐어요!</p>
        <div className={styles.mapThumb} aria-hidden="true">
          <span className={styles.mapNode}>
            <img src={nodeDotVisited} alt="" width={36} height={36} />
          </span>
          <span className={`${styles.mapThumbLabel} ui-caption-1l`}>
            {yearTag} · {story.region} · {story.mapLabel}
          </span>
        </div>
        <p className={styles.recordNote}>
          <span className={styles.avatar} aria-hidden="true">
            <Mascot width={30} style={{ marginTop: 6 }} />
          </span>
          <span className="body-strong-1l">
            {wasRecorded ? '이미 지도에 있는 이야기예요.' : '새로운 역사 연결이 추가됐어요.'}
          </span>
        </p>
      </section>

      <div className={styles.exit}>
        <p className={`${styles.desc} body-small-1l`}>다음 이야기는 원하는 때 이어서 볼 수 있어요.</p>
        <Button size="lg" onClick={() => navigate(paths.explore)}>
          다른 이야기 보기
        </Button>
      </div>
    </div>
  )
}
