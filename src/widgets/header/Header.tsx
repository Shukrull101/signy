import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV, type NavItem } from '@/shared/config/site'
import { useAuth } from '@/features/auth/AuthContext'
import { Logo } from '@/shared/ui/Logo'
import { IconMenu } from '@/shared/ui/Icons'
import { MobileMenu } from './MobileMenu'
import { useLanguage, type Language } from '@/shared/i18n/LanguageContext'

function DropItem({ item }: { item: NavItem }) {
  const { t } = useLanguage()
  const translate = (label: string) => (({ 'Про нас': t('about'), 'Цены': t('prices'), 'Блог': t('blog'), 'Контакты': t('contacts'), 'Видеоинструкции': t('videos') } as Record<string, string>)[label] ?? label)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  useEffect(() => {
    if (!open) return
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [open])

  const cls = 'text-[11px] font-semibold uppercase tracking-wider transition hover:text-brand'
  if (!item.children) {
    return <li><NavLink to={item.to} className={({ isActive }) => `${cls} ${isActive ? 'text-brand' : ''}`}>{translate(item.label)}</NavLink></li>
  }
  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className={`${cls} flex items-center gap-1`}>
        {item.label} <span aria-hidden className={`text-[8px] transition ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <ul className="absolute left-0 top-full z-30 min-w-48 animate-fadeUp rounded-lg bg-white p-2 shadow-card ring-1 ring-brand/10">
          {item.children.map((c) => (
            <li key={c.label}><Link to={c.to} onClick={() => setOpen(false)} className="block rounded px-3 py-2 text-xs font-semibold hover:bg-sky-soft hover:text-brand">{translate(c.label)}</Link></li>
          ))}
        </ul>
      )}
    </li>
  )
}

export function Header() {
  const [menu, setMenu] = useState(false)
  const { user } = useAuth()
  const { pathname } = useLocation()
  const { language, setLanguage, t } = useLanguage()
  useEffect(() => setMenu(false), [pathname])

  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Основная" className="hidden lg:block">
          <ul className="flex items-center gap-7">{NAV.map((i) => <DropItem key={i.label} item={i} />)}</ul>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <Link to="/profile" className="btn-outline">{user.name.split(' ')[0]}</Link>
          ) : (
            <>
              <Link to="/login" className="btn-outline">{t('login')}</Link>
              <Link to="/register" className="btn-primary">{t('register')}</Link>
            </>
          )}
          <label className="sr-only" htmlFor="site-language">{t('language')}</label>
          <select id="site-language" value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="rounded-full border border-brand/30 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-brand outline-none">
            <option value="ru">РУС</option><option value="tj">ТҶ</option><option value="en">ENG</option>
          </select>
        </div>
        <button type="button" className="text-brand lg:hidden" aria-label="Открыть меню" aria-expanded={menu} onClick={() => setMenu(true)}><IconMenu width={28} height={28} /></button>
      </div>
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
    </header>
  )
}
