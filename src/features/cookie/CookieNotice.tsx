import { useState } from 'react'
import { Button } from '@/shared/ui/Button'

const KEY = 'signy-notice-ok'
const read = (): boolean => { try { return localStorage.getItem(KEY) === '1' } catch { return false } }

/** Уведомление «Внимание!» — cookie-плашка внизу экрана при первом визите. */
export function CookieNotice() {
  const [hidden, setHidden] = useState<boolean>(read)
  if (hidden) return null
  const accept = () => { try { localStorage.setItem(KEY, '1') } catch { /* ignore */ } setHidden(true) }
  return (
    <aside role="dialog" aria-label="Внимание!" className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-2xl animate-fadeUp rounded-xl bg-white p-4 shadow-card ring-1 ring-brand/20 sm:flex sm:items-center sm:gap-5">
      <div className="flex-1">
        <p className="font-serif text-lg font-bold">Внимание!</p>
        <p className="text-xs text-ink-soft">Мы используем cookie, чтобы сайт работал лучше. Продолжая пользоваться сайтом, вы соглашаетесь с этим.</p>
      </div>
      <Button onClick={accept} className="mt-3 w-full sm:mt-0 sm:w-auto">Понятно</Button>
    </aside>
  )
}
