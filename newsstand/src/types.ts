export type CategoryKey = '종합/경제' | '방송/통신' | 'IT' | '스포츠/연예' | '매거진/전문지' | '지역'

export const CATEGORIES: CategoryKey[] = [
  '종합/경제', '방송/통신', 'IT', '스포츠/연예', '매거진/전문지', '지역',
]

export interface Press {
  id: string
  name: string
  category: CategoryKey
  color?: string
  bg?: string
  weight?: 400 | 500 | 700
  family?: 'sans' | 'serif'
  italic?: boolean
  tracking?: string
  accent?: string
  accentChars?: number[]
  underlineChars?: number[]
  flag?: boolean
  small?: boolean
}

export interface TickerItem {
  press: string
  headline: string
}

export interface ArticleData {
  headline: string
  editTime: string
  items: string[]
}
