import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className="border-b border-brand/20">
      <h3 className="font-sans text-base font-semibold">
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-4 text-left transition hover:text-brand">
          <span>{title}</span>
          <span aria-hidden className={cn('text-brand transition-transform duration-300', open && 'rotate-180')}>▾</span>
        </button>
      </h3>
      <div id={id} role="region" className={cn('grid transition-all duration-300', open ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden text-sm leading-relaxed text-ink-soft">{children}</div>
      </div>
    </div>
  )
}
