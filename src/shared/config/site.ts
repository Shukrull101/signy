export interface NavItem { label: string; to: string; children?: readonly { label: string; to: string }[] }

export const CONTACTS = {
  phone: '0 800 750 643',
  phoneHref: 'tel:+380800750643',
  phones: ['+380 44 334 56 43', '+380 44 338 86 43'],
  email: 'info@signy.biz',
  address: 'Душанбе, ТЦ «Баракат» · Alif Academy',
  hours: 'Пн–Пт: 9:00–18:00',
} as const

export const NAV: readonly NavItem[] = [
  {
    label: CONTACTS.phone,
    to: '/contacts',
    children: CONTACTS.phones.map((p) => ({ label: p, to: '/contacts' })),
  },
  { label: 'Про нас', to: '/about', children: [{ label: 'О компании', to: '/about' }, { label: 'Видеоинструкции', to: '/videos' }, { label: 'Вопросы и ответы', to: '/faq' }] },
  { label: 'Цены', to: '/#tariffs' },
  { label: 'Блог', to: '/blog' },
  { label: 'Контакты', to: '/contacts' },
] as const

export const FOOTER_LINKS: readonly { label: string; to: string }[] = [
  { label: 'Про нас', to: '/about' },
  { label: 'Блог', to: '/blog' },
  { label: 'Цены', to: '/#tariffs' },
  { label: 'Контакты', to: '/contacts' },
  { label: 'Вход', to: '/login' },
  { label: 'Регистрация', to: '/register' },
]

export interface Tariff { id: string; name: string; caption: string; price?: string; unit?: string; cta: string }
export const TARIFFS: readonly Tariff[] = [
  { id: 'demo', name: 'Demo', caption: '30 документов', price: '0', unit: 'сум / месяц', cta: 'Зарегистрироваться' },
  { id: 'business', name: 'Business', caption: '1 000 документов', price: '5 800', unit: 'сум / год', cta: 'Заказать' },
  { id: 'pro', name: 'Pro', caption: '10 000 документов', price: '9 000', unit: 'сум / год', cta: 'Заказать' },
  { id: 'individual', name: 'Individual', caption: 'Необмежена кількість документів', cta: 'Связаться с нами' },
]

export const PARTNERS = ['УкрОборонПром', 'Нова Пошта', 'N-iX', 'Хліб', 'ТехноПром', 'ДокСервис'] as const
