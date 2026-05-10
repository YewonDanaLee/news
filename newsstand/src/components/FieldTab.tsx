import type { CategoryKey } from '../types'
import { CATEGORIES } from '../types'
import './FieldTab.css'

interface Props {
  activeTab: CategoryKey
  currentInTab: number
  countInTab: number
  progress: number
  onTabClick: (tab: CategoryKey) => void
}

export default function FieldTab({ activeTab, currentInTab, countInTab, progress, onTabClick }: Props) {
  return (
    <div className="field-tab" role="tablist">
      {CATEGORIES.map((cat) => {
        const isActive = cat === activeTab
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            className={`field-tab-item ${isActive ? 'field-tab-item--active' : ''}`}
            onClick={() => onTabClick(cat)}
          >
            {isActive && (
              <span
                className="field-tab-progress"
                style={{ width: `${progress * 100}%` }}
              />
            )}
            <span className="field-tab-label">{cat}</span>
            {isActive && (
              <span className="field-tab-counter">
                <span className="field-tab-current">{currentInTab}</span>
                <span className="field-tab-total">/{countInTab}</span>
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
