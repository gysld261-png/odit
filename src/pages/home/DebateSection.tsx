import tailBlue from '../../assets/home/debate-tail-blue.svg'
import tailYellow from '../../assets/home/debate-tail-yellow.svg'
import { TODAY_DEBATE } from '../../data/common/home'
import { useUserData } from '../../hooks/useUserData'
import styles from './HomePage.module.css'

/**
 * 오늘의 역사 논쟁 (VS 투표).
 * 투표하면 개인 기록에 남고(새로고침해도 유지), 다른 쪽을 누르면 바꿀 수 있다.
 * 결과 화면 디자인이 없어서 [제안] 고른 쪽 강조 + 비율 텍스트로 보여준다.
 */
export function DebateSection() {
  const { progress, dispatch } = useUserData()
  const myVote = progress.votes[TODAY_DEBATE.id] ?? null

  const totals = TODAY_DEBATE.choices.map((choice) => choice.baseVotes + (myVote === choice.id ? 1 : 0))
  const sum = totals.reduce((a, b) => a + b, 0)
  const percents = totals.map((count) => Math.round((count / sum) * 100))

  return (
    <section className={styles.debateSection} aria-labelledby="debate-title">
      <div className={styles.debateHead}>
        <p className={`${styles.debateEyebrow} ui-meta-1l`}>{TODAY_DEBATE.eyebrow}</p>
        <h2 id="debate-title" className="point-title">
          {TODAY_DEBATE.question.lead}
          <br />
          <span className={styles.toneYellow}>{TODAY_DEBATE.question.yes}</span>{' '}
          <span className={styles.toneBlue}>{TODAY_DEBATE.question.no}</span>
        </h2>
      </div>

      <div className={styles.choices} role="group" aria-label="투표">
        {TODAY_DEBATE.choices.map((choice, index) => {
          const selected = myVote === choice.id
          return (
            <div key={choice.id} className={styles.choiceSlot}>
              {index === 1 && (
                <span className={`${styles.versus} body-strong-1l`} aria-hidden="true">
                  VS
                </span>
              )}
              <button
                type="button"
                className={styles.choice}
                data-tone={choice.tone}
                data-selected={selected}
                aria-pressed={selected}
                onClick={() => dispatch({ type: 'debate/vote', debateId: TODAY_DEBATE.id, choiceId: choice.id })}
              >
                <span className={styles.bubbleArea}>
                  <img
                    className={styles.bubbleTail}
                    src={choice.tone === 'blue' ? tailBlue : tailYellow}
                    alt=""
                    width={17.3205}
                    height={15}
                  />
                  <span className={`${styles.bubble} body-strong-1l`}>{choice.bubble}</span>
                </span>
                <img className={styles.choiceImage} src={choice.image} alt="" width={130} height={130} />
                <span className={`${styles.choiceLabel} body-strong`}>{choice.label}</span>
                {myVote !== null && (
                  <span className={`${styles.choiceResult} etc-15-bold-1l`}>
                    {percents[index]}%{selected && <span className="visually-hidden"> (내 선택)</span>}
                  </span>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
