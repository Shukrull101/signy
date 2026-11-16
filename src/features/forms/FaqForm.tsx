import { faqSchema, type FaqValues } from '@/shared/lib/formSchemas'
import { Button } from '@/shared/ui/Button'
import { Input, Textarea } from '@/shared/ui/Field'
import { useLeadForm } from './useLeadForm'

export function FaqForm() {
  const { form: { register, formState: { errors } }, status, serverError, submit } = useLeadForm<FaqValues>(faqSchema, 'faq')
  if (status === 'done') return <p role="status" className="text-center font-serif text-2xl font-bold">Отлично! Мы ответим на e-mail в ближайшее время.</p>
  return (
    <form onSubmit={submit} noValidate className="mx-auto flex max-w-md flex-col gap-4">
      <Input placeholder="Ваше имя" aria-label="Имя" error={errors.name?.message} {...register('name')} />
      <Input type="email" placeholder="E-mail" aria-label="E-mail" error={errors.email?.message} {...register('email')} />
      <Input placeholder="Тема" aria-label="Тема" error={errors.subject?.message} {...register('subject')} />
      <Textarea placeholder="Ваш вопрос" aria-label="Сообщение" error={errors.message?.message} {...register('message')} />
      {serverError && <p role="alert" className="text-sm text-red-600">{serverError}</p>}
      <Button type="submit" disabled={status === 'sending'} className="self-center">{status === 'sending' ? 'Отправка…' : 'Отправить'}</Button>
    </form>
  )
}
