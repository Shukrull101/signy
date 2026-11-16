import { useState } from 'react'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import { PAGE_SIZE, postsApi } from '@/shared/api/endpoints'
import { CATEGORIES, toArticle, type Article, type Category } from '@/entities/article'
import { ArticleCard } from '@/widgets/blog/ArticleCard'
import { SubscribeBlock } from '@/widgets/home/SubscribeBlock'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import { SafeHtml } from '@/shared/ui/SafeHtml'
import { cn } from '@/shared/lib/cn'

export const blogLoader = async (): Promise<{ articles: Article[] }> => ({ articles: (await postsApi.list()).map(toArticle) })

const SEO_HTML = `<h3>Электронный документооборот: что нужно знать</h3>
<p>Электронный документооборот (ЭДО) — это обмен юридически значимыми документами в цифровом виде. Подписанный квалифицированной электронной подписью файл имеет ту же силу, что и бумажный оригинал с печатью.</p>
<h3>Преимущества для бизнеса</h3>
<p>Компании экономят на печати, курьерах и хранении, ускоряют согласования и снижают риск потери документов. Все действия фиксируются в журнале, а доступ разграничивается по ролям.</p>
<h3>Безопасность</h3>
<p>Ключи подписи хранятся на защищённых носителях, соединение шифруется, а каждый документ сопровождается меткой времени.</p>`

function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (n: number) => void }) {
  if (pages <= 1) return null
  const nums = Array.from({ length: Math.min(pages, 5) }, (_, i) => Math.max(1, Math.min(page - 2, pages - 4)) + i)
  return (
    <nav aria-label="Страницы" className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm">
      {nums.map((n) => <button key={n} type="button" aria-current={n === page ? 'page' : undefined} onClick={() => onChange(n)} className={cn('h-9 w-9 rounded-full transition', n === page ? 'bg-brand text-white' : 'hover:bg-sky-soft')}>{n}</button>)}
      {page < pages && <button type="button" onClick={() => onChange(page + 1)} className="ml-2 text-xs font-semibold uppercase tracking-wider text-brand hover:underline">Далее →</button>}
    </nav>
  )
}

export function BlogPage() {
  const { articles } = useLoaderData() as Awaited<ReturnType<typeof blogLoader>>
  const [params, setParams] = useSearchParams()
  const [seoOpen, setSeoOpen] = useState(false)
  const rawCat = params.get('cat')
  const cat: Category = (CATEGORIES as readonly string[]).includes(rawCat ?? '') ? (rawCat as Category) : 'Все'
  const list = cat === 'Все' ? articles : articles.filter((a) => a.category === cat)
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
  const page = Math.min(Math.max(1, Number(params.get('page')) || 1), pages)
  const visible = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const featured = articles[0]
  const set = (c: Category, p: number) => setParams({ ...(c !== 'Все' && { cat: c }), ...(p > 1 && { page: String(p) }) })

  return (
    <>
      <div className="container-x pb-12">
        <Breadcrumbs items={[{ label: 'Блог' }]} />
        <h1 className="mb-8 mt-4 text-3xl sm:text-4xl">Интересно пишем про электронный документооборот</h1>
        {featured && <ArticleCard a={featured} large />}
        <div role="tablist" aria-label="Категории" className="mb-8 mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" role="tab" aria-selected={c === cat} onClick={() => set(c, 1)} className={cn('shrink-0 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition', c === cat ? 'bg-brand text-white' : 'bg-sky-soft hover:bg-brand/20')}>{c}</button>
          ))}
        </div>
        {visible.length === 0 ? <p className="py-10 text-center text-ink-soft">В этой категории пока нет статей.</p> : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{visible.map((a) => <ArticleCard key={a.id} a={a} />)}</div>
        )}
        <Pagination page={page} pages={pages} onChange={(n) => set(cat, n)} />
      </div>
      <SubscribeBlock />
      <section className="container-x py-12">
        <h2 className="mb-4 text-2xl">SEO текст</h2>
        <div className="relative">
          <SafeHtml html={SEO_HTML} className={cn('space-y-3 text-sm leading-relaxed text-ink-soft [&_h3]:mt-4 [&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-ink', !seoOpen && 'max-h-28 overflow-hidden')} />
          {!seoOpen && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />}
        </div>
        <button type="button" aria-expanded={seoOpen} onClick={() => setSeoOpen((v) => !v)} className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand hover:underline">{seoOpen ? 'Свернуть ↑' : 'Подробнее ↓'}</button>
      </section>
    </>
  )
}
