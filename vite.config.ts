import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Security: CSP только в production-сборке (в dev Vite использует inline-скрипты для HMR).
 * Slide «CSP»: последняя линия обороны — strict-dynamic, без unsafe-inline для скриптов.
 * Slide «Trusted Types»: require-trusted-types-for 'script' — браузер не пускает обычные
 * строки в опасные sinks (innerHTML, eval, script.src).
 * NB: frame-ancestors, X-Frame-Options и nonce работают только как HTTP-заголовок — см. public/_headers.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'", // Tailwind inline style-атрибуты (transform) — только стили, не скрипты
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://jsonplaceholder.typicode.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "require-trusted-types-for 'script'",
  "trusted-types default dompurify",
].join('; ')

const cspPlugin = (): Plugin => ({
  name: 'signy-csp',
  apply: 'build',
  transformIndexHtml: () => [
    { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: csp }, injectTo: 'head-prepend' },
    { tag: 'meta', attrs: { name: 'referrer', content: 'strict-origin-when-cross-origin' }, injectTo: 'head-prepend' },
  ],
})

export default defineConfig({ plugins: [react(), cspPlugin()], resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } } })
