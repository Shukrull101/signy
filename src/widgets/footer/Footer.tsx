import { Link } from 'react-router-dom'
import { CONTACTS, FOOTER_LINKS } from '@/shared/config/site'
import { Logo } from '@/shared/ui/Logo'
import { IconUp } from '@/shared/ui/Icons'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-ink pt-12 text-white">
      <div className="container-x grid gap-10 pb-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.4fr_1fr_1fr]">
        <div>
          <Logo inverse className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/60">{t("footerText")}</p><p className="mt-4 text-xs text-white/50">© {new Date().getFullYear()} Signy</p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
          {FOOTER_LINKS.map((l) => <li key={l.label}><Link to={l.to} className="transition hover:text-brand">{(({ 'Про нас': t('about'), 'Блог': t('blog'), 'Цены': t('prices'), 'Контакты': t('contacts'), 'Вход': t('login'), 'Регистрация': t('register') } as Record<string, string>)[l.label]) ?? l.label}</Link></li>)}
        </ul>
        <div className="space-y-3 text-xs">
          <a href={`mailto:${CONTACTS.email}`} className="block transition hover:text-brand">{CONTACTS.email}</a>
          <p className="text-white/70">Facebook</p>
        </div>
        <address className="space-y-2 text-xs not-italic">
          <p className="text-white/70">{t("address")}</p><p className="text-white/70">{t("academy")}</p>
          <a href={CONTACTS.phoneHref} className="block hover:text-brand">{CONTACTS.phone}</a>
          {CONTACTS.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block hover:text-brand">{p}</a>)}
        </address>
      </div>
      <div className="container-x flex items-center justify-between gap-4 border-t border-white/10 py-5 text-[11px] text-white/40">
        <span>Signy · Digital workflow</span>
        <button type="button" aria-label="Наверх" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-full border border-white/30 p-2 text-white/70 transition hover:-translate-y-1 hover:border-brand hover:text-brand"><IconUp /></button>
      </div>
    </footer>
  )
}
