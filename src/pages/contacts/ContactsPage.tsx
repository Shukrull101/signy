import { CONTACTS } from '@/shared/config/site'
import { ContactForm } from '@/features/forms/ContactForm'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import { IconMail, IconPhone, IconPin } from '@/shared/ui/Icons'
import { useLanguage } from '@/shared/i18n/LanguageContext'
export function ContactsPage() {
 const {t}=useLanguage()
 const places=[{name:t('barakat'),query:'ТЦ Баракат Душанбе'},{name:t('academy'),query:'Alif Academy Душанбе'}]
 return <div className="container-x pb-14">
  <Breadcrumbs items={[{label:t('contacts')}]}/>
  <h1 className="mb-6 mt-4 text-3xl sm:text-4xl">{t('contactTitle')}</h1>
  <div className="grid gap-10 lg:grid-cols-2">
   <div><p className="mb-5 text-sm text-ink-soft">{t('contactIntro')}</p>
    <ul className="mb-8 space-y-3 text-sm">
     <li className="flex items-center gap-3 text-brand"><IconPhone/><span className="text-ink">{CONTACTS.phones.map(p=><a key={p} href={`tel:${p.replace(/\s/g,'')}`} className="mr-3 hover:text-brand">{p}</a>)}</span></li>
     <li className="flex items-center gap-3 text-brand"><IconMail/><a href={`mailto:${CONTACTS.email}`} className="text-ink hover:text-brand">{CONTACTS.email}</a></li>
     <li className="flex items-center gap-3 text-brand"><IconPin/><span className="text-ink">{t('address')}, {t('academy')}</span></li>
    </ul>
    <h2 className="mb-4 text-2xl">{t('writeUs')}</h2><ContactForm/>
   </div>
   <div className="space-y-4">
    <div className="overflow-hidden rounded-2xl border border-brand/10 bg-sky-soft"><iframe title="Карта Душанбе — ТЦ Баракат и Alif Academy" src="https://www.google.com/maps?q=ТЦ+Баракат,+Душанбе&output=embed" className="h-[340px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>
    <div className="grid gap-3 sm:grid-cols-2">{places.map(p=><a key={p.name} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.query)}`} target="_blank" rel="noreferrer" className="rounded-xl border border-brand/15 p-4 transition hover:-translate-y-1 hover:shadow-card"><p className="font-semibold">{p.name}</p><p className="mt-1 text-xs text-ink-soft">{t("address")}, Таджикистан</p><span className="mt-3 inline-block text-xs font-semibold text-brand">Открыть маршрут ↗</span></a>)}</div>
   </div>
  </div>
 </div>
}
