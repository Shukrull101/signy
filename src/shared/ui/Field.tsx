import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

interface Common { label?: string; error?: string }

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & Common>(function Input(
  { label, error, id, className, ...rest }, ref,
) {
  const fid = id ?? rest.name
  return (
    <div className="w-full">
      {label && <label htmlFor={fid} className="mb-1 block text-xs font-semibold text-ink">{label}</label>}
      <input ref={ref} id={fid} aria-invalid={!!error} aria-describedby={error ? `${fid}-err` : undefined} className={cn('field', error && 'field-error', className)} {...rest} />
      {error && <p id={`${fid}-err`} role="alert" className="mt-1 pl-3 text-xs text-red-600">{error}</p>}
    </div>
  )
})

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & Common>(function Textarea(
  { label, error, id, className, ...rest }, ref,
) {
  const fid = id ?? rest.name
  return (
    <div className="w-full">
      {label && <label htmlFor={fid} className="mb-1 block text-xs font-semibold text-ink">{label}</label>}
      <textarea ref={ref} id={fid} rows={4} aria-invalid={!!error} aria-describedby={error ? `${fid}-err` : undefined} className={cn('field rounded-2xl', error && 'field-error', className)} {...rest} />
      {error && <p id={`${fid}-err`} role="alert" className="mt-1 pl-3 text-xs text-red-600">{error}</p>}
    </div>
  )
})
