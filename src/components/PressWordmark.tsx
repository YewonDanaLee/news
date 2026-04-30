import type { Press } from '../types'
import './PressWordmark.css'

interface Props {
  press: Press
  scale?: number
}

export default function PressWordmark({ press, scale = 1 }: Props) {
  const {
    name, color, bg, weight = 500, family = 'sans',
    italic, tracking, accent, accentChars, underlineChars, flag, small,
  } = press

  const fontSize = small ? 14 : 16

  const containerStyle: React.CSSProperties = {
    fontFamily: family === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)',
    fontWeight: weight,
    fontStyle: italic ? 'italic' : undefined,
    letterSpacing: tracking ?? (family === 'sans' ? '-0.01em' : undefined),
    fontSize: fontSize * scale,
    lineHeight: 1.15,
  }

  const needsCharMap = (accentChars && accentChars.length > 0) || (underlineChars && underlineChars.length > 0)

  const renderText = () => {
    if (!needsCharMap) return <>{name}{flag && <span className="press-flag">▶</span>}</>
    const chars = [...name]
    return (
      <>
        {chars.map((ch, i) => {
          const isAccent = accentChars?.includes(i)
          const isUnder = underlineChars?.includes(i)
          return (
            <span
              key={i}
              style={{
                color: isAccent || isUnder ? (accent ?? 'var(--ink)') : undefined,
                textDecoration: isUnder ? 'underline' : undefined,
              }}
            >
              {ch}
            </span>
          )
        })}
        {flag && <span className="press-flag">▶</span>}
      </>
    )
  }

  if (bg) {
    return (
      <span className="press-wordmark press-chip" style={{ ...containerStyle, background: bg, color: color ?? 'var(--ink)', borderRadius: 2 }}>
        {name}
      </span>
    )
  }

  return (
    <span className="press-wordmark" style={{ ...containerStyle, color: color ?? 'var(--ink)' }}>
      {renderText()}
    </span>
  )
}
