import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useDemo } from '../../hooks/useDemo'
import { getStartPath, paths, readReturnPath } from '../../routes/paths'
import type { PersonaId, PersonaMeta } from '../../types/demo'
import styles from './DemoGuide.module.css'

interface DemoGuideProps {
  /** panel = PC 기기 바깥, page = /demo 화면, compact = 모바일 DEMO 버튼 */
  variant: 'panel' | 'page' | 'compact'
  /** 동작 후 호출 (모바일 팝오버 닫기 등) */
  onAction?: () => void
}

/**
 * 시연용 퍼소나 선택 도구. 실제 서비스 UI가 아니므로 환영·가입 화면 안에 넣지 않고,
 * 기기 바깥 패널(PC)·/demo 화면·DEMO 버튼(모바일)으로만 보여준다.
 */
export function DemoGuide({ variant, onAction }: DemoGuideProps) {
  const { personaId, personas, startPersona, resetPersona } = useDemo()
  const navigate = useNavigate()
  const location = useLocation()
  const [notice, setNotice] = useState<string | null>(null)

  // 가드가 /demo로 보내면서 넘긴 원래 목적지. /demo 화면에서만 쓴다.
  const returnPath = location.pathname === paths.demo ? readReturnPath(location.state) : null

  const start = (id: PersonaId) => {
    const record = startPersona(id, 'continue')
    navigate(returnPath ?? getStartPath(record), { replace: location.pathname === paths.demo })
    setNotice(null)
    onAction?.()
  }

  const startFromSplash = (id: PersonaId) => {
    startPersona(id, 'fromSplash')
    navigate(paths.welcome)
    setNotice(null)
    onAction?.()
  }

  const reset = (persona: PersonaMeta) => {
    const record = resetPersona(persona.id)
    if (persona.id === personaId) navigate(getStartPath(record), { replace: true })
    setNotice(`${persona.name}의 시연 데이터를 처음 상태로 되돌렸어요.`)
  }

  return (
    <section className={styles.guide} data-variant={variant}>
      <header className={styles.header}>
        <span className={`${styles.badge} ui-label-1l`}>DEMO</span>
        <h2 className="title-card">퍼소나로 체험하기</h2>
        {variant !== 'compact' && (
          <p className={`${styles.note} ui-meta`}>발표용 시연 도구예요. 실제 서비스 화면에는 없어요.</p>
        )}
      </header>

      <ul className={styles.list}>
        {personas.map((persona) => {
          const isCurrent = persona.id === personaId
          return (
            <li key={persona.id} className={styles.card} data-current={isCurrent}>
              <div className={styles.cardHead}>
                <strong className="body-strong-1l">{persona.name}</strong>
                <span className={`${styles.kind} ui-label-1l`} data-kind={persona.kind}>
                  {persona.kindLabel}
                </span>
                {isCurrent && <span className={`${styles.current} ui-caption-1l`}>체험 중</span>}
              </div>
              <p className={`${styles.tagline} ui-meta`}>{persona.tagline}</p>

              <div className={styles.actions}>
                <button type="button" className={styles.primary} onClick={() => start(persona.id)}>
                  {isCurrent ? '이어서 보기' : '이 퍼소나로 체험하기'}
                </button>
                {/* A는 처음부터 = 가입 전 상태라 초기화와 같다. B만 로그인부터 다시 보기를 따로 둔다. */}
                {persona.kind === 'existing' && (
                  <button type="button" className={styles.secondary} onClick={() => startFromSplash(persona.id)}>
                    처음부터 보기 (스플래시 → 로그인)
                  </button>
                )}
                <button type="button" className={styles.reset} onClick={() => reset(persona)}>
                  시연 데이터 초기화
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <p className={`${styles.notice} ui-caption`} role="status">
        {notice}
      </p>

      {variant !== 'compact' && (
        <p className={`${styles.urls} ui-caption`}>
          발표용 바로가기 <code>/demo?persona=A</code> · <code>/demo?persona=B</code>
        </p>
      )}
    </section>
  )
}
