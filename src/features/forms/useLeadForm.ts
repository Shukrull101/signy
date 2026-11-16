import { useState } from 'react'
import { useForm, type Resolver, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { leadsApi } from '@/shared/api/endpoints'

type Status = 'idle' | 'sending' | 'done' | 'error'

export interface LeadForm<T extends Record<string, string>> {
  form: UseFormReturn<T>
  status: Status
  serverError: string
  submit: (e?: React.BaseSyntheticEvent) => Promise<void>
  reset: () => void
}

/** React Hook Form + Zod + отправка на API. Один хук на все формы (демо, контакты, FAQ, подписка). */
export function useLeadForm<T extends Record<string, string>>(schema: z.ZodType<T, z.ZodTypeDef, unknown>, subject: string): LeadForm<T> {
  const form = useForm<T>({ resolver: zodResolver(schema) as unknown as Resolver<T>, mode: 'onTouched' })
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')

  const submit = form.handleSubmit(async (values) => {
    setStatus('sending'); setServerError('')
    try {
      await leadsApi.send({ subject, ...values })
      setStatus('done')
    } catch (e) {
      setStatus('error')
      setServerError(e instanceof Error ? e.message : 'Не удалось отправить, попробуйте позже')
    }
  })
  return { form, status, serverError, submit, reset: () => { form.reset(); setStatus('idle'); setServerError('') } }
}
