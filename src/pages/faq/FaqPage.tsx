import { FaqForm } from '@/features/forms/FaqForm'
import { AccordionItem } from '@/shared/ui/Accordion'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import { Section } from '@/shared/ui/Section'

interface Group { title: string; items: readonly { q: string; a: string; list?: readonly string[] }[] }
const GROUPS: readonly Group[] = [
  { title: 'Общие вопросы', items: [
    { q: 'Что такое электронный документооборот?', a: 'Это обмен документами в электронном виде с юридической значимостью. Вам не нужно печатать, подписывать и пересылать бумагу.', list: ['Документы подписываются электронной подписью', 'Все действия сохраняются в журнале', 'Доступ к архиву — с любого устройства'] },
    { q: 'Нужно ли что-то устанавливать?', a: 'Нет, сервис работает в браузере. Для подписи по ключу может потребоваться стандартный драйвер носителя.' },
  ] },
  { title: 'Подпись и безопасность', items: [
    { q: 'Как защищены мои документы?', a: 'Данные передаются по защищённому каналу и хранятся в зашифрованном виде. Доступ разграничен по ролям.' },
    { q: 'Можно ли подписывать с телефона?', a: 'Да, поддерживается подпись ключами Mobile ID и через мобильный браузер.' },
  ] },
  { title: 'Оплата', items: [
    { q: 'Как оплатить пакет подписей?', a: 'Выберите тариф на главной странице и оставьте заявку — менеджер выставит счёт.' },
  ] },
]

export function FaqPage() {
  return (
    <>
      <div className="container-x pb-12">
        <Breadcrumbs items={[{ label: 'Вопросы и ответы' }]} />
        <h1 className="mb-8 mt-4 text-3xl sm:text-4xl">Популярные вопросы и ответы на них</h1>
        {GROUPS.map((g, gi) => (
          <section key={g.title} className="mb-8">
            <h2 className="mb-2 text-xl">{g.title}</h2>
            {g.items.map((it, ii) => (
              <AccordionItem key={it.q} title={it.q} defaultOpen={gi === 0 && ii === 0}>
                <p>{it.a}</p>
                {it.list && <ul className="mt-2 list-disc space-y-1 pl-5">{it.list.map((l) => <li key={l}>{l}</li>)}</ul>}
              </AccordionItem>
            ))}
          </section>
        ))}
      </div>
      <Section tone="mint">
        <h2 className="mb-2 text-center text-2xl sm:text-3xl">Не нашли ответ на свой вопрос?</h2>
        <p className="mb-6 text-center text-sm text-ink-soft">Напишите нам — мы ответим в течение рабочего дня</p>
        <FaqForm />
      </Section>
    </>
  )
}
