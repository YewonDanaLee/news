import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import type { CategoryKey } from './types'
import { CATEGORIES } from './types'
import { presses, INITIAL_SUBSCRIBED } from './data/presses'
import { tickerLane1, tickerLane2 } from './data/ticker'
import { getArticle } from './data/articles'
import Header from './components/Header'
import Ticker from './components/Ticker'
import TabBar from './components/TabBar'
import PressGrid, { PAGE_SIZE } from './components/PressGrid'
import PressOpen from './components/PressOpen'
import FieldTab from './components/FieldTab'
import Chevron from './components/Chevron'
import './App.css'

const pressesByCategory = CATEGORIES.reduce<Record<string, typeof presses>>((acc, cat) => {
  acc[cat] = presses.filter(p => p.category === cat)
  return acc
}, {})

export default function App() {
  const [tab, setTab] = useState<'all' | 'sub'>('all')
  const [page, setPage] = useState(0)
  const [viewer, setViewer] = useState<'grid' | 'list'>('grid')
  const [opened, setOpened] = useState(presses[0].id)
  const [tabKey, setTabKey] = useState<CategoryKey>(presses[0].category)
  const [currentInTab, setCurrentInTab] = useState(1)
  const [progress, setProgress] = useState(0)
  const [subscribed, setSubscribed] = useState<Set<string>>(INITIAL_SUBSCRIBED)

  const openedPress = presses.find(p => p.id === opened) ?? presses[0]
  const article = getArticle(opened, tabKey)
  const catPresses = pressesByCategory[tabKey] ?? []
  const countInTab = catPresses.length

  // Grid items
  const gridItems = useMemo(() => {
    if (tab === 'all') return presses
    return presses.filter(p => subscribed.has(p.id))
  }, [tab, subscribed])

  const pageItems = gridItems.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const lastPage = Math.max(0, Math.ceil(gridItems.length / PAGE_SIZE) - 1)

  // Advance to next press in list view
  const advancePress = useCallback(() => {
    const cat = tabKey
    const catList = pressesByCategory[cat] ?? []
    const nextIdx = currentInTab // 0-based
    if (nextIdx < catList.length) {
      setOpened(catList[nextIdx].id)
      setCurrentInTab(nextIdx + 1)
    } else {
      const catIdx = CATEGORIES.indexOf(cat)
      const nextCat = CATEGORIES[(catIdx + 1) % CATEGORIES.length]
      const nextList = pressesByCategory[nextCat] ?? []
      if (nextList.length > 0) {
        setTabKey(nextCat)
        setCurrentInTab(1)
        setOpened(nextList[0].id)
      }
    }
    setProgress(0)
  }, [tabKey, currentInTab])

  const advanceRef = useRef(advancePress)
  useEffect(() => { advanceRef.current = advancePress }, [advancePress])

  // Timer for list view
  useEffect(() => {
    if (viewer !== 'list') return
    let elapsed = 0
    const id = setInterval(() => {
      elapsed += 100
      const p = elapsed / 6000
      if (p >= 1) {
        elapsed = 0
        advanceRef.current()
      } else {
        setProgress(p)
      }
    }, 100)
    return () => clearInterval(id)
  }, [viewer, opened])

  const openPress = useCallback((pressId: string) => {
    const press = presses.find(p => p.id === pressId)
    if (!press) return
    const cat = press.category
    const catList = pressesByCategory[cat] ?? []
    const idx = catList.findIndex(p => p.id === pressId)
    setOpened(pressId)
    setTabKey(cat)
    setCurrentInTab(idx + 1)
    setProgress(0)
    setViewer('list')
  }, [])

  const handleTabClick = useCallback((cat: CategoryKey) => {
    const catList = pressesByCategory[cat] ?? []
    if (catList.length === 0) return
    setTabKey(cat)
    setCurrentInTab(1)
    setOpened(catList[0].id)
    setProgress(0)
  }, [])

  const handleTabChange = (t: 'all' | 'sub') => {
    setTab(t)
    setPage(0)
  }

  const handleViewerChange = (v: 'grid' | 'list') => {
    setViewer(v)
    if (v === 'list') {
      const firstCat = CATEGORIES[0]
      const firstPress = pressesByCategory[firstCat][0]
      if (firstPress) {
        setOpened(firstPress.id)
        setTabKey(firstCat)
        setCurrentInTab(1)
        setProgress(0)
      }
    }
  }

  const toggleSubscribe = useCallback((id: string) => {
    setSubscribed(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <div className="ns-root">
      <div className="ns-canvas">
        <Header />

        <div className="ns-ticker-row">
          <Ticker lane1={tickerLane1} lane2={tickerLane2} />
        </div>

        <div className="ns-tabbar-row">
          <TabBar
            activeTab={tab}
            subCount={subscribed.size}
            viewer={viewer}
            onTabChange={handleTabChange}
            onViewerChange={handleViewerChange}
          />
        </div>

        <div className="ns-content-row">
          <Chevron
            dir="left"
            disabled={viewer === 'list' || page === 0}
            onClick={() => setPage(p => Math.max(0, p - 1))}
          />

          {viewer === 'list' ? (
            <div className="ns-list-view">
              <FieldTab
                activeTab={tabKey}
                currentInTab={currentInTab}
                countInTab={countInTab}
                progress={progress}
                onTabClick={handleTabClick}
              />
              <PressOpen
                press={openedPress}
                article={article}
                subscribed={subscribed.has(opened)}
                onSubscribeToggle={toggleSubscribe}
              />
            </div>
          ) : (
            <PressGrid
              items={pageItems}
              subscribedIds={subscribed}
              activeTab={tab}
              onSubscribeToggle={toggleSubscribe}
              onOpen={openPress}
            />
          )}

          <Chevron
            dir="right"
            disabled={viewer === 'list' || page >= lastPage}
            onClick={() => setPage(p => Math.min(lastPage, p + 1))}
          />
        </div>
      </div>
    </div>
  )
}
