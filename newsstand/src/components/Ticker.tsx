import { useState, useEffect, useRef } from 'react'
import type { TickerItem } from '../types'
import './Ticker.css'

interface LaneProps {
  items: TickerItem[]
  offset?: number
}

function TickerLane({ items, offset = 0 }: LaneProps) {
  const [index, setIndex] = useState(offset % items.length)
  const [fading, setFading] = useState(false)
  const paused = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused.current) return
      setFading(true)
      setTimeout(() => {
        setIndex(i => (i + 1) % items.length)
        setFading(false)
      }, 550)
    }, 3200)
    return () => clearInterval(interval)
  }, [items.length])

  const item = items[index]

  return (
    <div
      className={`ticker-lane ${fading ? 'ticker-fading' : ''}`}
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
    >
      <span className="ticker-press">{item.press}</span>
      <span className="ticker-headline">{item.headline}</span>
    </div>
  )
}

interface Props {
  lane1: TickerItem[]
  lane2: TickerItem[]
}

export default function Ticker({ lane1, lane2 }: Props) {
  return (
    <div className="ticker">
      <TickerLane items={lane1} offset={0} />
      <TickerLane items={lane2} offset={2} />
    </div>
  )
}
