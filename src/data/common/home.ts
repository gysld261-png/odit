import debateObey from '../../assets/home/debate-obey.webp'
import debateResign from '../../assets/home/debate-resign.webp'
import factGoryeojang from '../../assets/home/fact-goryeojang.webp'
import factHangul from '../../assets/home/fact-hangul.webp'
import factTroy from '../../assets/home/fact-troy.webp'
import factTurtleship from '../../assets/home/fact-turtleship.webp'
import pathIbangik from '../../assets/home/path-ibangik.webp'
import pathOppenheimer from '../../assets/home/path-oppenheimer.webp'
import pathProhibition from '../../assets/home/path-prohibition.webp'
import trendLiberation from '../../assets/home/trend-liberation.webp'
import trendPalace from '../../assets/home/trend-palace.webp'
import trendTroy from '../../assets/home/trend-troy.webp'

/** 홈 공개 콘텐츠 (Figma HomeScreen). 신규·기존 사용자 모두 같은 공개 콘텐츠를 본다. */

/** 맞춤 탐색 카드 (ODIT/StoryCard Layout=Vertical) */
export const RECOMMENDED_PATHS = [
  {
    storyId: 'oppenheimer',
    eyebrow: '과학자의 몰락',
    title: '원자폭탄의 아버지는 왜 미국의 적이 됐나',
    description: '전쟁 영웅을 버린 냉전의 정치',
    icon: pathOppenheimer,
  },
  {
    storyId: 'prohibition',
    eyebrow: '금지의 역설',
    title: '금주법은 어떻게\n마피아를 키웠나',
    description: '도덕을 위한 법이\n범죄 제국을 낳았다',
    icon: pathProhibition,
  },
  {
    storyId: 'ibangik',
    eyebrow: '왕가의 욕망',
    title: '제주에서 중국까지?',
    description: '표류한 이방익의 대륙 횡단',
    icon: pathIbangik,
  },
]

export const RECOMMENDATION_LABEL = '현재 추천 · 믿기 어려운 실록'

/** 지금 화제에서 발견한 역사 — 의도된 가로 스크롤 */
export const TRENDS = [
  { storyId: 'odysseus', title: '트로이 전쟁은 끝났는데,\n오디세우스는 왜\n10년 동안 돌아오지 못했을까?', image: trendTroy },
  { storyId: 'surrender-document', title: '광복은 8월 15일인데,\n항복문서는 왜 9월 9일에\n쓰였을까?', image: trendLiberation },
  { storyId: 'palace-summer', title: '수문장 교대식도 멈춘 폭염,\n조선의 궁궐은 여름을\n어떻게 버텼을까?', image: trendPalace },
]

/**
 * 오늘의 역사 논쟁 (VS)
 * TODO: 결정 필요 — 투표 결과 화면 디자인이 없다. [제안] 고른 쪽 강조 + 비율 텍스트.
 * 비율은 시연용 고정값(baseVotes)에 내 표를 더해 계산한다.
 */
export const TODAY_DEBATE = {
  id: 'king-rejects-resignation',
  eyebrow: '오늘의 역사 논쟁',
  question: { lead: '왕이 사직서를 반려했다.', yes: '다시 낼까,', no: '왕명을 따를까?' },
  choices: [
    { id: 'obey', bubble: '왕명은 따라야지', tone: 'blue', image: debateObey, label: '왕의 명을\n따른다', baseVotes: 412 },
    { id: 'resign', bubble: '퇴사하게 해주세요..', tone: 'yellow', image: debateResign, label: '다시 사직을\n청한다', baseVotes: 588 },
  ],
} as const

export type DebateChoiceId = (typeof TODAY_DEBATE.choices)[number]['id']

/** 사실일까, 해석일까? — 흔한 통념 목록. TODO(4단계): 각 항목의 설명 화면 연결 */
export const FACT_OR_INTERPRETATION = [
  { id: 'troy', category: '고대 전쟁', claim: '트로이 전쟁은 실제로 일어난 전쟁이다', icon: factTroy },
  { id: 'goryeojang', category: '고려 풍습', claim: '고려에는 ‘고려장’ 풍습이 있었다', icon: factGoryeojang },
  { id: 'hangul', category: '조선 문자', claim: '세종이 한글을 혼자 만들었다', icon: factHangul },
  { id: 'turtleship', category: '임진왜란', claim: '거북선은 철갑선이었다', icon: factTurtleship },
]
