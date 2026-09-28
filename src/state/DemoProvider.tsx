import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEMO_CONFIG } from '../config/demo'
import { PERSONAS, createInitialRecord } from '../data/personas'
import { demoStorage } from '../services/demoStorage'
import type { PersonaId, PersonaRecord } from '../types/demo'
import { DemoContext, type DemoContextValue, type StartMode } from './contexts'

interface DemoState {
  personaId: PersonaId | null
  record: PersonaRecord | null
}

/**
 * 첫 렌더 전에 저장소를 동기로 읽는다.
 * 비동기로 복원하면 첫 화면에서 가드가 "비로그인"으로 판단해 로그인 화면이 번쩍이거나,
 * 초기값이 저장소를 덮어쓰는 문제가 생긴다.
 */
function restore(): DemoState {
  const personaId = demoStorage.loadActivePersona()
  if (personaId === null) return { personaId: null, record: null }
  return { personaId, record: demoStorage.loadRecord(personaId) ?? createInitialRecord(personaId) }
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(restore)

  // 변경된 상태를 퍼소나별 키에 저장한다. 다른 퍼소나의 키는 건드리지 않는다.
  useEffect(() => {
    demoStorage.saveActivePersona(state.personaId)
    if (state.personaId !== null && state.record !== null) {
      demoStorage.saveRecord(state.personaId, state.record)
    }
  }, [state])

  const startPersona = useCallback(
    (id: PersonaId, mode: StartMode = 'continue') => {
      // 같은 퍼소나를 다시 고르면 메모리의 최신 상태를, 다른 퍼소나면 그 퍼소나의 저장본을 쓴다.
      let record =
        id === state.personaId && state.record !== null
          ? state.record
          : (demoStorage.loadRecord(id) ?? createInitialRecord(id))

      if (mode === 'fromSplash') {
        // A는 가입 흐름 자체가 시연 대상이라 처음부터 = 가입 전 상태.
        // B는 쌓인 기록은 두고 로그아웃 상태에서 로그인부터 다시 보여준다.
        record = PERSONAS[id].kind === 'new' ? createInitialRecord(id) : { ...record, signedIn: false }
      }

      setState({ personaId: id, record })
      return record
    },
    [state],
  )

  const resetPersona = useCallback((id: PersonaId) => {
    demoStorage.removeRecord(id)
    const record = createInitialRecord(id)
    setState((prev) => (prev.personaId === id ? { personaId: id, record } : prev))
    return record
  }, [])

  const updateRecord = useCallback((updater: (record: PersonaRecord) => PersonaRecord) => {
    setState((prev) => (prev.record === null ? prev : { ...prev, record: updater(prev.record) }))
  }, [])

  const value = useMemo<DemoContextValue>(
    () => ({
      personaId: state.personaId,
      record: state.record,
      personas: DEMO_CONFIG.personaIds.map((id) => PERSONAS[id]),
      startPersona,
      resetPersona,
      updateRecord,
    }),
    [state, startPersona, resetPersona, updateRecord],
  )

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}
