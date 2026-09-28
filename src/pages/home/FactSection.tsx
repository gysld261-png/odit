import { FACT_OR_INTERPRETATION } from '../../data/common/home'
import styles from './HomePage.module.css'

/** 사실일까, 해석일까? — 흔한 통념 목록. TODO(4단계): 항목별 설명 이야기로 연결 */
export function FactSection() {
  return (
    <section className={styles.factSection} aria-labelledby="fact-title">
      <h2 id="fact-title" className={`${styles.factTitle} title-section-1l`}>
        사실일까, 해석일까?
      </h2>
      <ul className={styles.factList}>
        {FACT_OR_INTERPRETATION.map((item) => (
          <li key={item.id} className={styles.factItem}>
            <img src={item.icon} alt="" width={54} height={54} />
            <span className={styles.factCopy}>
              <span className={`${styles.factCategory} ui-label-1l`}>{item.category}</span>
              <span className="body-strong-1l">{item.claim}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
