import { contactSchema, type ContactValues } from '@/shared/lib/formSchemas'
import { Button } from '@/shared/ui/Button'
import { Input, Textarea } from '@/shared/ui/Field'
import { useLeadForm } from './useLeadForm'
import { CyberSuccess } from './CyberSuccess'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export function ContactForm() {
  const { t } = useLanguage()
  const { form: { register, formState: { errors } }, status, serverError, submit, reset } = useLeadForm<ContactValues>(contactSchema, 'contacts')
  if (status === 'done') return <CyberSuccess onAgain={reset} />
  return (
    <form onSubmit={submit} noValidate className="flex max-w-md flex-col gap-4">
      <Input label="Имя*" autoComplete="name" error={errors.name?.message} {...register('name')} />
      <Input label="Электронная почта*" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
      <Input label="Телефон*" type="tel" autoComplete="tel" placeholder="+380 00 000 00 00" error={errors.phone?.message} {...register('phone')} />
      <Textarea label="Сообщение*" error={errors.message?.message} {...register('message')} />
      {serverError && <p role="alert" className="text-sm text-red-600">{serverError}</p>}
      <Button type="submit" disabled={status === 'sending'} className="self-start">{status === 'sending' ? 'Передача данных…' : t('send')}</Button>
    </form>
  )
}
