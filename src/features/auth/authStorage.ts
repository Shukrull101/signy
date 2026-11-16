import { z } from 'zod'

/**
 * Хранилище сессии. Данные из storage — тоже недоверенные: парсим Zod'ом.
 * Пароли НЕ хранятся — только SHA-256 хеш (демо; на реальном бэке — bcrypt/argon2 на сервере).
 */
export const sessionUserSchema = z.object({ id: z.number(), name: z.string(), email: z.string(), phone: z.string().optional() })
export type SessionUser = z.infer<typeof sessionUserSchema>

const localUserSchema = sessionUserSchema.extend({ hash: z.string() })
const localUsersSchema = z.array(localUserSchema)
type LocalUser = z.infer<typeof localUserSchema>

const SESSION_KEY = 'signy-session'
const USERS_KEY = 'signy-users'

export const sha256 = async (text: string): Promise<string> => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('')
}

export const loadSession = (): SessionUser | null => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = sessionUserSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : null
  } catch { return null }
}
export const saveSession = (u: SessionUser): void => { try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(u)) } catch { /* ignore */ } }
export const clearSession = (): void => { try { sessionStorage.removeItem(SESSION_KEY) } catch { /* ignore */ } }

export const loadLocalUsers = (): LocalUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const parsed = localUsersSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : []
  } catch { return [] }
}
export const saveLocalUser = (u: LocalUser): void => {
  try { localStorage.setItem(USERS_KEY, JSON.stringify([...loadLocalUsers().filter((x) => x.email !== u.email), u])) } catch { /* ignore */ }
}
