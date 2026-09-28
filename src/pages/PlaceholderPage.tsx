import { Link, useLocation } from 'react-router'
import { useDemo, useSession } from '../hooks/useDemo'
import { paths } from '../routes/paths'
import styles from './PlaceholderPage.module.css'

interface PlaceholderPageProps {
  title: string
  /** Figma 프레임 node id */
  figma: string
}

const ROUTE_LINKS: Array<[string, string]> = [
  ['환영', paths.welcome],
  ['로그인 방식', paths.authMethod],
  ['이메일 로그인', paths.login],
  ['회원가입', paths.signup],
  ['온보딩 1', paths.onboarding(1)],
  ['홈', paths.home],
  ['탐색', paths.explore],
  ['검색 결과', `${paths.search}?q=${encodeURIComponent('서울의 봄 전두광')}&type=all`],
  ['이야기 상세', paths.story('oppenheimer')],
  ['연결 선택', paths.storyConnections('oppenheimer')],
  ['나의 역사 지도', paths.map],
  ['배지', paths.badges],
  ['보관함', `${paths.library}?tab=saved`],
  ['프로필', paths.profile],
  ['오딧 패스', paths.pass],
  ['요금제 선택', paths.passPlan],
  ['패스 완료', paths.passComplete],
  ['없는 주소', '/no-such-page'],
]

/**
 * 임시 화면 — 2단계(라우터·레이아웃·기기 목업) 확인용.
 * 3~4단계에서 실제 페이지로 하나씩 바꾸고, 전부 바뀌면 이 파일을 지운다.
 */
export function PlaceholderPage({ title, figma }: PlaceholderPageProps) {
  const location = useLocation()
  const { personaId } = useDemo()
  const { status, currentUser } = useSession()

  return (
    <div className={styles.page}>
      <p className={`${styles.eyebrow} ui-label-1l`}>구현 예정 화면</p>
      <h1 className="point-screen">{title}</h1>
      <dl className={`${styles.meta} ui-meta`}>
        <dt>URL</dt>
        <dd>
          {location.pathname}
          {location.search}
        </dd>
        <dt>Figma</dt>
        <dd>{figma}</dd>
        <dt>퍼소나</dt>
        <dd>{personaId ?? '없음'}</dd>
        <dt>세션</dt>
        <dd>
          {status}
          {currentUser ? ` · ${currentUser.nickname} (${currentUser.email})` : ''}
        </dd>
      </dl>

      <h2 className={`${styles.subTitle} title-card-1l`}>라우트 이동 확인</h2>
      <ul className={styles.links}>
        {ROUTE_LINKS.map(([label, to]) => (
          <li key={to}>
            <Link to={to} className="body-small-1l">
              <span>{label}</span>
              <span className={`${styles.path} ui-caption-1l`}>{to}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
