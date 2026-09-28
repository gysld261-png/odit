import { DEMO_CONFIG, isPersonaId } from '../config/demo'
import { INTEREST_IDS, type Account, type PersonaId, type PersonaRecord } from '../types/demo'

/**
 * 시연 상태 저장소. localStorage는 이 파일에서만 읽고 쓴다.
 * - 키: `odit:demo:v1:A`, `odit:demo:v1:B` (퍼소나별 격리), `odit:demo:v1:persona` (마지막으로 고른 퍼소나)
 * - 초기화는 `odit:demo:v1:*` 키만 지운다. localStorage.clear()는 쓰지 않는다.
 * - 저장소를 못 쓰거나(사파리 비공개 모드 등) 데이터가 깨져 있어도 예외를 밖으로 던지지 않고 null을 돌려준다.
 *   → 호출하는 쪽은 seed로 복구하면 된다. 흰 화면으로 멈추지 않게 하기 위해서다.
 */
const PREFIX = `${DEMO_CONFIG.storagePrefix}:v${DEMO_CONFIG.storageVersion}:`
const ACTIVE_PERSONA_KEY = `${PREFIX}persona`
const recordKey = (id: PersonaId) => `${PREFIX}${id}`

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // 저장 실패(용량 초과·권한 없음)는 무시한다. 시연은 메모리 상태로 계속된다.
  }
}

function remove(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // 무시
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isAccount(value: unknown): value is Account {
  return (
    isObject(value) &&
    typeof value.id === 'string' &&
    typeof value.nickname === 'string' &&
    typeof value.email === 'string' &&
    Array.isArray(value.interests) &&
    value.interests.every((item) => (INTEREST_IDS as readonly unknown[]).includes(item)) &&
    typeof value.profileCompleted === 'boolean'
  )
}

function isPersonaRecord(value: unknown): value is PersonaRecord {
  return (
    isObject(value) &&
    value.version === 1 &&
    typeof value.signedIn === 'boolean' &&
    (value.account === null || isAccount(value.account))
  )
}

export const demoStorage = {
  loadActivePersona(): PersonaId | null {
    const value = read(ACTIVE_PERSONA_KEY)
    return isPersonaId(value) ? value : null
  },

  saveActivePersona(id: PersonaId | null): void {
    if (id === null) remove(ACTIVE_PERSONA_KEY)
    else write(ACTIVE_PERSONA_KEY, id)
  },

  loadRecord(id: PersonaId): PersonaRecord | null {
    const raw = read(recordKey(id))
    if (raw === null) return null
    try {
      const parsed: unknown = JSON.parse(raw)
      return isPersonaRecord(parsed) ? parsed : null
    } catch {
      return null
    }
  },

  saveRecord(id: PersonaId, record: PersonaRecord): void {
    write(recordKey(id), JSON.stringify(record))
  },

  removeRecord(id: PersonaId): void {
    remove(recordKey(id))
  },
}
