import heroBg from '../../assets/home/hero-bg.webp'
import { AppHeader } from '../../components/common/AppHeader'
import { SectionTitle } from '../../components/common/SectionTitle'
import { StoryCard } from '../../components/story/StoryCard'
import { RECOMMENDATION_LABEL, RECOMMENDED_PATHS } from '../../data/common/home'
import { useSession } from '../../hooks/useDemo'
import { useUserData } from '../../hooks/useUserData'
import { paths } from '../../routes/paths'
import { DebateSection } from './DebateSection'
import { FactSection } from './FactSection'
import { HeroProfile } from './HeroProfile'
import styles from './HomePage.module.css'
import { TrendSection } from './TrendSection'
import { WeeklyConnections } from './WeeklyConnections'

/**
 * /home (Figma HomeScreen · /home 신규 유저).
 * 신규·기존 홈을 파일로 나누지 않고 개인 기록으로 분기한다:
 * - 이번 주 역사 유형이 없으면 신규 히어로("첫 이야기, 어디서 시작할까요?")
 * - 발견한 연결이 없으면 빈 연결 지도
 * 추천·화제·논쟁·사실 같은 공개 콘텐츠는 누구에게나 같다.
 */
export function HomePage() {
  const { currentUser } = useSession()
  const { progress } = useUserData()
  const nickname = currentUser?.nickname ?? ''
  const isNewUser = progress.historyType === null

  return (
    <div className={styles.page}>
      <img className={styles.heroBg} src={heroBg} alt="" aria-hidden="true" />

      <div className={styles.hero}>
        <AppHeader type="main" />
        <HeroProfile nickname={nickname} interests={currentUser?.interests ?? []} progress={progress} />
      </div>

      <section className={styles.pathSection} aria-labelledby="home-path-title">
        <SectionTitle
          eyebrow={isNewUser ? '추천 탐색' : '맞춤 탐색'}
          title="어느 기록부터 확인할까요?"
          desc={RECOMMENDATION_LABEL}
        />
        <ul className={styles.pathList} id="home-path-title">
          {RECOMMENDED_PATHS.map((card) => (
            <li key={card.storyId}>
              <StoryCard
                to={paths.story(card.storyId)}
                eyebrow={card.eyebrow}
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            </li>
          ))}
        </ul>
      </section>

      <TrendSection />
      <DebateSection />
      <FactSection />
      <WeeklyConnections nickname={nickname} nodes={progress.weeklyNodes} />
    </div>
  )
}
