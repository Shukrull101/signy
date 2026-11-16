import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface DemoCtx { open: boolean; openDemo: () => void; closeDemo: () => void }
const Ctx = createContext<DemoCtx | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openDemo = useCallback(() => setOpen(true), [])
  const closeDemo = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ open, openDemo, closeDemo }), [open, openDemo, closeDemo])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useDemo(): DemoCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useDemo вне DemoProvider')
  return c
}
