import { Link, useParams } from 'react-router'
import zoomIcon from '../../assets/icons/zoom.svg'
import { SummaryAccordion } from '../../components/story/SummaryAccordion'
import { TermAccordion } from '../../components/story/TermAccordion'
import { paths } from '../../routes/paths'
import { formatStoryMeta, storyService } from '../../services/storyService'
import { StoryNotFound } from './StoryNotFound'
import styles from './StoryDetailPage.module.css'

/**
 * /stories/:storyId — 이야기 상세 (Figma 03_story_detail).
 * 이야기마다 파일을 만들지 않고 storyId로 조회한다. 없는 id는 이 화면 안의 빈 상태로 처리한다(404와 구분).
 * 끝의 '바로 이어서 보기'는 연결 선택 화면으로 간다 (구현요청서 7-3: 상세 → 이어서 보기 → 연결 선택).
 */
export function StoryDetailPage() {
  const { storyId = '' } = useParams()
  const story = storyService.getStory(storyId)

  if (story === null) return <StoryNotFound />

  // 다음 이야기 카드: 지정된 다음 이야기가 없으면 연결 선택 머리글을 대신 보여준다
  const nextCard = story.next ?? {
    title: story.connectionIntro.title,
    description: story.connectionIntro.description,
  }

  return (
    <article className={styles.page}>
      {story.heroImage && (
        <img className={styles.hero} src={story.heroImage.src} alt={story.heroImage.alt} />
      )}

      <div className={styles.content}>
        <header className={styles.head}>
          <ul className={styles.chips} aria-label="분류">
            {story.tags.map((tag) => (
              <li key={tag.label} className={`${styles.chip} ui-label-1l`} data-tone={tag.tone}>
                {tag.label}
              </li>
            ))}
          </ul>
          <div className={styles.titleGroup}>
            <h1 className={`${styles.title} point-hero-1l`}>{story.title}</h1>
            <p className={`${styles.meta} ui-meta-1l`}>{formatStoryMeta(story)}</p>
          </div>
        </header>

        <SummaryAccordion summary={story.summary} detail={story.summaryDetail} />

        {story.visual && (
          <figure className={styles.visual}>
            <div className={styles.visualImage}>
              <img src={story.visual.src} alt={story.visual.alt} />
              {/* TODO(4단계): 역사 자료 확대 보기. 지금은 자료임을 알려주는 표시만 둔다 */}
              <span className={styles.zoom} aria-hidden="true">
                <img src={zoomIcon} alt="" width={19} height={19} />
              </span>
            </div>
            <figcaption className={`${styles.caption} ui-caption`}>{story.visual.caption}</figcaption>
          </figure>
        )}

        <section className={styles.fact} aria-label="확인된 기록">
          <p className={`${styles.factLabel} ui-label-1l`}>확인된 기록</p>
          <p className="body-strong">{story.fact}</p>
        </section>

        <div className={styles.metaGroup}>
          {story.terms.length > 0 && (
            <div className={styles.terms}>
              {story.terms.map((term) => (
                <TermAccordion key={term.term} term={term.term} definition={term.definition} />
              ))}
            </div>
          )}
          <p className={`${styles.sources} ui-caption-1l`}>출처 · {story.sources.join(' · ')}</p>
        </div>

        <Link to={paths.storyConnections(story.id)} className={styles.next}>
          <span className={`${styles.nextLabel} ui-label-1l`}>{story.next ? '다음 이야기' : '이어지는 이야기'}</span>
          <strong className={`${styles.nextTitle} point-title`}>{nextCard.title}</strong>
          <span className={`${styles.nextDesc} ui-meta-1l`}>{nextCard.description}</span>
          <span className={`${styles.nextCta} body-small-strong-1l`}>
            바로 이어서 보기 <span aria-hidden="true">→</span>
          </span>
        </Link>
      </div>
    </article>
  )
}
