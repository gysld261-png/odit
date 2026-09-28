import type { PersonaId, PersonaMeta, PersonaRecord } from '../../types/demo'
import { jiwooInitialRecord, jiwooMeta } from './jiwoo'
import { junhoInitialRecord, junhoMeta } from './junho'

export const PERSONAS: Record<PersonaId, PersonaMeta> = {
  A: junhoMeta,
  B: jiwooMeta,
}

const INITIAL_RECORDS: Record<PersonaId, PersonaRecord> = {
  A: junhoInitialRecord,
  B: jiwooInitialRecord,
}

/** seed를 직접 고치지 않도록 항상 복사본을 돌려준다. */
export function createInitialRecord(id: PersonaId): PersonaRecord {
  return structuredClone(INITIAL_RECORDS[id])
}
