import { useEffect, useState } from 'react'

export type AsyncState<T> = { status: 'loading' } | { status: 'error'; error: string } | { status: 'success'; data: T }

/** Загрузка данных с отменой запроса при размонтировании (AbortController). */
export function useAsync<T>(fn: (signal: AbortSignal) => Promise<T>, deps: readonly unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })
  useEffect(() => {
    const ctrl = new AbortController()
    setState({ status: 'loading' })
    fn(ctrl.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch((e: unknown) => {
        if (ctrl.signal.aborted) return
        setState({ status: 'error', error: e instanceof Error ? e.message : 'Неизвестная ошибка' })
      })
    return () => ctrl.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return state
}
