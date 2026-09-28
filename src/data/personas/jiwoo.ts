import type { PersonaMeta, PersonaRecord } from '../../types/demo'

/** 퍼소나 B — 김지우 (발견형, 기존 사용자) */
export const jiwooMeta: PersonaMeta = {
  id: 'B',
  name: '김지우',
  kind: 'existing',
  kindLabel: '기존 사용자',
  tagline: '추천 피드에서 흥미로운 질문을 따라가는 사람',
  demoEmail: 'jiwoo@odit.app',
  defaultNickname: '지우',
}

/**
 * 가입과 초기 설정을 마친 로그인 상태로 시작한다.
 * 지도·보관함·배지 같은 개인 기록은 4단계에서 이 파일에 추가한다.
 */
export const jiwooInitialRecord: PersonaRecord = {
  version: 1,
  account: {
    id: 'user-jiwoo',
    nickname: '지우',
    email: 'jiwoo@odit.app',
    // TODO: 결정 필요 — 프로필 표기는 "왕과 권력 외 2개". 나머지 2개는 미정이라 확정된 1개만 넣는다.
    interests: ['power'],
    profileCompleted: true,
  },
  signedIn: true,
  progress: {
    historyType: '시대 프로파일러',
    // Figma 홈: "6개의 연결고리를 발견했어요!" · 연결 지도 노드 5개(영화·신화·항해·도시·정치)
    weeklyConnectionCount: 6,
    weeklyNodes: ['영화', '신화', '항해', '도시', '정치'],
    // TODO(4단계): 지도 노드 12개·저장 12개·나중에 보기 3개를 실제 이야기 id로 채워 프로필 수치와 맞춘다
    readStoryIds: [],
    savedStoryIds: [],
    votes: {},
  },
}
