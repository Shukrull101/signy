/**
 * Слайд «CSRF и фреймы»: SameSite + токены для важных действий.
 * У jsonplaceholder нет сессий/cookie, поэтому токен живёт в памяти вкладки (не в localStorage)
 * и уходит заголовком в каждый мутирующий запрос. На реальном бэке его проверяет сервер.
 * Cookie сессии на бэке: HttpOnly; Secure; SameSite=Lax.
 */
let token: string | null = null

export const getCsrfToken = (): string => {
  if (!token) {
    const bytes = new Uint8Array(16)
    crypto.getRandomValues(bytes)
    token = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  }
  return token
}

/** Резервная защита от clickjacking; основная — заголовок frame-ancestors 'none' (см. public/_headers). */
export const preventFraming = (): void => {
  if (window.top !== window.self) {
    document.documentElement.style.display = 'none'
    try {
      if (window.top) window.top.location.href = window.self.location.href
    } catch {
      /* cross-origin top — остаёмся скрытыми */
    }
  }
}
