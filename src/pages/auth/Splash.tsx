import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import glow from '../../assets/brand/glow.svg'
import groundShadow from '../../assets/brand/ground-shadow-splash.svg'
import spark from '../../assets/brand/spark.svg'
import { Mascot } from '../../components/brand/Mascot'
import { LETTERS, layoutWordmark, type WordmarkLetter } from '../../components/brand/wordmarkLayout'
import styles from './Splash.module.css'

const HEIGHT = 76
const ODIT = layoutWordmark(['O', 'D', 'I', 'T', '?'], HEIGHT)
const DOIT = layoutWordmark(['D', 'O', ' ', 'I', 'T', '!'], HEIGHT)
const STAGE_WIDTH = Math.max(ODIT.width, DOIT.width)

/** 두 배치를 같은 가운데 기준으로 맞춘 x 좌표 */
function xOf(layout: typeof ODIT, letter: WordmarkLetter): number {
  const found = layout.letters.find((item) => item.letter === letter)
  return (found?.x ?? 0) + (STAGE_WIDTH - layout.width) / 2
}

/** ODIT?를 보여주고 바뀌기 시작할 때까지 */
const HOLD_BEFORE_MS = 700
/** 바뀐 DO IT!을 보여주는 시간까지 합친 전체 길이 */
const TOTAL_MS = 2300

interface SplashProps {
  onDone: () => void
}

/**
 * 스플래시: ODIT? → DO IT! 키네틱 워드마크 (구현요청서 1장 브랜드 모션)
 * O와 D가 자리를 바꾸고, I·T가 띄어쓰기만큼 이동하고, ?가 돌면서 사라진 뒤 !가 떨어진다.
 * prefers-reduced-motion이면 애니메이션 없이 DO IT!을 바로 보여준다.
 */
export function Splash({ onDone }: SplashProps) {
  const reduceMotion = useReducedMotion() ?? false
  const [phase, setPhase] = useState<'odit' | 'doit'>(reduceMotion ? 'doit' : 'odit')

  useEffect(() => {
    if (reduceMotion) {
      const done = window.setTimeout(onDone, 1200)
      return () => window.clearTimeout(done)
    }
    const morph = window.setTimeout(() => setPhase('doit'), HOLD_BEFORE_MS)
    const done = window.setTimeout(onDone, TOTAL_MS)
    return () => {
      window.clearTimeout(morph)
      window.clearTimeout(done)
    }
  }, [reduceMotion, onDone])

  const doit = phase === 'doit'
  const instant = { duration: 0 }

  const letter = (key: WordmarkLetter) => ({
    src: LETTERS[key].src,
    style: { width: (LETTERS[key].width / 234) * HEIGHT, height: HEIGHT },
  })

  // O는 아래로, D는 위로 살짝 튀면서 자리를 바꾼다
  const swap = (key: 'O' | 'D', dip: number, tilt: number) => ({
    animate: doit
      ? { x: [xOf(ODIT, key), (xOf(ODIT, key) + xOf(DOIT, key)) / 2, xOf(DOIT, key)], y: [0, dip, 0], rotate: [0, tilt, 0] }
      : { x: xOf(ODIT, key), y: 0, rotate: 0 },
    transition: reduceMotion ? instant : { duration: 0.64, ease: 'easeInOut' as const },
  })

  const slide = (key: 'I' | 'T') => ({
    animate: { x: doit ? xOf(DOIT, key) : xOf(ODIT, key) },
    transition: reduceMotion ? instant : { duration: 0.52, delay: 0.08, ease: [0.34, 1.3, 0.64, 1] as const },
  })

  return (
    <div className={styles.splash} role="img" aria-label={doit ? '오딧 DO IT!' : '오딧 ODIT?'}>
      <img className={styles.glow} src={glow} alt="" width={420} height={420} />

      <div className={styles.wordmark} style={{ width: STAGE_WIDTH, height: HEIGHT }} aria-hidden="true">
        <motion.img className={styles.letter} {...letter('O')} initial={false} {...swap('O', 14, -8)} />
        <motion.img className={styles.letter} {...letter('D')} initial={false} {...swap('D', -18, 8)} />
        <motion.img className={styles.letter} {...letter('I')} initial={false} {...slide('I')} />
        <motion.img className={styles.letter} {...letter('T')} initial={false} {...slide('T')} />
        <motion.img
          className={styles.letter}
          {...letter('?')}
          initial={false}
          animate={
            doit
              ? { x: xOf(DOIT, '!'), rotate: 25, scale: 0.4, opacity: 0 }
              : { x: xOf(ODIT, '?'), rotate: 0, scale: 1, opacity: 1 }
          }
          transition={reduceMotion ? instant : { duration: 0.36, delay: 0.32, ease: 'easeIn' }}
        />
        <motion.img
          className={styles.letter}
          {...letter('!')}
          initial={false}
          animate={
            doit
              ? { x: xOf(DOIT, '!'), y: [-30, 0, 0], scale: [0.3, 1.15, 1], opacity: [0, 1, 1] }
              : { x: xOf(DOIT, '!'), y: -30, scale: 0.3, opacity: 0 }
          }
          transition={reduceMotion ? instant : { duration: 0.52, delay: 0.56, ease: 'easeOut', times: [0, 0.7, 1] }}
        />
        {/* ! 옆 반짝임 (Figma spark 3개: 위 35°, 가운데, 아래 -35°) */}
        <motion.span
          className={styles.sparks}
          style={{ left: xOf(DOIT, '!') + (LETTERS['!'].width / 234) * HEIGHT + 6 }}
          initial={false}
          animate={{ opacity: doit ? 1 : 0, x: doit ? 0 : -4 }}
          transition={reduceMotion ? instant : { duration: 0.25, delay: 0.95 }}
        >
          <img src={spark} alt="" width={14} height={3.5} style={{ transform: 'translateY(-20px) rotate(35deg)' }} />
          <img src={spark} alt="" width={14} height={3.5} style={{ transform: 'translateX(6px)' }} />
          <img src={spark} alt="" width={14} height={3.5} style={{ transform: 'translateY(20px) rotate(-35deg)' }} />
        </motion.span>
      </div>

      <div className={styles.character}>
        <img className={styles.shadow} src={groundShadow} alt="" width={162} height={36} />
        <Mascot width={184} />
      </div>

      <p className={`${styles.caption} body-strong-1l`}>{doit ? '궁금하면, 지금 시작!' : '어디까지 알고 있어?'}</p>
    </div>
  )
}
