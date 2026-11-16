import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTACTS, NAV } from '@/shared/config/site'
import { useModal } from '@/shared/hooks/useModal'
import { useDemo } from '@/features/demo/DemoContext'
import { useAuth } from '@/features/auth/AuthContext'
import { Logo } from '@/shared/ui/Logo'
import { IconClose } from '@/shared/ui/Icons'
import { cn } from '@/shared/lib/cn'
import { useLanguage, type Language } from '@/shared/i18n/LanguageContext'

/** Планшет — панель справа (max-w-sm), мобильный — на весь экран. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sub, setSub] = useState<string | null>(null)
  const { openDemo } = useDemo()
  const { user } = useAuth()
  const { language, setLanguage } = useLanguage()
  useModal(open, onClose)
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 lg:hidden" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div role="dialog" aria-modal="true" aria-label="Меню" className="ml-auto flex h-full w-full animate-fadeUp flex-col overflow-y-auto bg-white p-5 sm:max-w-sm">
        <div className="flex items-center justify-between">
          <Logo />
          <button type="button" onClick={onClose} aria-label="Закрыть меню" className="text-brand"><IconClose width={28} height={28} /></button>
        </div>
        <div className="mt-6 flex items-center gap-3">
          {user ? <Link to="/profile" className="btn-outline flex-1">Профиль</Link> : (
            <><Link to="/login" className="btn-outline flex-1">Вход</Link><Link to="/register" className="btn-primary flex-1">Регистрация</Link></>
          )}
        </div>
        <button type="button" onClick={() => { onClose(); openDemo() }} className="btn-outline mt-3 w-full">Запросить консультацию</button>
        <ul className="mt-6 divide-y divide-black/5">
          {NAV.map((i) => (
            <li key={i.label}>
              {i.children ? (
                <>
                  <button type="button" aria-expanded={sub === i.label} onClick={() => setSub(sub === i.label ? null : i.label)} className="flex w-full items-center justify-between py-4 text-sm font-semibold uppercase tracking-wider">
                    {i.label}<span aria-hidden className={cn('text-brand transition', sub === i.label && 'rotate-180')}>▾</span>
                  </button>
                  {sub === i.label && (
                    <ul className="mb-3 space-y-1 rounded-lg bg-sky-soft p-3">
                      {i.children.map((c) => <li key={c.label}><Link to={c.to} className="block py-1.5 text-sm font-semibold hover:text-brand">{c.label}</Link></li>)}
                    </ul>
                  )}
                </>
              ) : <Link to={i.to} className="block py-4 text-sm font-semibold uppercase tracking-wider">{i.label}</Link>}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8 text-sm text-ink-soft">
          <select aria-label="Язык" value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="mb-3 rounded-full border border-brand/30 bg-white px-3 py-2 text-xs font-semibold text-brand"><option value="ru">Русский</option><option value="tj">Тоҷикӣ</option><option value="en">English</option></select>
          <a href={CONTACTS.phoneHref} className="block py-1 hover:text-brand">{CONTACTS.phone}</a>
          <a href={`mailto:${CONTACTS.email}`} className="block py-1 hover:text-brand">{CONTACTS.email}</a>
        </div>
      </div>
    </div>
  )
}
