import dailyLife from '../../assets/interests/daily-life.webp'
import foodTrends from '../../assets/interests/food-trends.webp'
import power from '../../assets/interests/power.webp'
import relationships from '../../assets/interests/relationships.webp'
import workMoney from '../../assets/interests/work-money.webp'
import worldStories from '../../assets/interests/world-stories.webp'
import type { InterestId } from '../../types/demo'

export interface Interest {
  id: InterestId
  label: string
  icon: string
  /** Figma icon_3d 박스(80×80) 안에서 이미지가 차지하는 위치 (%) — 아이콘마다 여백이 달라 Figma가 따로 맞춰 둔 값 */
  iconCrop: { size: number; left: number; top: number }
}

/** 온보딩 3 관심사 선택 (Figma 07_onboarding_interest) */
export const INTERESTS: Interest[] = [
  { id: 'daily-life', label: '사람들의 일상', icon: dailyLife, iconCrop: { size: 118.37, left: -8.63, top: -9.3 } },
  { id: 'relationships', label: '사랑과 관계', icon: relationships, iconCrop: { size: 111.46, left: -6.21, top: -6.46 } },
  { id: 'food-trends', label: '음식과 유행', icon: foodTrends, iconCrop: { size: 104.31, left: -1.33, top: -1.85 } },
  { id: 'work-money', label: '직업과 돈', icon: workMoney, iconCrop: { size: 103.7, left: -2.26, top: -1.75 } },
  { id: 'power', label: '왕과 권력', icon: power, iconCrop: { size: 109.48, left: -3.91, top: -4.7 } },
  { id: 'world-stories', label: '세계의 이야기', icon: worldStories, iconCrop: { size: 108.1, left: -3.69, top: -4.46 } },
]

export const MAX_INTERESTS = 3

export function getInterestLabel(id: InterestId): string {
  return INTERESTS.find((interest) => interest.id === id)?.label ?? id
}
