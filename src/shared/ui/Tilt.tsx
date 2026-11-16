import type { ReactNode } from 'react'
import { useTilt } from '@/shared/hooks/useTilt'
import { cn } from '@/shared/lib/cn'

/** Обёртка: 3D-наклон за курсором. На тач-устройствах просто статична. */
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const { ref, ...handlers } = useTilt<HTMLDivElement>(max)
  return <div ref={ref} className={cn('will-change-transform', className)} {...handlers}>{children}</div>
}
