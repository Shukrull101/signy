import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { usersApi } from '@/shared/api/endpoints'
import type { LoginValues, RegisterValues } from '@/shared/lib/formSchemas'
import { clearSession, loadLocalUsers, loadSession, saveLocalUser, saveSession, sha256, type SessionUser } from './authStorage'

/** Пароль для «серверных» пользователей jsonplaceholder (у него нет настоящей авторизации). */
export const DEMO_PASSWORD = 'signy1234'

interface AuthCtx {
  user: SessionUser | null
  login: (v: LoginValues) => Promise<void>
  register: (v: RegisterValues) => Promise<void>
  logout: () => void
}
const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(loadSession)

  const start = useCallback((u: SessionUser) => { saveSession(u); setUser(u) }, [])

  const login = useCallback(async ({ email, password }: LoginValues) => {
    const e = email.trim().toLowerCase()
    const hash = await sha256(password)
    const local = loadLocalUsers().find((u) => u.email.toLowerCase() === e)
    if (local) {
      if (local.hash !== hash) throw new Error('Неверный e-mail или пароль')
      start({ id: local.id, name: local.name, email: local.email, phone: local.phone })
      return
    }
    // GET /users?email=… — jsonplaceholder
    const found = (await usersApi.byEmail(email.trim()))[0]
    if (!found || password !== DEMO_PASSWORD) throw new Error('Неверный e-mail или пароль')
    start({ id: found.id, name: found.name, email: found.email, phone: found.phone })
  }, [start])

  const register = useCallback(async (v: RegisterValues) => {
    const email = v.email.trim()
    if (loadLocalUsers().some((u) => u.email.toLowerCase() === email.toLowerCase())) throw new Error('Пользователь с таким e-mail уже существует')
    // POST /users — jsonplaceholder
    const created = await usersApi.create({ name: v.name.trim(), username: email.split('@')[0] ?? 'user', email, phone: v.phone.trim() })
    const u = { id: created.id, name: v.name.trim(), email, phone: v.phone.trim() }
    saveLocalUser({ ...u, hash: await sha256(v.password) })
    start(u)
  }, [start])

  const logout = useCallback(() => { clearSession(); setUser(null) }, [])
  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth(): AuthCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useAuth вне AuthProvider')
  return c
}
