import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type Tone = 'white' | 'mint' | 'sky'
const tones: Record<Tone, string> = { white: 'bg-white', mint: 'bg-mint', sky: 'bg-sky-soft' }

export function Section({ tone = 'white', id, className, children }: { tone?: Tone; id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn(tones[tone], 'py-12 sm:py-16', className)}>
      <div className="container-x">{children}</div>
    </section>
  )
}

export function SectionTitle({ children, center = true, className }: { children: ReactNode; center?: boolean; className?: string }) {
  return <h2 className={cn('mb-8 text-2xl sm:text-3xl lg:text-4xl', center && 'text-center', className)}>{children}</h2>
}
