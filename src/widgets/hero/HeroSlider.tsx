import { useCallback, useEffect, useRef, useState } from 'react'
import hero1 from '@/shared/assets/hero1.webp'
import hero2 from '@/shared/assets/hero2.webp'
import hero3 from '@/shared/assets/hero3.webp'
import { useDemo } from '@/features/demo/DemoContext'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { useTilt } from '@/shared/hooks/useTilt'

interface Slide { img: string; pos: string; title: string; subtitle: string; text: string; cta: string }
const SLIDES: readonly Slide[] = [
  { img: hero1, pos: '28% 50%', title: 'Цифровой документооборот в три клика', subtitle: 'Быстрая регистрация', text: 'Многофункциональный сервис электронного документооборота и цифровой подписи для вашего бизнеса. Без бумаги, очередей и курьеров.', cta: 'Попробовать бесплатно' },
  { img: hero2, pos: '47% 50%', title: 'Подписывайте документы с любого устройства', subtitle: 'Работайте откуда угодно', text: 'Ноутбук, планшет или телефон — подпись, согласование и архив всегда под рукой, а все действия юридически значимы.', cta: 'Заказать демо' },
  { img: hero3, pos: '32% 50%', title: 'Скорость, которая экономит ваше время', subtitle: 'Документ подписан за минуты', text: 'Отправляйте контрагентам документы и получайте подписанные версии в тот же день. Интеграция с учётными системами.', cta: 'Попробовать бесплатно' },
]

export function HeroSlider() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const { openDemo } = useDemo()
  const startX = useRef<number | null>(null)
  const tilt = useTilt<HTMLDivElement>(6)
  const go = useCallback((n: number) => setI((n + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [paused])

  return (
    <section aria-roledescription="carousel" aria-label="Главный слайдер"
      className="relative overflow-hidden bg-gradient-to-br from-sky-soft to-white"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => { startX.current = e.clientX }}
      onPointerUp={(e) => { if (startX.current === null) return; const d = e.clientX - startX.current; startX.current = null; if (Math.abs(d) > 50) go(i + (d < 0 ? 1 : -1)) }}>
      <div className="container-x relative">
        {SLIDES.map((s, idx) => (
          <div key={s.title} aria-hidden={idx !== i} className={cn('grid items-center gap-6 py-10 transition-opacity duration-700 md:grid-cols-2 lg:min-h-[460px]', idx === i ? 'relative opacity-100' : 'pointer-events-none absolute inset-x-4 top-0 opacity-0 sm:inset-x-8')}>
            <div className="order-2 md:order-1">
              <h1 className="text-3xl leading-tight sm:text-4xl lg:text-5xl">{s.title}</h1>
              <p className="mt-4 text-sm font-semibold text-brand">{s.subtitle}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">{s.text}</p>
              <Button onClick={openDemo} className="mt-6 w-full sm:w-auto" tabIndex={idx === i ? 0 : -1}>{s.cta}</Button>
            </div>
            <div className="perspective order-1 md:order-2">
              <div ref={idx === i ? tilt.ref : undefined} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} style={tilt.style}
                className="mx-auto aspect-[4/3] w-full max-w-md overflow-hidden md:max-w-none [mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)]">
                <img src={s.img} alt="" width={1200} height={881} loading={idx === 0 ? 'eager' : 'lazy'} className="h-full w-full scale-150 object-cover" style={{ objectPosition: s.pos, transformOrigin: s.pos }} />
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center gap-2 pb-5" role="tablist" aria-label="Слайды">
          {SLIDES.map((s, idx) => (
            <button key={s.title} type="button" role="tab" aria-selected={idx === i} aria-label={`Слайд ${idx + 1}`} onClick={() => go(idx)} className={cn('h-2.5 rounded-full transition-all', idx === i ? 'w-6 bg-brand' : 'w-2.5 bg-brand/30 hover:bg-brand/60')} />
          ))}
        </div>
      </div>
    </section>
  )
}
