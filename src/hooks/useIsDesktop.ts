import { useCallback, useSyncExternalStore } from 'react'
import { SHOWCASE_CONFIG } from '../config/showcase'

/**
 * PC 쇼케이스 여부. User-Agent가 아니라 화면 너비로만 판단한다.
 * 값이 바뀌어도 컴포넌트 트리는 그대로 두고 표현(data-mode)만 바꾸는 데 쓴다.
 */
export function useIsDesktop(minWidth: number = SHOWCASE_CONFIG.desktopMinWidth): boolean {
  const query = `(min-width: ${minWidth}px)`

  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches)
}
