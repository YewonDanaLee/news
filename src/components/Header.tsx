import './Header.css'

function getKoreanDate(): string {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}. ${m}. ${day}. ${days[d.getDay()]}`
}

export default function Header() {
  return (
    <header className="ns-header">
      <div className="ns-header-left">
        <svg className="ns-header-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="2" y="3" width="20" height="18" rx="1" stroke="#14212B" strokeWidth="1.4" />
          <line x1="2" y1="8" x2="22" y2="8" stroke="#14212B" strokeWidth="1.4" />
          <line x1="8" y1="8" x2="8" y2="21" stroke="#14212B" strokeWidth="1.4" />
          <line x1="5" y1="11.5" x2="6.5" y2="11.5" stroke="#14212B" strokeWidth="1.2" />
          <line x1="5" y1="14" x2="6.5" y2="14" stroke="#14212B" strokeWidth="1.2" />
          <line x1="5" y1="16.5" x2="6.5" y2="16.5" stroke="#14212B" strokeWidth="1.2" />
          <line x1="10" y1="11.5" x2="20" y2="11.5" stroke="#14212B" strokeWidth="1.2" />
          <line x1="10" y1="14" x2="20" y2="14" stroke="#14212B" strokeWidth="1.2" />
          <line x1="10" y1="16.5" x2="18" y2="16.5" stroke="#14212B" strokeWidth="1.2" />
        </svg>
        <span className="ns-header-title">뉴스스탠드</span>
      </div>
      <span className="ns-header-date">{getKoreanDate()}</span>
    </header>
  )
}
