import { LETTERS, layoutWordmark, type WordmarkLetter } from './wordmarkLayout'

const SEQUENCES = {
  odit: ['O', 'D', 'I', 'T'],
  'odit?': ['O', 'D', 'I', 'T', '?'],
  'doit!': ['D', 'O', ' ', 'I', 'T', '!'],
} as const satisfies Record<string, ReadonlyArray<WordmarkLetter | ' '>>

interface WordmarkProps {
  variant?: keyof typeof SEQUENCES
  height: number
  className?: string
}

/** 오딧 워드마크 (정적). 글자별 SVG를 Figma와 같은 간격으로 늘어놓는다. 움직이는 버전은 Splash에 있다. */
export function Wordmark({ variant = 'odit', height, className }: WordmarkProps) {
  const { letters, width } = layoutWordmark([...SEQUENCES[variant]], height)
  const label = variant === 'doit!' ? 'DO IT!' : variant === 'odit?' ? 'ODIT?' : 'ODIT'
  return (
    <span className={className} role="img" aria-label={`오딧 ${label}`} style={{ position: 'relative', display: 'block', width, height }}>
      {letters.map(({ letter, x, width: w }) => (
        <img
          key={letter}
          src={LETTERS[letter].src}
          alt=""
          draggable={false}
          style={{ position: 'absolute', left: x, top: 0, width: w, height, maxWidth: 'none' }}
        />
      ))}
    </span>
  )
}
