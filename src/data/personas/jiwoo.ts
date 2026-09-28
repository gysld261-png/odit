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
}
