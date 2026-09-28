import { useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import connectionPath from '../../assets/brand/welcome-connection-path.svg'
import glow from '../../assets/brand/glow.svg'
import groundShadow from '../../assets/brand/ground-shadow-welcome.svg'
import mapNode from '../../assets/brand/map-node.svg'
import { Mascot } from '../../components/brand/Mascot'
import { Wordmark } from '../../components/brand/Wordmark'
import { AuthScreen } from '../../components/common/AuthScreen'
import { Button } from '../../components/common/Button'
import { paths, wantsSplash } from '../../routes/paths'
import { Splash } from './Splash'
import styles from './WelcomePage.module.css'

/** 환영 화면에 떠 있는 질문 카드 (Figma 01_welcome question_card 3장) */
const QUESTION_CARDS = [
  { tag: '오늘과 닮은 역사', tone: 'yellow', lines: ['조선에도 퇴사가', '있었을까?'], x: 85.5, y: 60.96, rotate: -4 },
  { tag: '잘못 알려진 역사', tone: 'blue', lines: ['거북선은 정말', '철갑선이었을까?'], x: 278.68, y: 131.57, rotate: 4 },
  { tag: '뜻밖의 연결', tone: 'yellow', lines: ['왕도 사직서를', '반려했다고?'], x: 80.05, y: 298.19, rotate: 3 },
] as const

/** 연결선 위의 노드 (일러스트 영역 기준 좌표) */
const NODES: Array<[number, number]> = [
  [77, 103],
  [205, 135],
  [85, 245],
]

/**
 * /welcome — 스플래시(진입 애니메이션) → 환영.
 * 스플래시는 퍼소나 시작·처음부터 보기로 들어왔을 때만 보인다(location.state.showSplash).
 * 끝나면 같은 주소로 state만 지워서, 뒤로가기로 돌아와도 다시 재생되지 않게 한다.
 */
export function WelcomePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const showSplash = wantsSplash(location.state)

  const finishSplash = useCallback(() => {
    navigate(location.pathname, { replace: true, state: null })
  }, [navigate, location.pathname])

  if (showSplash) return <Splash onDone={finishSplash} />

  return (
    <AuthScreen
      gradientStop="55%"
      footer={
        <>
          <Button size="cta" onClick={() => navigate(paths.authMethod)}>
            시작하기
          </Button>
          <p className={`${styles.switch} body-small-1l`}>
            이미 계정이 있어요
            <Link to={paths.login} className="etc-14-bold-1l">
              로그인
            </Link>
          </p>
        </>
      }
    >
      <div className={styles.intro}>
        <Wordmark height={34} />
        <h1 className={`${styles.headline} point-hero`}>
          어디까지
          <br />
          알고 있어?
        </h1>
        <p className={`${styles.subcopy} body-base`}>
          일상 속 궁금증 하나로 시작해
          <br />
          나만의 역사 지도로 이어가요
        </p>
      </div>

      {/* 일러스트: 질문 카드 → 점선 연결 → 마스코트. 장식이므로 스크린리더에서는 숨긴다. */}
      <div className={styles.illustration} aria-hidden="true">
        <img className={styles.glow} src={glow} alt="" width={420} height={420} />
        <img className={styles.path} src={connectionPath} alt="" width={158.932} height={146.038} />
        <img className={styles.shadow} src={groundShadow} alt="" width={152} height={34.4} />
        <Mascot width={150} className={styles.mascot} />
        {QUESTION_CARDS.map((card) => (
          <div
            key={card.tag}
            className={styles.card}
            style={{ left: card.x, top: card.y, transform: `translate(-50%, -50%) rotate(${card.rotate}deg)` }}
          >
            <span className={`${styles.tag} ui-nav-1l`} data-tone={card.tone}>
              {card.tag}
            </span>
            <span className={styles.question}>
              {card.lines[0]}
              <br />
              {card.lines[1]}
            </span>
          </div>
        ))}
        {NODES.map(([x, y]) => (
          <img key={`${x}-${y}`} className={styles.node} src={mapNode} alt="" width={14} height={14} style={{ left: x, top: y }} />
        ))}
      </div>
    </AuthScreen>
  )
}
