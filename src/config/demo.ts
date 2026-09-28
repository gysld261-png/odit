import type { PersonaId } from '../types/demo'

export const DEMO_CONFIG = {
  /** 저장 데이터 형태가 바뀌면 올린다. 이전 버전 키는 읽지 않는다. */
  storageVersion: 1,
  storagePrefix: 'odit:demo',
  personaIds: ['A', 'B'] as const satisfies readonly PersonaId[],
} as const

export function isPersonaId(value: unknown): value is PersonaId {
  return value === 'A' || value === 'B'
}
