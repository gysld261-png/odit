import { Link } from 'react-router'
import chevronCircle from '../../assets/icons/chevron-circle.svg'
import chevronSmall from '../../assets/icons/chevron-small.svg'
import searchIcon from '../../assets/icons/search.svg'
import { getInterestLabel } from '../../data/common/interests'
import { paths } from '../../routes/paths'
import type { InterestId, PersonaProgress } from '../../types/demo'
import styles from './HomePage.module.css'

interface HeroProfileProps {
  nickname: string
  interests: InterestId[]
  progress: PersonaProgress
}

/** 홈 히어로 — 기존 사용자는 이번 주 역사 유형, 신규 사용자는 첫 이야기 안내 */
export function HeroProfile({ nickname, interests, progress }: HeroProfileProps) {
  if (progress.historyType === null) {
    return (
      <div className={styles.profile}>
        <div className={styles.newUser}>
          <p className={`${styles.newEyebrow} ui-meta-1l`}>
            <strong>{nickname}</strong>님, 반가워요
          </p>
          <h1 className={`${styles.heroTitle} point-26-1l`}>
            첫 이야기,
            <br />
            어디서 시작할까요?
          </h1>
          <p className={`${styles.newDesc} body-small`}>{describeInterests(interests)}</p>
          <Link to={paths.explore} className={`${styles.searchEntry} ui-meta-1l`}>
            <img src={searchIcon} alt="" width={15.8} height={15.8} />
            궁금한 게 있다면 바로 찾아보기
            <img src={chevronSmall} alt="" width={5.6} height={9.6} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.profile}>
      <div className={styles.existing}>
        <div className={styles.existingHead}>
          <p className="ui-meta-1l">
            이번 주 <strong>{nickname}</strong>님의 역사 유형
          </p>
          <h1 className={`${styles.heroTitle} point-26-1l`}>{progress.historyType}</h1>
        </div>
        <div className={styles.existingInfo}>
          <p className="body-base">
            서로 멀어 보이던 사건 사이에서
            <br />
            <span className={styles.count}>{progress.weeklyConnectionCount}개</span>의 연결고리를 발견했어요!
          </p>
          {/* [제안] 역사 유형 = 오딧 패스의 월간 탐색 리포트 티저 → 패스 소개로 */}
          <Link to={paths.pass} className={`${styles.profileCta} body-small-1l`}>
            확인하러 가기
            <img src={chevronCircle} alt="" width={18} height={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}

/** "고른 관심사 ‘사람들의 일상’, ‘왕과 권력’ 이야기부터 골라봤어요" — 마지막 관심사 앞에서 줄바꿈 */
function describeInterests(interests: InterestId[]) {
  if (interests.length === 0) return '관심 있는 이야기부터 골라봤어요'
  const labels = interests.map((id) => `‘${getInterestLabel(id)}’`)
  const head = labels.slice(0, -1)
  const last = labels[labels.length - 1]
  return (
    <>
      고른 관심사 {head.length > 0 ? `${head.join(', ')},` : last}
      <br />
      {head.length > 0 ? `${last} 이야기부터 골라봤어요` : '이야기부터 골라봤어요'}
    </>
  )
}
