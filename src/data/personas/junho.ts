import type { PersonaMeta, PersonaRecord } from '../../types/demo'

/** 퍼소나 A — 이준호 (맥락 탐색형, 신규 가입 경로) */
export const junhoMeta: PersonaMeta = {
  id: 'A',
  name: '이준호',
  kind: 'new',
  kindLabel: '신규 사용자',
  tagline: '드라마에서 본 역사가 궁금해 직접 찾아보는 사람',
  demoEmail: 'junho@odit.app',
}

/**
 * TODO: 결정 필요 — Figma 가입 화면에 닉네임 입력란이 없다.
 * [제안] 데모 기본값 "준호"를 쓴다. 닉네임 입력 단계를 새로 만들지 않는다.
 */
export const JUNHO_DEFAULT_NICKNAME = '준호'

/** 가입 전 상태에서 시작한다. 개인 기록(지도·보관함·배지)도 비어 있다. */
export const junhoInitialRecord: PersonaRecord = {
  version: 1,
  account: null,
  signedIn: false,
}
