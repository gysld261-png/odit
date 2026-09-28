/**
 * PC 쇼케이스(기기 목업 + 배경) 설정.
 * 배경 이미지·색·기기 크기·전환 기준은 여기서만 바꾼다.
 */
export const SHOWCASE_CONFIG = {
  /** 이 너비 이상이면 PC 쇼케이스, 미만이면 목업 없는 모바일 화면 */
  desktopMinWidth: 1024,

  /** 태블릿(768~1023px)에서 앱이 너무 넓어지지 않도록 하는 최대 너비 [제안] */
  mobileMaxAppWidth: 480,

  device: {
    name: 'iPhone 16 Pro',
    /** Figma 기준 화면 크기. 앱 레이아웃은 이 크기를 기준으로 짠다. */
    screenWidth: 402,
    screenHeight: 874,
    /** Figma 프레임에 들어 있던 StatusBar / HomeIndicator 높이. 앱 콘텐츠는 이만큼 비워 두고 시작한다. */
    statusBarHeight: 62,
    homeIndicatorHeight: 34,
    bezel: 12,
    screenRadius: 56,
    frameColor: '#2b2a27',
  },

  background: {
    color: 'var(--odit-canvas)',
    /** 상단 그라데이션 시작색 (Yellow 100 → Canvas) */
    gradientFrom: 'var(--odit-yellow-100)',
    /** 배경 이미지가 제공되면 경로를 넣는다. 미제공이라 null — 없는 이미지를 있는 것처럼 쓰지 않는다. */
    image: null as string | null,
    /** 배경 이미지 위 어둡게/밝게 덮는 정도 (0~1). 이미지가 있을 때만 쓴다. */
    overlayOpacity: 0.4,
    /** 노드·점선 브랜드 그래픽의 투명도 (0이면 숨김) */
    graphicOpacity: 0.55,
  },

  /** '화면에 맞추기'에서 목업 위아래로 남길 여백(px) */
  fitPadding: 24,
} as const

export const DEVICE_OUTER_WIDTH = SHOWCASE_CONFIG.device.screenWidth + SHOWCASE_CONFIG.device.bezel * 2
export const DEVICE_OUTER_HEIGHT = SHOWCASE_CONFIG.device.screenHeight + SHOWCASE_CONFIG.device.bezel * 2
