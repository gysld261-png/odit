import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Outlet } from 'react-router'
import logoUrl from '../assets/logo/odit-logo.svg'
import { AppViewport } from '../components/device/AppViewport'
import { DeviceFrame } from '../components/device/DeviceFrame'
import { ToastHost } from '../components/common/ToastHost'
import { APP_CONFIG } from '../config/app'
import { DEVICE_OUTER_HEIGHT, DEVICE_OUTER_WIDTH, SHOWCASE_CONFIG } from '../config/showcase'
import { useDemo } from '../hooks/useDemo'
import { useFitScale } from '../hooks/useFitScale'
import { useIsDesktop } from '../hooks/useIsDesktop'
import { DemoGuide } from '../pages/demo/DemoGuide'
import { MobileDemoToggle } from '../pages/demo/MobileDemoToggle'
import styles from './ShowcaseLayout.module.css'

type ViewMode = 'fit' | 'original'

/** 스크롤 안내를 숨길 기준(px). 조금만 움직여도 "스크롤된다"는 걸 알았다고 본다. */
const SCROLL_HINT_DISMISS_AT = 24

/**
 * PC: 브랜드 배경 + 가운데 기기 목업 + 왼쪽 서비스 소개 + 오른쪽 데모 가이드
 * 모바일: 전부 걷어내고 앱 화면만
 *
 * PC/모바일은 같은 트리에서 data-mode와 CSS로만 바꾼다. 조건부로 다른 컴포넌트를 렌더링하면
 * 창 크기를 바꿀 때 페이지가 다시 마운트되어 입력값·스크롤이 사라지기 때문이다.
 */
export function ShowcaseLayout() {
  const isDesktop = useIsDesktop()
  const mode = isDesktop ? 'desktop' : 'mobile'
  const [viewMode, setViewMode] = useState<ViewMode>('fit')
  const scale = useFitScale(isDesktop && viewMode === 'fit')
  const { personaId } = useDemo()

  const deviceRef = useRef<HTMLDivElement>(null)
  const [hasScrolled, setHasScrolled] = useState(false)

  // scroll 이벤트는 버블링되지 않으므로 캡처 단계에서 기기 안의 어떤 스크롤 영역이든 감지한다.
  useEffect(() => {
    const node = deviceRef.current
    if (node === null || hasScrolled) return
    const onScroll = (event: Event) => {
      const target = event.target
      if (target instanceof HTMLElement && target.scrollTop > SCROLL_HINT_DISMISS_AT) setHasScrolled(true)
    }
    node.addEventListener('scroll', onScroll, { capture: true, passive: true })
    return () => node.removeEventListener('scroll', onScroll, { capture: true })
  }, [hasScrolled])

  const { background } = SHOWCASE_CONFIG
  const showcaseVars = {
    '--showcase-bg': background.color,
    '--showcase-bg-from': background.gradientFrom,
    '--showcase-bg-image': background.image ? `url(${background.image})` : 'none',
    '--showcase-overlay-opacity': background.image ? background.overlayOpacity : 0,
    '--showcase-graphic-opacity': background.graphicOpacity,
    '--showcase-fit-padding': `${SHOWCASE_CONFIG.fitPadding}px`,
  } as CSSProperties

  return (
    <div className={styles.showcase} data-mode={mode} data-view={viewMode} style={showcaseVars}>
      <div className={styles.backdrop} aria-hidden="true">
        <BrandGraphic />
      </div>

      <aside className={styles.intro} aria-label="서비스 소개">
        <img className={styles.logo} src={logoUrl} alt={`${APP_CONFIG.serviceName} ${APP_CONFIG.serviceNameEn}`} />
        <p className={`${styles.tagline} point-screen`}>{APP_CONFIG.tagline}</p>
        <p className={`${styles.description} body-base`}>{APP_CONFIG.description}</p>

        <div className={styles.viewControls} role="group" aria-label="목업 크기">
          <button type="button" aria-pressed={viewMode === 'fit'} onClick={() => setViewMode('fit')}>
            화면에 맞추기
          </button>
          <button type="button" aria-pressed={viewMode === 'original'} onClick={() => setViewMode('original')}>
            원본 크기
          </button>
          <span className={`${styles.scaleValue} ui-caption-1l`}>{Math.round(scale * 100)}%</span>
        </div>

        <p className={`${styles.scrollHint} ui-meta-1l`} data-hidden={hasScrolled} aria-hidden={hasScrolled}>
          <span className={styles.mouse} aria-hidden="true" />
          기기 안에서 스크롤해 보세요
        </p>
      </aside>

      {/* 목업 자리: 축소된 크기만큼만 공간을 차지해야 가운데 정렬이 맞는다 */}
      <div
        ref={deviceRef}
        className={styles.deviceSlot}
        style={isDesktop ? { width: DEVICE_OUTER_WIDTH * scale, height: DEVICE_OUTER_HEIGHT * scale } : undefined}
      >
        <div className={styles.deviceScaler} style={isDesktop ? { transform: `scale(${scale})` } : undefined}>
          <DeviceFrame mode={mode}>
            <AppViewport mode={mode}>
              {/* 퍼소나를 바꾸면 화면 안의 폼 입력·펼침 상태를 비운다. 창 크기 변경에는 반응하지 않는다. */}
              <div key={personaId ?? 'none'} className={styles.screenContent}>
                <Outlet />
              </div>
              <ToastHost />
              <MobileDemoToggle />
            </AppViewport>
          </DeviceFrame>
        </div>
      </div>

      <aside className={styles.guide} aria-label="데모 가이드">
        <DemoGuide variant="panel" />
      </aside>
    </div>
  )
}

/** [제안] 브랜드 그래픽: 역사 지도가 쌓이는 느낌의 노드 + 점선 연결선 (Yellow 500 점선 2/9, 흰 노드 + Yellow 500 테두리) */
function BrandGraphic() {
  const paths = [
    'M70 730 C 170 650, 250 560, 330 610 S 440 720, 470 840',
    'M110 110 C 180 190, 270 170, 300 270',
    'M1380 130 C 1290 200, 1210 110, 1120 180 S 1000 300, 1040 400',
    'M1370 790 C 1290 700, 1210 770, 1120 690 S 990 640, 1000 520',
  ]
  const nodes: Array<[number, number]> = [
    [70, 730],
    [330, 610],
    [470, 840],
    [110, 110],
    [300, 270],
    [1380, 130],
    [1120, 180],
    [1040, 400],
    [1370, 790],
    [1120, 690],
    [1000, 520],
  ]
  return (
    <svg className={styles.graphic} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      {paths.map((d) => (
        <path key={d} d={d} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 9" />
      ))}
      {nodes.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" strokeWidth="2.5" />
      ))}
    </svg>
  )
}
