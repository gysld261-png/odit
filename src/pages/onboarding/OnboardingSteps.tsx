import groundShadow from '../../assets/brand/onboarding-ground-shadow.svg'
import mapPathNext from '../../assets/brand/onboarding-map-path-next.svg'
import mapPath from '../../assets/brand/onboarding-map-path.svg'
import checkSmall from '../../assets/icons/check-small.svg'
import checkboxOff from '../../assets/icons/checkbox-off-24.svg'
import checkboxOn from '../../assets/icons/checkbox-on-24.svg'
import { Mascot } from '../../components/brand/Mascot'
import { SpeechBubble } from '../../components/common/SpeechBubble'
import { INTERESTS, MAX_INTERESTS } from '../../data/common/interests'
import type { InterestId } from '../../types/demo'
import styles from './OnboardingPage.module.css'

/** 온보딩 1 — 이야기 소개 (Figma 05_onboarding_discover). 카드는 예시 일러스트다. */
const SAMPLE_STORIES = [
  { tag: '오늘과 닮은 역사', tone: 'yellow', lines: ['조선에도 퇴사', '통보가 있었을까요?'], meta: '조선 · 관료 제도 · 3분', x: 153.26, y: 75.97, rotate: -5 },
  { tag: '뜻밖의 연결', tone: 'blue', lines: ['옛날 사람들은', '어떻게 연애했을까요?'], meta: '조선 · 생활문화 · 4분', x: 253.14, y: 234.57, rotate: 4 },
] as const

export function StepDiscover() {
  return (
    <>
      <h1 className={`${styles.title} point-hero`}>
        지루한 역사,
        <br />
        궁금한 이야기부터
        <br />
        가볍게 시작해요
      </h1>
      <p className={`${styles.desc} body-base-1l`}>외울 필요 없어요. 궁금한 것부터 읽으면 돼요.</p>

      <div className={styles.discoverArt} aria-hidden="true">
        {SAMPLE_STORIES.map((story) => (
          <div
            key={story.tag}
            className={styles.sampleCard}
            style={{ left: story.x, top: story.y, transform: `translate(-50%, -50%) rotate(${story.rotate}deg)` }}
          >
            <span className={`${styles.tag} ui-nav-1l`} data-tone={story.tone}>
              {story.tag}
            </span>
            <span className={styles.sampleTitle}>
              {story.lines[0]}
              <br />
              {story.lines[1]}
            </span>
            <span className={`${styles.sampleMeta} ui-caption-1l`}>{story.meta}</span>
          </div>
        ))}
        <img className={styles.discoverShadow} src={groundShadow} alt="" width={122} height={28} />
        <Mascot pose="question" width={118} className={styles.discoverMascot} />
        <SpeechBubble tail="left" className={styles.discoverBubble}>
          이런 거, 궁금하지 않았어?
        </SpeechBubble>
      </div>
    </>
  )
}

/** 온보딩 2 — 역사 지도 소개 (Figma 06_onboarding_map). 지도 카드는 예시 일러스트다. */
export function StepMap() {
  return (
    <>
      <h1 className={`${styles.title} point-hero`}>
        읽은 이야기가
        <br />
        나만의 지도로 이어져요
      </h1>
      <p className={`${styles.desc} ${styles.descMultiline} body-base`}>
        시대와 나라가 달라도, 이야기가 연결되면
        <br />
        새로운 길이 생겨요.
      </p>

      <div className={styles.mapPanel} aria-hidden="true">
        <img className={styles.mapPath} src={mapPath} alt="" width={133} height={83} />
        <img className={styles.mapPathNext} src={mapPathNext} alt="" width={123} height={77} />

        <div className={styles.mapNode} data-state="read" style={{ left: 20, top: 28 }}>
          <span className="ui-caption-1l">조선 · 1776</span>
          <strong>정조의 개혁</strong>
          <span className={`${styles.tag} ${styles.withIcon} ui-nav-1l`} data-tone="yellow">
            <img src={checkSmall} alt="" width={9.8} height={7.8} />
            읽었어요
          </span>
        </div>
        <div className={styles.mapNode} data-state="current" style={{ left: 150, top: 170 }}>
          <span className="ui-caption-1l">프랑스 · 1789</span>
          <strong>프랑스혁명</strong>
          <span className={`${styles.tag} ui-nav-1l`} data-tone="strong">
            지금 읽는 중
          </span>
        </div>
        <div className={styles.mapNode} data-state="next" style={{ left: 32, top: 318 }}>
          <span className="ui-caption-1l">프랑스 · 1789</span>
          <strong>인권 선언</strong>
          <span className={`${styles.tag} ui-nav-1l`} data-tone="blue">
            다음 이야기
          </span>
        </div>

        <span className={`${styles.mapLabel} ui-nav-1l`} style={{ left: 136.5, top: 141.5 }}>
          같은 시대
        </span>
        <span className={`${styles.mapLabel} ui-nav-1l`} style={{ left: 169, top: 291.5 }}>
          이어진 사건
        </span>
        <Mascot width={92} className={styles.mapMascot} />
      </div>
    </>
  )
}

interface StepInterestsProps {
  selected: InterestId[]
  onToggle: (id: InterestId) => void
}

/** 온보딩 3 — 관심사 선택 (Figma 07_onboarding_interest). 최대 3개, 0개면 시작하기 비활성. */
export function StepInterests({ selected, onToggle }: StepInterestsProps) {
  return (
    <>
      <h1 className={`${styles.title} point-hero`}>
        어떤 이야기가
        <br />
        제일 궁금하세요?
      </h1>
      <div className={styles.interestHead}>
        <p className={`${styles.descInline} body-base-1l`}>최대 {MAX_INTERESTS}개까지 고를 수 있어요.</p>
        <span className={`${styles.counter} ui-nav-1l`} aria-live="polite">
          {selected.length} / {MAX_INTERESTS}
        </span>
      </div>

      <ul className={styles.interests}>
        {INTERESTS.map((interest) => {
          const isOn = selected.includes(interest.id)
          return (
            <li key={interest.id}>
              <button
                type="button"
                className={styles.interest}
                data-selected={isOn}
                aria-pressed={isOn}
                onClick={() => onToggle(interest.id)}
              >
                <span className={styles.interestIcon} aria-hidden="true">
                  <img
                    src={interest.icon}
                    alt=""
                    style={{
                      width: `${interest.iconCrop.size}%`,
                      height: `${interest.iconCrop.size}%`,
                      left: `${interest.iconCrop.left}%`,
                      top: `${interest.iconCrop.top}%`,
                    }}
                  />
                </span>
                <img className={styles.interestCheck} src={isOn ? checkboxOn : checkboxOff} alt="" width={24} height={24} />
                <span className={`${styles.interestLabel} body-strong-1l`}>{interest.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
