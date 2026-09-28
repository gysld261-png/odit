import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import checkboxOn20 from '../../assets/icons/checkbox-on-20.svg'
import checkboxOn22 from '../../assets/icons/checkbox-on-22.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import okIcon from '../../assets/icons/ok.svg'
import { PERSONAS } from '../../data/personas'
import { Mascot } from '../../components/brand/Mascot'
import { AuthScreen } from '../../components/common/AuthScreen'
import { BackButton } from '../../components/common/BackButton'
import { Button } from '../../components/common/Button'
import { SpeechBubble } from '../../components/common/SpeechBubble'
import { TextField } from '../../components/common/TextField'
import { useDemo, useSession } from '../../hooks/useDemo'
import { TOAST_TEXT, useToast } from '../../hooks/useToast'
import { paths } from '../../routes/paths'
import { checkPassword, isEmail } from '../../utils/validators'
import styles from './SignupPage.module.css'

const FORM_ID = 'signup-form'

type TermKey = 'service' | 'privacy'
const TERMS: Array<{ key: TermKey; label: string }> = [
  { key: 'service', label: '[필수] 이용약관 동의' },
  { key: 'privacy', label: '[필수] 개인정보 처리방침 동의' },
]

/**
 * /signup — 이메일 회원가입 (Figma 04_signup). 데모 가입이다.
 * 비밀번호는 규칙 확인에만 쓰고 저장하지 않는다. 가입하면 로그인 상태가 되고 온보딩으로 간다.
 */
export function SignupPage() {
  const { personaId, record } = useDemo()
  const { signup } = useSession()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const persona = personaId ? PERSONAS[personaId] : null

  const [email, setEmail] = useState(persona?.demoEmail ?? '')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agreed, setAgreed] = useState<Record<TermKey, boolean>>({ service: false, privacy: false })
  const [error, setError] = useState<string | null>(null)

  const emailValid = isEmail(email)
  const rules = checkPassword(password)
  const passwordValid = rules.hasLetterAndNumber && rules.hasMinLength
  const matches = confirm.length > 0 && confirm === password
  const allAgreed = agreed.service && agreed.privacy
  const canSubmit = emailValid && passwordValid && matches && allAgreed

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!canSubmit || persona === null) return
    if (record?.account && record.account.email.toLowerCase() === email.trim().toLowerCase()) {
      setError('이미 가입된 이메일이에요. 로그인해 주세요.')
      return
    }
    signup({ email, nickname: persona.defaultNickname })
    navigate(paths.onboarding(1), { replace: true })
  }

  return (
    <AuthScreen
      gradientStop="35%"
      footer={
        <>
          <Button type="submit" form={FORM_ID} size="cta" disabled={!canSubmit}>
            회원가입
          </Button>
          <p className={`${styles.switch} body-small-1l`}>
            이미 계정이 있어요
            <Link to={paths.login} replace className="etc-14-bold-1l">
              로그인
            </Link>
          </p>
        </>
      }
    >
      <BackButton fallback={paths.authMethod} />
      <div className={styles.head}>
        <h1 className="point-screen">
          오딧에서
          <br />
          처음 뵙네요
        </h1>
        <p className={`${styles.desc} body-base-1l`}>관심사와 역사 지도가 계정에 저장돼요.</p>
        <div className={styles.character} aria-hidden="true">
          <SpeechBubble tail="right" size="sm" className={styles.bubble}>
            반가워, 처음이지?
          </SpeechBubble>
          <Mascot width={88} />
        </div>
      </div>

      <form id={FORM_ID} className={styles.form} onSubmit={submit} noValidate>
        <TextField
          label="이메일"
          type="email"
          inputMode="email"
          autoComplete="email"
          height={52}
          value={email}
          valid={emailValid}
          onValueChange={(value) => {
            setEmail(value)
            setError(null)
          }}
          hint={
            email.length > 0 && !emailValid ? (
              <p className={`${styles.message} ui-caption-1l`}>이메일 형식을 확인해 주세요</p>
            ) : undefined
          }
        />
        <TextField
          label="비밀번호"
          type="password"
          autoComplete="new-password"
          height={52}
          value={password}
          onValueChange={setPassword}
          hint={
            <ul className={styles.rules} aria-label="비밀번호 조건">
              <Rule met={rules.hasLetterAndNumber}>영문·숫자 포함</Rule>
              <Rule met={rules.hasMinLength}>8자 이상</Rule>
            </ul>
          }
        />
        <TextField
          label="비밀번호 확인"
          type="password"
          autoComplete="new-password"
          height={52}
          value={confirm}
          valid={matches}
          onValueChange={setConfirm}
          hint={
            confirm.length > 0 ? (
              <p className={`${styles.message} ui-caption-1l`} data-met={matches}>
                {matches ? '비밀번호가 일치해요' : '비밀번호가 일치하지 않아요'}
              </p>
            ) : undefined
          }
        />

        {/* 약관: 전체 동의 ↔ 개별 [필수] 2개가 연동된다. 필수를 모두 동의해야 가입 버튼이 켜진다. */}
        <fieldset className={styles.terms}>
          <legend className="visually-hidden">약관 동의</legend>
          <label className={styles.termAll}>
            <input
              type="checkbox"
              className="visually-hidden"
              checked={allAgreed}
              onChange={(event) => setAgreed({ service: event.target.checked, privacy: event.target.checked })}
            />
            <CheckMark on={allAgreed} size={22} />
            <span className="etc-15-bold-1l">전체 동의</span>
          </label>
          <span className={styles.termDivider} />
          {TERMS.map((term) => (
            <div key={term.key} className={styles.termRow}>
              <label className={styles.termLabel}>
                <input
                  type="checkbox"
                  className="visually-hidden"
                  checked={agreed[term.key]}
                  onChange={(event) => setAgreed((prev) => ({ ...prev, [term.key]: event.target.checked }))}
                />
                <CheckMark on={agreed[term.key]} size={20} />
                <span className="body-small-1l">{term.label}</span>
              </label>
              <button
                type="button"
                className={styles.termDetail}
                aria-label={`${term.label} 내용 보기`}
                onClick={() => showToast(TOAST_TEXT.preparing)}
              >
                <img src={chevronRight} alt="" width={6.6} height={11.6} />
              </button>
            </div>
          ))}
        </fieldset>

        {error && (
          <p className={`${styles.message} ui-caption`} role="alert">
            {error}
          </p>
        )}
      </form>
    </AuthScreen>
  )
}

function Rule({ met, children }: { met: boolean; children: string }) {
  return (
    <li className={`${styles.rule} ui-caption-1l`} data-met={met}>
      <img src={okIcon} alt="" width={10} height={8.5} />
      {children}
      <span className="visually-hidden">{met ? ' 충족' : ' 미충족'}</span>
    </li>
  )
}

/** Figma checkbox_on(노랑 채움)만 있어서, 꺼진 상태는 같은 모양의 테두리 상자로 그린다 */
function CheckMark({ on, size }: { on: boolean; size: 20 | 22 }) {
  return (
    <span className={styles.check} style={{ width: size, height: size }} aria-hidden="true">
      {on && <img src={size === 22 ? checkboxOn22 : checkboxOn20} alt="" width={size} height={size} />}
    </span>
  )
}
