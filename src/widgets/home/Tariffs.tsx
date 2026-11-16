import { useDemo } from '@/features/demo/DemoContext'
import { TARIFFS } from '@/shared/config/site'
import { Button, LinkButton } from '@/shared/ui/Button'
import { Section, SectionTitle } from '@/shared/ui/Section'
import { Tilt } from '@/shared/ui/Tilt'

export function Tariffs() {
  const { openDemo } = useDemo()
  return (
    <Section id="tariffs">
      <SectionTitle>Пакеты цифровых подписей</SectionTitle>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TARIFFS.map((t) => (
          <li key={t.id}>
            <Tilt className="h-full" max={9}>
              <div className="flex h-full flex-col rounded-lg bg-sky-soft p-6 text-center">
                <h3 className="font-sans text-lg font-semibold">{t.name}</h3>
                <p className="mt-1 text-xs text-ink-soft">{t.caption}</p>
                <div className="my-6 flex-1">
                  {t.price ? <><p className="font-serif text-4xl font-bold">{t.price}</p><p className="text-xs text-ink-soft">{t.unit}</p></> : <p className="font-serif text-lg font-bold text-ink-soft">Индивидуально</p>}
                </div>
                {t.id === 'demo' ? <LinkButton to="/register" className="w-full">{t.cta}</LinkButton> : <Button onClick={openDemo} className="w-full">{t.cta}</Button>}
              </div>
            </Tilt>
          </li>
        ))}
      </ul>
    </Section>
  )
}
