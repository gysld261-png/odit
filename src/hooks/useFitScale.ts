import { useCallback, useSyncExternalStore } from 'react'
import { DEVICE_OUTER_HEIGHT, SHOWCASE_CONFIG } from '../config/showcase'

const MIN_SCALE = 0.5

function computeScale(): number {
  const available = window.innerHeight - SHOWCASE_CONFIG.fitPadding * 2
  return Math.max(MIN_SCALE, Math.min(1, available / DEVICE_OUTER_HEIGHT))
}

/**
 * '화면에 맞추기' 배율. 브라우저 높이가 목업보다 낮을 때만 줄인다(1 이상으로 키우지 않음).
 * 앱 내부 레이아웃 크기(402×874)는 그대로 두고 바깥에서 transform: scale()로만 줄이는 데 쓴다.
 */
export function useFitScale(enabled: boolean): number {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener('resize', onChange)
    return () => window.removeEventListener('resize', onChange)
  }, [])

  const scale = useSyncExternalStore(subscribe, computeScale)
  return enabled ? scale : 1
}
