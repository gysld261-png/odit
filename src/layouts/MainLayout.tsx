import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router'
import { BottomNav } from '../components/common/BottomNav'
import { useScrollRestore } from '../hooks/useScrollRestore'
import styles from './layout.module.css'

/**
 * 홈·탐색·검색 결과·지도·배지·보관함. 스크롤 콘텐츠 + 떠 있는 캡슐형 BottomNav.
 * 홈은 히어로 배경이 상태바 뒤까지 이어지므로(Figma HeroBg y=0) 상단 여백은 각 페이지가 준다.
 * 스크롤하면 상태바 자리에 옅은 바탕을 깔아 글자가 시계·배터리와 겹치지 않게 한다.
 */
export function MainLayout() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  useScrollRestore(scrollRef)

  useEffect(() => {
    const node = scrollRef.current
    if (node === null) return
    const update = () => setScrolled(node.scrollTop > 8)
    update()
    node.addEventListener('scroll', update, { passive: true })
    return () => node.removeEventListener('scroll', update)
  }, [])

  return (
    <div className={`${styles.root} ${styles.fullBleed}`}>
      <span className={styles.statusScrim} data-visible={scrolled} aria-hidden="true" />
      <div ref={scrollRef} className={`${styles.scroll} ${styles.withBottomNav}`} data-scroll-container>
        <Outlet />
      </div>
      <div className={styles.bottomNav}>
        <BottomNav />
      </div>
    </div>
  )
}
