import { useCallback } from 'react'
import { userDataReducer, type UserDataAction } from '../state/userDataReducer'
import type { PersonaProgress } from '../types/demo'
import { useDemo } from './useDemo'

const EMPTY_PROGRESS: PersonaProgress = {
  historyType: null,
  weeklyConnectionCount: 0,
  weeklyNodes: [],
  readStoryIds: [],
  savedStoryIds: [],
  votes: {},
}

/** 현재 퍼소나의 개인 기록과 변경 함수. 저장은 DemoProvider가 퍼소나별 키로 한다. */
export function useUserData() {
  const { record, updateRecord } = useDemo()
  const progress = record?.progress ?? EMPTY_PROGRESS

  const dispatch = useCallback(
    (action: UserDataAction) => {
      updateRecord((prev) => {
        const next = userDataReducer(prev.progress, action)
        return next === prev.progress ? prev : { ...prev, progress: next }
      })
    },
    [updateRecord],
  )

  return { progress, dispatch }
}
