import { lazy, Suspense } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { LinkButton } from '@/shared/ui/Button'

const UfoScene = lazy(() => import('./UfoScene'))

export function NotFoundPage({ message }: { message?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-soft to-[#6f9bdd]">
      {/* декоративные «звёздочки» и облака */}
      <span aria-hidden className="absolute left-[12%] top-10 text-brand/40">+</span>
      <span aria-hidden className="absolute right-[18%] top-24 h-24 w-24 animate-float rounded-full bg-mint/70" />
      <div className="relative mx-auto h-[420px] w-full max-w-4xl sm:h-[520px]">
        <Suspense fallback={<p className="pt-40 text-center font-serif text-7xl font-bold text-brand">404</p>}><UfoScene /></Suspense>
      </div>
      {/* холмы / город */}
      <svg aria-hidden viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative -mt-16 block h-24 w-full sm:h-28"><path d="M0 120V70L180 50 380 78 620 40 860 64 1060 28 1240 60 1440 36V120z" fill="#3e5b8f" /></svg>
      <div className="bg-[#3e5b8f] px-4 pb-14 pt-2 text-center text-white">
        <p className="mx-auto max-w-sm text-sm leading-relaxed sm:text-base">{message ?? 'Мы честно старались найти, но этой страницы по всей видимости не существует.'}</p>
        <LinkButton to="/" variant="outline" className="mt-6 border-white text-white hover:bg-white hover:text-brand">На главную</LinkButton>
      </div>
    </section>
  )
}

/** errorElement роутера: 404 из loader'ов и неожиданные ошибки (например, API недоступен). */
export function RouteError() {
  const err = useRouteError()
  if (isRouteErrorResponse(err) && err.status === 404) return <NotFoundPage />
  const text = err instanceof Error ? err.message : 'Что-то пошло не так. Попробуйте обновить страницу.'
  return <NotFoundPage message={`Не удалось загрузить страницу. ${text}`} />
}
