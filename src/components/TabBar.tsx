import './TabBar.css'

interface Props {
  activeTab: 'all' | 'sub'
  subCount: number
  viewer: 'grid' | 'list'
  onTabChange: (tab: 'all' | 'sub') => void
  onViewerChange: (viewer: 'grid' | 'list') => void
}

export default function TabBar({ activeTab, subCount, viewer, onTabChange, onViewerChange }: Props) {
  return (
    <div className="tabbar" role="tablist">
      <div className="tabbar-tabs">
        <button
          role="tab"
          aria-selected={activeTab === 'all'}
          className={`tabbar-tab ${activeTab === 'all' ? 'tabbar-tab--active' : ''}`}
          onClick={() => onTabChange('all')}
        >
          전체 언론사
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'sub'}
          className={`tabbar-tab ${activeTab === 'sub' ? 'tabbar-tab--active' : ''}`}
          onClick={() => onTabChange('sub')}
        >
          내가 구독한 언론사
          <span className="tabbar-badge" aria-label={`구독 중인 언론사 ${subCount}곳`}>
            {subCount}
          </span>
        </button>
      </div>

      <div className="tabbar-toggle">
        <button
          className={`toggle-btn ${viewer === 'list' ? 'toggle-btn--active' : ''}`}
          onClick={() => onViewerChange('list')}
          aria-label="리스트 보기"
          title="리스트 보기"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="5" cy="7"  r="1.2" fill="currentColor" />
            <circle cx="5" cy="12" r="1.2" fill="currentColor" />
            <circle cx="5" cy="17" r="1.2" fill="currentColor" />
            <line x1="9" y1="7"  x2="21" y2="7"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="9" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="9" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className={`toggle-btn ${viewer === 'grid' ? 'toggle-btn--active' : ''}`}
          onClick={() => onViewerChange('grid')}
          aria-label="그리드 보기"
          title="그리드 보기"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            {[3, 9.5, 16].map(x => [3, 9.5, 16].map(y => (
              <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" rx="0.5" fill="currentColor" />
            )))}
          </svg>
        </button>
      </div>
    </div>
  )
}
