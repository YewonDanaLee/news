import type { Press } from '../types'
import GridCell from './GridCell'
import './PressGrid.css'

interface Props {
  items: Press[]
  subscribedIds: Set<string>
  activeTab: 'all' | 'sub'
  onSubscribeToggle: (id: string) => void
  onOpen: (id: string) => void
}

const COLS = 6
const ROWS = 4
const PAGE_SIZE = COLS * ROWS // 24

export default function PressGrid({ items, subscribedIds, activeTab, onSubscribeToggle, onOpen }: Props) {
  const cells = Array.from({ length: PAGE_SIZE }, (_, i) => items[i] ?? null)

  return (
    <div className="press-grid">
      {cells.map((press, i) =>
        press ? (
          <GridCell
            key={press.id}
            press={press}
            subscribed={subscribedIds.has(press.id)}
            activeTab={activeTab}
            onSubscribeToggle={onSubscribeToggle}
            onOpen={onOpen}
          />
        ) : (
          <div key={`empty-${i}`} className="grid-cell-empty" />
        )
      )}
    </div>
  )
}

export { PAGE_SIZE }
