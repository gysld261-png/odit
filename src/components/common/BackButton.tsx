import { useLocation, useNavigate } from 'react-router'
import backIcon from '../../assets/icons/back.svg'
import styles from './BackButton.module.css'

interface BackButtonProps {
  /** 앱 안에서 이동해 온 기록이 없을 때(외부 링크·새로고침으로 바로 들어온 경우) 갈 곳 */
  fallback: string
  className?: string
}

/**
 * 뒤로가기. history.length는 다른 사이트 기록까지 세므로 쓰지 않는다.
 * React Router는 앱에 처음 들어온 위치의 key를 'default'로 두므로, 그때만 fallback으로 보낸다.
 */
export function BackButton({ fallback, className }: BackButtonProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const goBack = () => {
    if (location.key === 'default') navigate(fallback, { replace: true })
    else navigate(-1)
  }

  return (
    <button type="button" className={`${styles.back} ${className ?? ''}`} onClick={goBack} aria-label="뒤로 가기">
      <img src={backIcon} alt="" width={10.2} height={18.2} />
    </button>
  )
}
