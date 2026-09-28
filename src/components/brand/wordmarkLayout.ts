import letterD from '../../assets/logo/odit-D.svg'
import letterExclamation from '../../assets/logo/odit-exclamation.svg'
import letterI from '../../assets/logo/odit-I.svg'
import letterO from '../../assets/logo/odit-O.svg'
import letterQuestion from '../../assets/logo/odit-question.svg'
import letterT from '../../assets/logo/odit-T.svg'

export type WordmarkLetter = 'O' | 'D' | 'I' | 'T' | '?' | '!'

/** 글자 SVG. 높이 234 기준으로 모든 글자의 바닥선이 같다 (Figma ODIT/Logo 설명). width = viewBox 너비 */
export const LETTERS: Record<WordmarkLetter, { src: string; width: number }> = {
  O: { src: letterO, width: 178 },
  D: { src: letterD, width: 198 },
  I: { src: letterI, width: 138 },
  T: { src: letterT, width: 184 },
  '?': { src: letterQuestion, width: 168 },
  '!': { src: letterExclamation, width: 100 },
}

const LOGO_HEIGHT = 234
/** 글자 사이 간격 / 높이 (Figma 76px 워드마크에서 8px) */
const GAP_RATIO = 8 / 76
/** 띄어쓰기로 더 벌어지는 폭 / 높이 (Figma DO IT!: O 끝 → I 시작 34px 중 간격 8을 뺀 26px) */
const SPACE_RATIO = 26 / 76

export interface PlacedLetter {
  letter: WordmarkLetter
  x: number
  width: number
}

/** 글자 배열(' '는 띄어쓰기)을 주어진 높이로 배치한 x 좌표와 전체 너비 */
export function layoutWordmark(sequence: Array<WordmarkLetter | ' '>, height: number) {
  const gap = height * GAP_RATIO
  const placed: PlacedLetter[] = []
  let x = 0
  for (const item of sequence) {
    if (item === ' ') {
      x += height * SPACE_RATIO
      continue
    }
    const width = (LETTERS[item].width / LOGO_HEIGHT) * height
    placed.push({ letter: item, x, width })
    x += width + gap
  }
  return { letters: placed, width: x - gap }
}
