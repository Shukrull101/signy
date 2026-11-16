import { PartnersSlider } from '@/widgets/home/PartnersSlider'
import { SubscribeBlock } from '@/widgets/home/SubscribeBlock'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import { Placeholder } from '@/shared/ui/Placeholder'
import { Section } from '@/shared/ui/Section'
import { Tilt } from '@/shared/ui/Tilt'

export function AboutPage() {
  return (
    <>
      <div className="container-x pb-12">
        <Breadcrumbs items={[{ label: 'О нас' }]} />
        <h1 className="mb-6 mt-4 text-3xl sm:text-4xl">О нашей компании</h1>
        <Placeholder id={7} className="aspect-[16/6] w-full rounded-lg" />
        <div className="mt-8 grid gap-6 text-sm leading-relaxed text-ink-soft lg:grid-cols-2">
          <p>Signy — команда, которая более 10 лет делает юридически значимый документооборот простым. Мы помогаем компаниям отказаться от бумаги и ускорить работу с контрагентами.</p>
          <p>Наш сервис используют сотни организаций: от небольших студий до крупных предприятий. Мы развиваем продукт вместе с клиентами и поддерживаем интеграции с учётными системами.</p>
        </div>
        <div className="mt-12 grid items-center gap-8 md:grid-cols-2">
          <Tilt><Placeholder id={3} className="aspect-[4/3] w-full rounded-lg" /></Tilt>
          <blockquote>
            <p className="font-serif text-xl leading-snug sm:text-2xl">«Мы верим, что подписать документ должно быть так же легко, как отправить сообщение».</p>
            <footer className="mt-4 text-sm text-ink-soft">— Руководитель компании Signy</footer>
          </blockquote>
        </div>
      </div>
      <Section><PartnersSlider title="Партнёры" /></Section>
      <SubscribeBlock />
    </>
  )
}
