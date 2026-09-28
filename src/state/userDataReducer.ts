import type { PersonaProgress } from '../types/demo'

export type UserDataAction =
  /** 연결 선택 화면에 도착 = 이야기를 다 읽음 → 역사 지도에 기록 */
  | { type: 'story/read'; storyId: string; mapLabel: string }
  | { type: 'story/toggleSave'; storyId: string }
  | { type: 'debate/vote'; debateId: string; choiceId: string }

/**
 * 퍼소나별 개인 기록의 변경 규칙. 같은 동작을 여러 번 해도 결과가 같게(idempotent) 만든다.
 * → 연결 선택 화면을 새로고침하거나 다시 들어와도 지도 노드가 중복으로 쌓이지 않는다.
 */
export function userDataReducer(state: PersonaProgress, action: UserDataAction): PersonaProgress {
  switch (action.type) {
    case 'story/read': {
      if (state.readStoryIds.includes(action.storyId)) return state
      const isFirst = state.readStoryIds.length === 0
      return {
        ...state,
        readStoryIds: [...state.readStoryIds, action.storyId],
        weeklyNodes: state.weeklyNodes.includes(action.mapLabel) ? state.weeklyNodes : [...state.weeklyNodes, action.mapLabel],
        // 첫 이야기는 점 하나라 연결이 없다. 두 번째부터 이전 기록과 이어진다.
        weeklyConnectionCount: isFirst ? state.weeklyConnectionCount : state.weeklyConnectionCount + 1,
      }
    }
    case 'story/toggleSave': {
      const saved = state.savedStoryIds.includes(action.storyId)
      return {
        ...state,
        savedStoryIds: saved
          ? state.savedStoryIds.filter((id) => id !== action.storyId)
          : [action.storyId, ...state.savedStoryIds],
      }
    }
    case 'debate/vote': {
      if (state.votes[action.debateId] === action.choiceId) return state
      return { ...state, votes: { ...state.votes, [action.debateId]: action.choiceId } }
    }
  }
}
