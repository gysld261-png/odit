import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import appleIcon from '../../assets/icons/apple.svg'
import googleIcon from '../../assets/icons/google.svg'
import kakaoIcon from '../../assets/icons/kakao.svg'
import circleApple from '../../assets/icons/social-circle-apple.svg'
import circleGoogle from '../../assets/icons/social-circle-google.svg'
import circleKakao from '../../assets/icons/social-circle-kakao.svg'
import { PERSONAS } from '../../data/personas'
import { Mascot } from '../../components/brand/Mascot'
import { AuthScreen } from '../../components/common/AuthScreen'
import { BackButton } from '../../components/common/BackButton'
import { Button } from '../../components/common/Button'
import { SpeechBubble } from '../../components/common/SpeechBubble'
import { TextField } from '../../components/common/TextField'
import { useDemo, useSession } from '../../hooks/useDemo'
import { TOAST_TEXT, useToast } from '../../hooks/useToast'
import { paths, readReturnPath } from '../../routes/paths'
import { isEmail } from '../../utils/validators'
import styles from './LoginPage.module.css'

const SOCIALS = [
  { brand: 'kakao', label: '카카오로 로그인', circle: circleKakao, icon: kakaoIcon },
  { brand: 'apple', label: 'Apple로 로그인', circle: circleApple, icon: appleIcon },
  { brand: 'google', label: 'Google로 로그인', circle: circleGoogle, icon: googleIcon },
] as const

/**
 * /login — 이메일 로그인 (Figma 03_login). 데모 로그인이다.
 * 이메일이 이 퍼소나로 가입된 계정인지만 확인하고, 비밀번호는 입력 여부만 본다(저장·비교하지 않음).
 * 발표 편의를 위해 퍼소나의 데모 이메일을 미리 채워 둔다 (지우: jiwoo@odit.app).
 */
export function LoginPage() {
  const { personaId } = useDemo()
  const { login } = useSession()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState(() => (personaId ? PERSONAS[personaId].demoEmail : ''))
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const canSubmit = isEmail(email) && password.length > 0

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!canSubmit) return
    const result = login(email)
    if (!result.ok) {
      setError('가입된 계정이 없어요. 이메일을 확인하거나 회원가입해 주세요.')
      return
    }
    navigate(readReturnPath(location.state) ?? paths.home, { replace: true })
  }

  return (
    <AuthScreen
      gradientStop="35%"
      footer={
        <p className={`${styles.switch} body-small-1l`}>
          아직 계정이 없나요?
          <Link to={paths.signup} replace className="etc-14-bold-1l">
            회원가입
          </Link>
        </p>
      }
    >
      <BackButton fallback={paths.welcome} />
      <div className={styles.head}>
        <h1 className="point-screen">
          다시 만나서
          <br />
          반가워요
        </h1>
        <p className={`${styles.desc} body-base-1l`}>이메일로 로그인해 주세요.</p>
        <div className={styles.character} aria-hidden="true">
          <SpeechBubble tail="right" size="sm" className={styles.bubble}>
            다시 왔구나!
          </SpeechBubble>
          <Mascot width={92} />
        </div>
      </div>

      <form className={styles.form} onSubmit={submit} noValidate>
        <TextField
          label="이메일"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onValueChange={(value) => {
            setEmail(value)
            setError(null)
          }}
        />
        <TextField
          label="비밀번호"
          type="password"
          autoComplete="current-password"
          value={password}
          onValueChange={(value) => {
            setPassword(value)
            setError(null)
          }}
          revealable
        />
        <button type="button" className={`${styles.forgot} ui-meta-1l`} onClick={() => showToast(TOAST_TEXT.preparing)}>
          비밀번호를 잊으셨나요?
        </button>
        {error && (
          <p className={`${styles.error} ui-caption`} role="alert">
            {error}
          </p>
        )}
        <Button type="submit" size="cta" disabled={!canSubmit} className={styles.submit}>
          로그인
        </Button>
      </form>

      <div className={styles.divider}>
        <span className="ui-meta-1l">또는 간편하게</span>
      </div>
      <div className={styles.socials}>
        {SOCIALS.map((social) => (
          <button
            key={social.brand}
            type="button"
            className={styles.social}
            aria-label={social.label}
            onClick={() => showToast(TOAST_TEXT.emailOnly)}
          >
            <img src={social.circle} alt="" width={56} height={56} />
            <img className={styles.socialIcon} src={social.icon} alt="" width={social.brand === 'google' ? 17.6 : 22} height={social.brand === 'google' ? 17.6 : 22} />
          </button>
        ))}
      </div>
    </AuthScreen>
  )
}
