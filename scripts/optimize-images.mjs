/**
 * Figma에서 받은 원본 이미지(design-src/)를 앱에서 쓰는 WebP(src/assets/)로 변환한다.
 * 원본은 번들에 들어가지 않는다. 표시 크기의 2배로 줄여서 저장한다 (구현요청서: 사진·일러스트는 WebP 2x).
 *
 *   npm run images
 */
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import sharp from 'sharp'

const jobs = [
  // 관심사 3D 아이콘: 카드 안 80px 박스에서 약 95px로 그려진다 → 192px
  ...['daily-life', 'relationships', 'food-trends', 'work-money', 'power', 'world-stories'].map((name) => ({
    from: `design-src/interests/${name}.png`,
    to: `src/assets/interests/${name}.webp`,
    width: 192,
  })),
  // 마스코트 캐릭터 시트: 포즈 하나를 크게 잘라 쓰므로 원본 해상도를 유지한다
  { from: 'design-src/mascot-poses.png', to: 'src/assets/mascot/mascot-poses.webp', width: 1536 },

  // 홈 (Figma HomeScreen)
  { from: 'design-src/home/hero-bg.png', to: 'src/assets/home/hero-bg.webp', width: 1024 }, // 402×465 cover
  ...['oppenheimer', 'prohibition', 'ibangik'].map((name) => ({
    from: `design-src/home/path-${name}.png`,
    to: `src/assets/home/path-${name}.webp`,
    width: 128, // 61px 아이콘
  })),
  ...['troy', 'liberation', 'palace'].map((name) => ({
    from: `design-src/home/trend-${name}.png`,
    to: `src/assets/home/trend-${name}.webp`,
    width: 720, // 345×180 카드 배경
  })),
  ...['obey', 'resign'].map((name) => ({
    from: `design-src/home/debate-${name}.png`,
    to: `src/assets/home/debate-${name}.webp`,
    width: 280, // 130px 캐릭터
  })),
  ...['troy', 'goryeojang', 'hangul', 'turtleship'].map((name) => ({
    from: `design-src/home/fact-${name}.png`,
    to: `src/assets/home/fact-${name}.webp`,
    width: 108, // 54px 아이콘
  })),

  // 이야기 상세 (Figma 03_story_detail)
  { from: 'design-src/stories/oppenheimer-hero.png', to: 'src/assets/stories/oppenheimer-hero.webp', width: 820 }, // 402×240
  { from: 'design-src/stories/oppenheimer-hearing.png', to: 'src/assets/stories/oppenheimer-hearing.webp', width: 740 }, // 362×236
]

for (const job of jobs) {
  await mkdir(dirname(job.to), { recursive: true })
  const info = await sharp(job.from).resize({ width: job.width }).webp({ quality: 86, alphaQuality: 90 }).toFile(job.to)
  console.log(`${job.to}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`)
}
