import { useNavigate } from 'react-router'
import connectionPath from '../../assets/brand/auth-connection-path.svg'
import groundShadow from '../../assets/brand/auth-ground-shadow.svg'
import mapNode from '../../assets/brand/map-node.svg'
import appleIcon from '../../assets/icons/apple.svg'
import googleIcon from '../../assets/icons/google.svg'
import kakaoIcon from '../../assets/icons/kakao.svg'
import mailIcon from '../../assets/icons/mail.svg'
import { Mascot } from '../../components/brand/Mascot'
import { AuthScreen } from '../../components/common/AuthScreen'
import { BackButton } from '../../components/common/BackButton'
import { SpeechBubble } from '../../components/common/SpeechBubble'
import { TOAST_TEXT, useToast } from '../../hooks/useToast'
import { paths } from '../../routes/paths'
import styles from './AuthMethodPage.module.css'

/** 카드 속 연결선 위 노드 (hero_card 기준 좌표) */
const NODES: Array<[number, number]> = [
  [13, 193],
  [183, 163],
  [333, 103],
]

/**
 * /auth — 로그인 방식 선택 (Figma 02_auth_method).
 * 데모에는 소셜 로그인 백엔드가 없어서 카카오·Apple·Google은 안내 토스트만 띄운다 (2026-09-28 결정).
 */
export function AuthMethodPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const socialNotice = () => showToast(TOAST_TEXT.emailOnly)

  return (
    <AuthScreen
      gradientStop="45%"
      footer={<p className={`${styles.terms} ui-caption-1l`}>계속하면 이용약관과 개인정보 처리방침에 동의하게 돼요.</p>}
    >
      <BackButton fallback={paths.welcome} />
      <div className={styles.head}>
        <h1 className="point-screen-1l">오딧을 시작해볼까요?</h1>
        <p className={`${styles.desc} body-base`}>
          로그인하면 읽은 이야기와 역사 지도를
          <br />
          안전하게 저장할 수 있어요.
        </p>
      </div>

      <div className={styles.hero} aria-hidden="true">
        <img className={styles.path} src={connectionPath} alt="" width={323} height={93} />
        {NODES.map(([x, y]) => (
          <img key={`${x}-${y}`} className={styles.node} src={mapNode} alt="" width={14} height={14} style={{ left: x, top: y }} />
        ))}
        <img className={styles.shadow} src={groundShadow} alt="" width={132} height={30} />
        <Mascot width={132} className={styles.mascot} />
        <SpeechBubble tail="bottom" className={styles.bubble}>
          읽은 이야기는
          <br />
          지도에 차곡차곡 쌓여요
        </SpeechBubble>
      </div>

      <div className={styles.methods}>
        <button type="button" className={styles.method} data-brand="kakao" onClick={socialNotice}>
          <img src={kakaoIcon} alt="" width={22} height={22} />
          카카오로 계속하기
        </button>
        <button type="button" className={styles.method} data-brand="apple" onClick={socialNotice}>
          <img src={appleIcon} alt="" width={22} height={22} />
          Apple로 계속하기
        </button>
        <button type="button" className={styles.method} data-brand="google" onClick={socialNotice}>
          <span className={styles.googleIcon}>
            <img src={googleIcon} alt="" width={17.6} height={17.6} />
          </span>
          Google로 계속하기
        </button>
        <button type="button" className={styles.method} data-brand="email" onClick={() => navigate(paths.signup)}>
          <img src={mailIcon} alt="" width={19.8} height={13.8} />
          이메일로 계속하기
        </button>
      </div>
    </AuthScreen>
  )
}
