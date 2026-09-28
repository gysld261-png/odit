import { useId, useState } from 'react'
import chevronDown from '../../assets/icons/chevron-down.svg'
import styles from './StoryBox.module.css'

interface SummaryAccordionProps {
  summary: string
  detail: string
}

/**
 * 한 줄 정리 (Figma SummaryAccordion). 기본은 한 줄 정리만, '상세보기'로 설명을 펼친다.
 * 펼친 상태 디자인은 Figma 컴포넌트 속성만 있어서, 같은 카드 안에 본문을 이어 붙이고 화살표를 뒤집는다.
 */
export function SummaryAccordion({ summary, detail }: SummaryAccordionProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <section className={styles.yellowBox} aria-label="한 줄 정리">
      <p className={`${styles.label} ui-label-1l`}>한 줄 정리</p>
      <p className="body-strong">{summary}</p>
      {open && (
        <p id={panelId} className={`${styles.detail} body-small`}>
          {detail}
        </p>
      )}
      <span className={styles.divider} />
      <button
        type="button"
        className={`${styles.control} body-small-1l`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? '접기' : '상세보기'}
        <img src={chevronDown} alt="" width={20} height={20} data-open={open} />
      </button>
    </section>
  )
}
