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
]

for (const job of jobs) {
  await mkdir(dirname(job.to), { recursive: true })
  const info = await sharp(job.from).resize({ width: job.width }).webp({ quality: 86, alphaQuality: 90 }).toFile(job.to)
  console.log(`${job.to}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`)
}
