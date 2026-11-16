import { createdSchema, commentsSchema, postSchema, postsSchema, usersSchema, type Comment, type Post, type User } from './schemas'
import { request } from './http'
import { getCsrfToken } from '@/shared/security/csrf'

export const PAGE_SIZE = 9

export const postsApi = {
  list: (signal?: AbortSignal): Promise<Post[]> => request('/posts', { schema: postsSchema, signal }),
  one: (id: number, signal?: AbortSignal): Promise<Post> => request(`/posts/${id}`, { schema: postSchema, signal }),
  comments: (postId: number, signal?: AbortSignal): Promise<Comment[]> =>
    request(`/posts/${postId}/comments`, { schema: commentsSchema, signal }),
}

export const usersApi = {
  /** «Вход»: jsonplaceholder не умеет auth, поэтому ищем пользователя по e-mail. */
  byEmail: (email: string, signal?: AbortSignal): Promise<User[]> =>
    request(`/users?email=${encodeURIComponent(email)}`, { schema: usersSchema, signal }),
  /** «Регистрация»: POST /users возвращает { id: 11 }. */
  create: (data: { name: string; username: string; email: string; phone: string }) =>
    request('/users', { method: 'POST', body: data, schema: createdSchema }),
}

export const leadsApi = {
  /** Реальная отправка на backend. Без VITE_API_URL форма не притворяется успешно отправленной. */
  send: async (data: Record<string, string>) => {
    const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '')
    if (!baseUrl) throw new Error('Сервер заявок пока не подключён. Укажите VITE_API_URL в .env')
    const response = await fetch(`${baseUrl}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-CSRF-Token': getCsrfToken() },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error(`Не удалось отправить заявку (${response.status})`)
    const result: unknown = await response.json()
    const parsed = createdSchema.safeParse(result)
    if (!parsed.success) throw new Error('Сервер вернул неожиданный ответ')
    return parsed.data
  },
}
