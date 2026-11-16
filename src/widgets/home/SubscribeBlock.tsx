import { SubscribeForm } from '@/features/forms/SubscribeForm'
import { Section } from '@/shared/ui/Section'

export function SubscribeBlock() {
  return (
    <Section tone="mint" className="text-center">
      <h2 className="mb-3 text-2xl sm:text-3xl lg:text-4xl">Подпишись на наши новости!</h2>
      <p className="mb-6 text-sm text-ink-soft">Введи свой электронный адрес и будь в курсе всех обновлений</p>
      <SubscribeForm />
    </Section>
  )
}
