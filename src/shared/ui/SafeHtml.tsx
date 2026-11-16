import { useMemo } from 'react'
import { sanitizeHtml } from '@/shared/security/sanitize'

/** Единственное место с dangerouslySetInnerHTML — всегда через DOMPurify (слайд «textContent»). */
export function SafeHtml({ html, className }: { html: string; className?: string }) {
  const clean = useMemo(() => sanitizeHtml(html), [html])
  return <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />
}
