import { Link } from 'react-router'
import connectionPath from '../../assets/home/weekly-connection-path.svg'
import emptyNode from '../../assets/home/empty-node.png'
import nodeDotVisited from '../../assets/home/node-dot-visited.svg'
import nodeDot from '../../assets/home/node-dot.svg'
import pathHint from '../../assets/home/path-hint.svg'
import { SectionTitle } from '../../components/common/SectionTitle'
import { paths } from '../../routes/paths'
import styles from './HomePage.module.css'

/** Figma MapPanel(354×148) 안 노드 5칸의 중심 x·노드 top — 좁은 화면에서도 같은 비율로 둔다 */
const PANEL_WIDTH = 354
const SLOTS = [
  { x: 33.5, top: 65 },
  { x: 102.5, top: 25 },
  { x: 171.5, top: 65 },
  { x: 240.5, top: 25 },
  { x: 309.5, top: 57 },
]
const PATH_LEFT = 19
const PATH_WIDTH = 302
/** 앞의 두 노드는 이번 주 새로 찾은 연결(노랑), 나머지는 이전 기록(파랑) — Figma 기준 */
const HIGHLIGHT_COUNT = 2

const pct = (px: number) => `${(px / PANEL_WIDTH) * 100}%`

interface WeeklyConnectionsProps {
  nickname: string
  nodes: string[]
}

/** 이번 주 발견한 연결 — 기록이 없으면 빈 상태 (Figma /home 신규 유저 EmptyState) */
export function WeeklyConnections({ nickname, nodes }: WeeklyConnectionsProps) {
  const shown = nodes.slice(0, SLOTS.length)
  const lastX = shown.length > 0 ? SLOTS[shown.length - 1].x : PATH_LEFT
  const pathVisible = lastX - PATH_LEFT

  return (
    <section className={styles.weeklySection} aria-labelledby="weekly-title">
      <SectionTitle
        eyebrow={
          <>
            <strong>{nickname}</strong>님의 탐색 기록
          </>
        }
        title="이번 주 발견한 연결"
        desc="읽은 개수보다 서로 이어진 관계를 남겨요."
      />

      <div className={styles.mapPanel}>
        {shown.length === 0 ? (
          <div className={styles.mapEmpty}>
            <span className={styles.mapEmptyArt} aria-hidden="true">
              <img src={pathHint} alt="" width={62.5} height={2.5} />
              <img src={emptyNode} alt="" width={22} height={22} />
              <img src={pathHint} alt="" width={62.5} height={2.5} />
            </span>
            <p className="body-base-1l">아직 발견한 연결이 없어요</p>
            <p className={`${styles.mapEmptyDesc} ui-meta-1l`}>첫 이야기를 읽으면 여기에 연결이 쌓여요</p>
          </div>
        ) : (
          <>
            {/* 읽은 노드까지만 연결선을 보여준다 */}
            <span
              className={styles.mapPathClip}
              style={{ left: pct(PATH_LEFT), width: pct(pathVisible) }}
              aria-hidden="true"
            >
              <img
                src={connectionPath}
                alt=""
                width={302}
                height={76}
                style={{ width: `${(PATH_WIDTH / Math.max(pathVisible, 1)) * 100}%` }}
              />
            </span>
            <ul className={styles.mapNodes} aria-label="이번 주 연결 노드">
              {shown.map((label, index) => (
                <li
                  key={label}
                  className={styles.mapNode}
                  style={{ left: `calc(${pct(SLOTS[index].x)} - 34.5px)`, top: SLOTS[index].top }}
                >
                  <span className={styles.mapDot} aria-hidden="true">
                    {index < HIGHLIGHT_COUNT ? (
                      <img className={styles.mapDotVisited} src={nodeDotVisited} alt="" width={36} height={36} />
                    ) : (
                      <img src={nodeDot} alt="" width={22} height={22} />
                    )}
                  </span>
                  <span className={styles.mapLabel}>{label}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {shown.length > 0 && (
        <Link to={paths.map} className={`${styles.mapCta} body-small-strong-1l`}>
          오딧맵에서 전체 보기 →
        </Link>
      )}
    </section>
  )
}
