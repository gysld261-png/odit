import { useLayoutEffect, type RefObject } from 'react'
import { useLocation } from 'react-router'

/** 방문 기록(location.key)별 스크롤 위치. 새로고침하면 비워진다(의도). */
const positions = new Map<string, number>()

/**
 * 스크롤은 window가 아니라 레이아웃의 스크롤 영역이 담당한다.
 * - 새로 들어온 화면(새 key)은 맨 위에서 시작한다 → 상세 진입은 항상 맨 위
 * - 뒤로가기로 돌아온 화면(같은 key)은 떠날 때 위치로 돌아간다 → 목록 → 상세 → 뒤로
 */
export function useScrollRestore(ref: RefObject<HTMLElement | null>) {
  const { key } = useLocation()

  useLayoutEffect(() => {
    const node = ref.current
    if (node === null) return
    node.scrollTop = positions.get(key) ?? 0
    const save = () => positions.set(key, node.scrollTop)
    node.addEventListener('scroll', save, { passive: true })
    return () => {
      node.removeEventListener('scroll', save)
      // scroll 이벤트는 다음 프레임에 오므로, 스크롤 직후 바로 떠나도 위치를 잃지 않게 떠날 때 한 번 더 저장한다
      save()
    }
  }, [ref, key])
}
