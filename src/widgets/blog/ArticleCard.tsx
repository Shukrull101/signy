import { Link } from 'react-router-dom'
import type { Article } from '@/entities/article'
import { Placeholder } from '@/shared/ui/Placeholder'
import { Tilt } from '@/shared/ui/Tilt'
import { cn } from '@/shared/lib/cn'

export function ArticleCard({ a, large = false, dark = false }: { a: Article; large?: boolean; dark?: boolean }) {
  return (
    <Tilt max={5}>
      <article className={cn('group h-full', large && 'grid gap-6 md:grid-cols-2 md:items-center')}>
        <Link to={`/blog/${a.id}`} className="block overflow-hidden rounded-lg">
          <Placeholder id={a.id} className={cn('w-full transition duration-500 group-hover:scale-105', large ? 'aspect-[16/10]' : 'aspect-[16/10]')} />
        </Link>
        <div className="mt-3">
          <p className={cn('text-[11px] uppercase tracking-wider', dark ? 'text-white/60' : 'text-ink-soft')}>{a.category} · {a.date}</p>
          <h3 className={cn('mt-1 font-sans font-semibold leading-snug', large ? 'font-serif text-2xl lg:text-3xl' : 'text-base line-clamp-2')}>
            <Link to={`/blog/${a.id}`} className="hover:text-brand">{a.title}</Link>
          </h3>
          <p className={cn('mt-2 text-sm text-ink-soft', !large && 'line-clamp-2')}>{a.excerpt}</p>
          {large && <Link to={`/blog/${a.id}`} className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-brand hover:underline">Читать →</Link>}
        </div>
      </article>
    </Tilt>
  )
}
