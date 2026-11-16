import { useCountUp } from '@/shared/hooks/useCountUp'
import { useInView } from '@/shared/hooks/useInView'
import { Section } from '@/shared/ui/Section'

const TARGET = 5_820_125_114

export function Counter() {
  const [ref, seen] = useInView<HTMLDivElement>(0.4)
  const value = useCountUp(TARGET, seen)
  return (
    <Section tone="mint" className="text-center">
      <div ref={ref}>
        <p className="font-serif text-4xl font-bold tabular-nums sm:text-6xl lg:text-7xl" aria-label={TARGET.toLocaleString('ru-RU')}>{value.toLocaleString('ru-RU')}</p>
        <p className="mt-2 font-serif text-xl sm:text-2xl">подписано документов</p>
        <p className="mx-auto mt-4 max-w-lg text-sm text-ink-soft">Наша компания уже более 10 лет разрабатывает удобные решения для бизнеса любого размера. Мы гордимся: Signy — это безопасный и комфортный продукт.</p>
      </div>
    </Section>
  )
}
