import { STORIES } from '../data/common/stories'
import type { Story } from '../types/story'

/**
 * 이야기 조회의 경계. 지금은 seed를 읽고, 실제 API가 생기면 이 파일만 바꾼다.
 * 화면은 이 함수들만 쓰고 STORIES를 직접 import하지 않는다.
 */
const byId = new Map(STORIES.map((story) => [story.id, story]))

export const storyService = {
  getStory(id: string): Story | null {
    return byId.get(id) ?? null
  },

  getStories(ids: string[]): Story[] {
    return ids.map((id) => byId.get(id)).filter((story): story is Story => story !== undefined)
  },
}

/** "미국 · 냉전 · 약 4분" */
export function formatStoryMeta(story: Story): string {
  return `${story.region} · ${story.era} · 약 ${story.readMinutes}분`
}
