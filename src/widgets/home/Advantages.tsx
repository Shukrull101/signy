import type { ComponentType, SVGProps } from 'react'
import { IconCoin, IconShield, IconZap } from '@/shared/ui/Icons'

const ITEMS: readonly { Icon: ComponentType<SVGProps<SVGSVGElement>>; title: string; text: string }[] = [
  { Icon: IconZap, title: 'Моментально', text: 'Подписание и отправка документов занимает секунды' },
  { Icon: IconShield, title: 'Глобально', text: 'Юридически значимая подпись, признанная во всех странах' },
  { Icon: IconCoin, title: 'Экономно', text: 'В 20 раз дешевле бумажного документооборота' },
]

export function Advantages() {
  return (
    <section className="bg-white py-8">
      <ul className="container-x grid gap-6 sm:grid-cols-3">
        {ITEMS.map(({ Icon, title, text }) => (
          <li key={title} className="flex items-start gap-4 transition hover:-translate-y-1">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand text-brand"><Icon width={24} height={24} /></span>
            <div><h3 className="font-sans text-sm font-semibold">{title}</h3><p className="mt-1 text-xs text-ink-soft">{text}</p></div>
          </li>
        ))}
      </ul>
    </section>
  )
}
