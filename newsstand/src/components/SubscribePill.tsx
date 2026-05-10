import './SubscribePill.css'

interface Props {
  subscribed: boolean
  onToggle: () => void
}

export default function SubscribePill({ subscribed, onToggle }: Props) {
  return (
    <button
      className="subscribe-pill"
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      aria-label={subscribed ? '구독 해지하기' : '구독하기'}
    >
      <svg className="pill-icon" viewBox="0 0 10 10" fill="none" aria-hidden>
        {subscribed
          ? <line x1="2" y1="5" x2="8" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          : <>
              <line x1="5" y1="2" x2="5" y2="8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="2" y1="5" x2="8" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </>
        }
      </svg>
      {subscribed ? '해지하기' : '구독하기'}
    </button>
  )
}
