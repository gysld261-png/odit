import { Link } from 'react-router'
import notificationButton from '../../assets/icons/notification-button.svg'
import profileButton from '../../assets/icons/profile-button.svg'
import logoUrl from '../../assets/logo/odit-logo.svg'
import { TOAST_TEXT, useToast } from '../../hooks/useToast'
import { paths } from '../../routes/paths'
import { BackButton } from './BackButton'
import styles from './AppHeader.module.css'

type AppHeaderProps =
  | { type: 'main' }
  | {
      type: 'detail'
      /** 외부에서 바로 들어왔을 때 뒤로가기가 갈 곳 */
      backFallback: string
      saved?: boolean
      onSave?: () => void
      onShare?: () => void
    }

/**
 * ODIT/AppHeader.
 * main = 로고 + 프로필·알림 (홈) / detail = 뒤로 + 저장·공유 (이야기 상세·연결 선택)
 * TODO(4단계): Type=Sub (뒤로 + 제목 + 정보) — 지도·배지 화면에서 쓴다.
 */
export function AppHeader(props: AppHeaderProps) {
  const { showToast } = useToast()

  if (props.type === 'main') {
    return (
      <header className={styles.main}>
        <img className={styles.logo} src={logoUrl} alt="오딧" width={66.8} height={21} />
        <div className={styles.actions}>
          <Link to={paths.profile} aria-label="프로필">
            <img src={profileButton} alt="" width={32} height={31} />
          </Link>
          {/* 알림 목록 화면은 기획에 없다 → 준비 중 안내 */}
          <button type="button" aria-label="알림" onClick={() => showToast(TOAST_TEXT.preparing)}>
            <img src={notificationButton} alt="" width={32} height={31} />
          </button>
        </div>
      </header>
    )
  }

  return (
    <header className={`${styles.detail} body-small-1l`}>
      <BackButton fallback={props.backFallback} variant="text" />
      <div className={styles.detailActions}>
        {props.onSave && (
          <button type="button" onClick={props.onSave} aria-pressed={props.saved} data-active={props.saved}>
            {props.saved ? '저장됨' : '저장'}
          </button>
        )}
        {props.onShare && (
          <button type="button" onClick={props.onShare}>
            공유
          </button>
        )}
      </div>
    </header>
  )
}
