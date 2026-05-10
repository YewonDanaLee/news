import type { Press } from '../types'
import type { ArticleData } from '../types'
import PressWordmark from './PressWordmark'
import SubscribePill from './SubscribePill'
import './PressOpen.css'

interface Props {
  press: Press
  article: ArticleData
  subscribed: boolean
  onSubscribeToggle: (id: string) => void
}

export default function PressOpen({ press, article, subscribed, onSubscribeToggle }: Props) {
  return (
    <div className="press-open">
      <div className="press-open-head">
        <PressWordmark press={press} scale={1.05} />
        <span className="press-open-time">{article.editTime}</span>
        <SubscribePill subscribed={subscribed} onToggle={() => onSubscribeToggle(press.id)} />
      </div>

      <div className="press-open-body">
        <div className="press-open-left">
          <div className="press-open-image">
            <span className="press-open-image-label">headline image</span>
          </div>
          <p className="press-open-headline">{article.headline}</p>
        </div>

        <div className="press-open-right">
          <ul className="press-open-list">
            {article.items.map((item, i) => (
              <li key={i} className="press-open-list-item">
                <span className="press-open-bullet" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="press-open-footnote">{press.name} 언론사에서 직접 편집한 뉴스입니다.</p>
        </div>
      </div>
    </div>
  )
}
