import { useDemo } from '@/features/demo/DemoContext'
import { LinkButton, Button } from '@/shared/ui/Button'
import { Section } from '@/shared/ui/Section'
import { Tilt } from '@/shared/ui/Tilt'
import { cn } from '@/shared/lib/cn'
import { Placeholder } from '@/shared/ui/Placeholder'

function ProductPhoto({seed}:{seed:number}) {
 return <Tilt max={7}><div className="aspect-[16/10] overflow-hidden rounded-2xl shadow-card ring-1 ring-black/5"><Placeholder id={seed}/></div></Tilt>
}
interface BlockProps { title: string; items: readonly string[]; flip?: boolean; seed: number; cta: React.ReactNode }
function Block({ title, items, flip, seed, cta }: BlockProps) {
  return (
    <div className="grid items-center gap-8 py-6 lg:grid-cols-2 lg:gap-14">
      <div className={cn(flip && 'lg:order-2')}>
        <h2 className="mb-5 text-2xl sm:text-3xl">{title}</h2>
        <ul className="mb-6 space-y-2 text-sm text-ink-soft">{items.map((t) => <li key={t} className="flex gap-2"><span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{t}</li>)}</ul>
        {cta}
      </div>
      <div className={cn(flip && 'lg:order-1')}><ProductPhoto seed={seed} /></div>
    </div>
  )
}

export function ProductBlocks() {
  const { openDemo } = useDemo()
  return (
    <Section tone="mint">
      <Block seed={1} title="Комфорт в работе" cta={<LinkButton to="/register" variant="outline">Попробовать</LinkButton>}
        items={['Создавайте и подписывайте документы в одном окне', 'Настраивайте маршруты согласования для сотрудников', 'Загружайте файлы любых форматов и размеров', 'Все документы хранятся в защищённом архиве']} />
      <Block seed={3} flip title="Наш продукт это:" cta={<Button onClick={openDemo}>Заказать демо</Button>}
        items={['Web-сервис без установки программ', 'Возможность подписывать с любого устройства', 'Простота интеграции с 1С и учётными системами', 'Подписание ключами Mobile ID']} />
    </Section>
  )
}
