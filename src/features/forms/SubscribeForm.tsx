import { subscribeSchema, type SubscribeValues } from '@/shared/lib/formSchemas'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Field'
import { useLeadForm } from './useLeadForm'

export function SubscribeForm() {
  const { form: { register, formState: { errors } }, status, serverError, submit } = useLeadForm<SubscribeValues>(subscribeSchema, 'subscribe')
  if (status === 'done') return <p role="status" className="font-serif text-2xl font-bold">Отлично! <span className="block font-sans text-base font-normal text-ink-soft">Теперь вы в курсе всех важных новостей.</span></p>
  return (
    <form onSubmit={submit} noValidate className="mx-auto flex w-full max-w-xl flex-col items-start gap-3 sm:flex-row">
      <Input type="email" autoComplete="email" placeholder="example@mail.com" aria-label="E-mail" error={errors.email?.message} {...register('email')} />
      <Button type="submit" disabled={status === 'sending'} className="w-full shrink-0 sm:w-auto">{status === 'sending' ? '...' : 'Отправить'}</Button>
      {serverError && <p role="alert" className="text-xs text-red-600">{serverError}</p>}
    </form>
  )
}
