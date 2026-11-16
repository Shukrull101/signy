import type { Post } from '@/shared/api/schemas'

export const CATEGORIES = ['Все', 'Новости', 'Советы', 'Безопасность', 'Кейсы'] as const
export type Category = (typeof CATEGORIES)[number]

export interface Article { id: number; title: string; excerpt: string; text: string; category: Exclude<Category, 'Все'>; date: string }

const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1)

/** jsonplaceholder /posts → статья блога. Категория и дата детерминированы по id. */
export const toArticle = (p: Post): Article => {
  const cats = CATEGORIES.slice(1) as Exclude<Category, 'Все'>[]
  const d = new Date(Date.UTC(2026, 10, 16 - (p.id % 90)))
  return {
    id: p.id,
    title: cap(p.title),
    excerpt: cap(p.body.replace(/\n/g, ' ')).slice(0, 110) + '…',
    text: p.body,
    category: cats[p.id % cats.length] ?? 'Новости',
    date: d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  }
}
