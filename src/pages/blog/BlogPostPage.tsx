import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router-dom'
import { z } from 'zod'
import { postsApi } from '@/shared/api/endpoints'
import type { Comment } from '@/shared/api/schemas'
import { toArticle, type Article } from '@/entities/article'
import { SubscribeBlock } from '@/widgets/home/SubscribeBlock'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import { Placeholder } from '@/shared/ui/Placeholder'
import { IconShare } from '@/shared/ui/Icons'
import { Button } from '@/shared/ui/Button'
import { useState } from 'react'

const idSchema = z.coerce.number().int().min(1).max(100)

interface PostData { article: Article; comments: Comment[]; prev: number | null; next: number | null }

/** Параметр URL — недоверенный ввод: валидируем Zod'ом, невалидный id → 404. */
export const postLoader = async ({ params }: LoaderFunctionArgs): Promise<PostData> => {
  const parsed = idSchema.safeParse(params.id)
  if (!parsed.success) throw new Response('Not found', { status: 404 })
  const id = parsed.data
  const [post, comments] = await Promise.all([postsApi.one(id), postsApi.comments(id).catch(() => [] as Comment[])])
  return { article: toArticle(post), comments, prev: id > 1 ? id - 1 : null, next: id < 100 ? id + 1 : null }
}

export function BlogPostPage() {
  const { article: a, comments, prev, next } = useLoaderData() as PostData
  const [copied, setCopied] = useState(false)
  const paragraphs = Array.from({ length: 8 }, (_, i) => (i % 2 === 0 ? a.text : a.excerpt.replace('…', '.')))

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: a.title, url })
      else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) }
    } catch { /* пользователь закрыл диалог */ }
  }

  return (
    <>
      <article className="container-x pb-12">
        <Breadcrumbs items={[{ label: 'Блог', to: '/blog' }, { label: a.title }]} />
        <h1 className="mt-4 text-3xl sm:text-4xl">{a.title}</h1>
        <p className="mb-8 mt-2 text-xs uppercase tracking-wider text-ink-soft">{a.date} · {a.category} · 5 мин чтения</p>
        {/* Текст — только как text-узлы React (textContent), без HTML-инъекций */}
        <div className="gap-10 text-sm leading-relaxed text-ink-soft lg:columns-2">
          <Placeholder id={a.id} className="mb-5 aspect-[16/10] w-full break-inside-avoid rounded-lg" />
          {paragraphs.map((p, i) => <p key={i} className="mb-4 first-letter:capitalize">{p}</p>)}
          <Placeholder id={a.id + 1} className="mb-5 aspect-[16/10] w-full break-inside-avoid rounded-lg" />
        </div>

        <div className="my-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider">Поделиться</p>
          <Button variant="outline" onClick={share}><IconShare className="mr-2" />{copied ? 'Ссылка скопирована' : 'Поделиться'}</Button>
        </div>

        <nav aria-label="Другие статьи" className="flex justify-between gap-4 border-t border-black/10 pt-6 text-sm">
          {prev ? <Link to={`/blog/${prev}`} className="font-semibold hover:text-brand">← Предыдущая статья</Link> : <span />}
          {next ? <Link to={`/blog/${next}`} className="font-semibold hover:text-brand">Следующая статья →</Link> : <span />}
        </nav>

        {comments.length > 0 && (
          <section className="mt-12" aria-labelledby="comments">
            <h2 id="comments" className="mb-4 text-2xl">Комментарии ({comments.length})</h2>
            <ul className="space-y-4">
              {comments.map((c) => (
                <li key={c.id} className="rounded-lg bg-sky-soft p-4">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-ink-soft">{c.email}</p>
                  <p className="mt-2 text-sm">{c.body}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      <SubscribeBlock />
    </>
  )
}
