import DOMPurify from 'dompurify'

interface TTPolicyOptions {
  createHTML?: (s: string) => string
  createScript?: (s: string) => string
  createScriptURL?: (s: string) => string
}
interface TTFactory {
  defaultPolicy: unknown
  createPolicy: (name: string, options: TTPolicyOptions) => unknown
}

/**
 * Слайд «Trusted Types»: браузер не пускает обычные строки в опасные sinks.
 * Default-политика чистит любую строку, попавшую в innerHTML; скрипты и script-URL блокируются.
 */
export const initTrustedTypes = (): void => {
  const tt = (window as unknown as { trustedTypes?: TTFactory }).trustedTypes
  if (!tt || tt.defaultPolicy) return
  try {
    tt.createPolicy('default', {
      createHTML: (s) => String(DOMPurify.sanitize(s)),
      createScript: () => {
        throw new TypeError('Blocked by Trusted Types')
      },
      createScriptURL: () => {
        throw new TypeError('Blocked by Trusted Types')
      },
    })
  } catch {
    /* политика уже создана или запрещена CSP */
  }
}
