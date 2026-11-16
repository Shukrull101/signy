import DOMPurify from 'dompurify'

/**
 * Слайд «textContent»: по умолчанию — текст (React сам экранирует {value}).
 * HTML — только через DOMPurify. Единственное место в проекте, где допустим HTML.
 */
const ALLOWED_TAGS = ['p', 'b', 'i', 'em', 'strong', 'ul', 'ol', 'li', 'h3', 'h4', 'br', 'a']
const ALLOWED_ATTR = ['href', 'rel', 'target']

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node instanceof HTMLAnchorElement) {
    node.setAttribute('rel', 'noopener noreferrer')
    node.setAttribute('target', '_blank')
  }
})

export const sanitizeHtml = (dirty: string): string =>
  String(DOMPurify.sanitize(dirty, { ALLOWED_TAGS, ALLOWED_ATTR, ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:)/i }))
