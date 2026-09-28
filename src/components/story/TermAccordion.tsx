import { useId, useState } from 'react'
import plusIcon from '../../assets/icons/plus.svg'
import styles from './StoryBox.module.css'

interface TermAccordionProps {
  term: string
  definition: string
}

/** 용어 설명 (Figma TermAccordion). + 를 누르면 뜻이 펼쳐지고 아이콘이 ×(45° 회전)로 바뀐다. */
export function TermAccordion({ term, definition }: TermAccordionProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className={styles.term}>
      <button
        type="button"
        className={styles.termButton}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="body-strong-1l">{term}</span>
        <img src={plusIcon} alt="" width={20} height={20} data-open={open} />
      </button>
      {open && (
        <p id={panelId} className={`${styles.termBody} body-small`}>
          {definition}
        </p>
      )}
    </div>
  )
}
