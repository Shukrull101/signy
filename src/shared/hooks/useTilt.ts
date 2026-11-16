import { useCallback, useRef, type CSSProperties, type MouseEvent } from 'react'

/** 3D-наклон карточки за курсором (perspective + rotateX/rotateY). */
export function useTilt<T extends HTMLElement>(max = 10) {
  const ref = useRef<T>(null)
  const onMouseMove = useCallback((e: MouseEvent<T>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * max * 2}deg) rotateX(${-y * max * 2}deg) translateZ(8px)`
  }, [max])
  const onMouseLeave = useCallback(() => { if (ref.current) ref.current.style.transform = '' }, [])
  const style: CSSProperties = { transition: 'transform .25s ease-out', willChange: 'transform' }
  return { ref, onMouseMove, onMouseLeave, style }
}
