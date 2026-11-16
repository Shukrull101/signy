/**
 * Слайды «SOP» и «CORS»: Origin = схема + хост + порт. Ходим только на точный allow-list,
 * без credentials: jsonplaceholder отдаёт Access-Control-Allow-Origin: *, cookie не нужны.
 */
export const ALLOWED_API_ORIGINS: readonly string[] = ['https://jsonplaceholder.typicode.com']

export const assertAllowedOrigin = (url: string): void => {
  const { origin } = new URL(url)
  if (!ALLOWED_API_ORIGINS.includes(origin)) throw new Error(`Origin не в allow-list: ${origin}`)
}
