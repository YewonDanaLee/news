import { useState } from 'react'
import type { Press } from '../types'
import PressWordmark from './PressWordmark'
import SubscribePill from './SubscribePill'
import './GridCell.css'

interface Props {
  press: Press
  subscribed: boolean
  activeTab: 'all' | 'sub'
  onSubscribeToggle: (id: string) => void
  onOpen: (id: string) => void
}

export default function GridCell({ press, subscribed, activeTab, onSubscribeToggle, onOpen }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`grid-cell ${hovered ? 'grid-cell--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => onOpen(press.id)}
      tabIndex={0}
      role="button"
      aria-label={`${press.name} 기사 보기`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(press.id) }}
    >
      {hovered ? (
        <SubscribePill
          subscribed={activeTab === 'sub' ? true : subscribed}
          onToggle={() => onSubscribeToggle(press.id)}
        />
      ) : (
        <PressWordmark press={press} />
      )}
    </div>
  )
}
