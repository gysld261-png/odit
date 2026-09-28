import { useEffect, useRef } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import logoUrl from '../../assets/logo/odit-logo.svg'
import { APP_CONFIG } from '../../config/app'
import { isPersonaId } from '../../config/demo'
import { useDemo } from '../../hooks/useDemo'
import { readReturnPath, startNavigation } from '../../routes/paths'
import { DemoGuide } from './DemoGuide'
import styles from './DemoPage.module.css'

/**
 * /demo — 퍼소나 선택 화면 (모바일의 기본 진입, PC에서는 기기 안에도 같은 내용이 보인다).
 * /demo?persona=A|B 는 발표용 바로가기다. 기존 진행 데이터가 있으면 이어서 보여주고, 초기화는 하지 않는다.
 * URL 값은 시연 상태 선택에만 쓰고 인증·권한에는 쓰지 않는다.
 */
export function DemoPage() {
  const [params] = useSearchParams()
  const { startPersona } = useDemo()
  const navigate = useNavigate()
  const location = useLocation()
  const persona = params.get('persona')
  const handled = useRef<string | null>(null)

  useEffect(() => {
    if (!isPersonaId(persona) || handled.current === persona) return
    handled.current = persona
    const record = startPersona(persona, 'continue')
    const returnPath = readReturnPath(location.state)
    if (returnPath) navigate(returnPath, { replace: true })
    else {
      const { to, state } = startNavigation(record)
      navigate(to, { replace: true, state })
    }
  }, [persona, startPersona, navigate, location.state])

  const invalidParam = persona !== null && !isPersonaId(persona)

  return (
    <main className={styles.page}>
      <img className={styles.logo} src={logoUrl} alt={`${APP_CONFIG.serviceName} ${APP_CONFIG.serviceNameEn}`} />
      <p className={`${styles.tagline} point-title`}>{APP_CONFIG.tagline}</p>
      {invalidParam && (
        <p className={`${styles.error} ui-meta`} role="alert">
          알 수 없는 퍼소나예요. 아래에서 골라주세요.
        </p>
      )}
      <DemoGuide variant="page" />
    </main>
  )
}
