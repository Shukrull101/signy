import type { z } from 'zod'
import { getCsrfToken } from '@/shared/security/csrf'
import { assertAllowedOrigin } from '@/shared/security/origin'

export const API_URL = 'https://jsonplaceholder.typicode.com'

export class ApiError extends Error {
  readonly status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions<T> {
  method?: Method
  body?: unknown
  schema: z.ZodType<T>
  signal?: AbortSignal
}

/** Типизированный fetch: allow-list origin → без credentials → CSRF-заголовок на мутациях → Zod-валидация ответа. */
export async function request<T>(path: string, { method = 'GET', body, schema, signal }: RequestOptions<T>): Promise<T> {
  const url = `${API_URL}${path}`
  assertAllowedOrigin(url)

  const headers: Record<string, string> = { Accept: 'application/json' }
  if (method !== 'GET') {
    headers['Content-Type'] = 'application/json; charset=UTF-8'
    headers['X-CSRF-Token'] = getCsrfToken()
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: 'omit',
    mode: 'cors',
    referrerPolicy: 'no-referrer',
    signal,
  })
  if (!res.ok) throw new ApiError(`Ошибка сервера (${res.status})`, res.status)

  const json: unknown = await res.json()
  const parsed = schema.safeParse(json)
  if (!parsed.success) throw new ApiError('Сервер вернул данные в неожиданном формате', 502)
  return parsed.data
}
