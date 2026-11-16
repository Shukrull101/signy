import { Link } from 'react-router-dom'

export interface Crumb { label: string; to?: string }
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="pt-6 text-xs text-ink-soft">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link to="/" className="hover:text-brand">Главная</Link></li>
        {items.map((c) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {c.to ? <Link to={c.to} className="hover:text-brand">{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
