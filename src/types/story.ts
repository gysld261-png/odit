/** 이야기 분류 (탐색 바로가기: 인물·사건·장소·시대) */
export type StoryCategory = 'person' | 'event' | 'place' | 'era'

/** 상세 상단 칩 색 — Figma는 로고 글자색 계열(갈색·초록·주황)을 돌려 쓴다 */
export type TagTone = 'brown' | 'green' | 'orange'

export interface StoryTag {
  label: string
  tone: TagTone
}

export interface StoryTerm {
  term: string
  definition: string
}

/** 연결 선택 화면의 '이어지는 이야기' 한 줄 */
export interface StoryConnection {
  storyId: string
  /** 원형 배지 글자 (장소·사건·논쟁·인물 등) */
  type: string
  title: string
  description: string
}

export interface Story {
  id: string
  /** 질문형 제목. 줄바꿈 위치는 \n으로 Figma와 맞춘다 */
  title: string
  category: StoryCategory
  tags: StoryTag[]
  /** 지역 · 시대 · 읽기 시간 */
  region: string
  era: string
  readMinutes: number
  /** 역사 지도에 남는 짧은 이름 (2~4자) */
  mapLabel: string
  /** 연결 선택 화면 "○○의 이야기가 역사 지도에 기록됐어요!"의 주어 */
  subject: string
  heroImage?: { src: string; alt: string }
  summary: string
  /** 한 줄 정리 '상세보기'를 펼치면 보이는 설명 */
  summaryDetail: string
  visual?: { src: string; alt: string; caption: string }
  /** 확인된 기록 */
  fact: string
  terms: StoryTerm[]
  sources: string[]
  /** 상세 하단 '다음 이야기' 카드 */
  next?: { storyId: string; title: string; description: string }
  /** 연결 선택 화면 머리글 */
  connectionIntro: { title: string; description: string }
  connections: StoryConnection[]
  /**
   * 사실 검수 여부. 오딧은 "재미있어 보이되 사실성을 훼손하지 않는다"가 원칙이라
   * 발표 전에 사람이 검수하기 전까지 false로 둔다. (TODO: 콘텐츠 사실 검수)
   */
  verified: boolean
}
