import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { registerSchema, type RegisterValues } from '@/shared/lib/formSchemas'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Field'
import { useAuth } from './AuthContext'

export function RegisterForm() {
  const { register: signUp } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema), mode: 'onTouched' })
  const [error, setError] = useState('')

  const onSubmit = handleSubmit(async (v) => {
    setError('')
    try { await signUp(v); navigate('/profile', { replace: true }) }
    catch (e) { setError(e instanceof Error ? e.message : 'Ошибка регистрации') }
  })

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full max-w-sm flex-col gap-3">
      <Input label="Имя*" autoComplete="name" error={errors.name?.message} {...register('name')} />
      <Input label="Электронная почта*" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
      <Input label="Телефон*" type="tel" autoComplete="tel" placeholder="+380 00 000 00 00" error={errors.phone?.message} {...register('phone')} />
      <Input label="Пароль*" type="password" autoComplete="new-password" error={errors.password?.message} {...register('password')} />
      <Input label="Повторите пароль*" type="password" autoComplete="new-password" error={errors.confirm?.message} {...register('confirm')} />
      <label className="flex items-start gap-2 text-xs text-ink-soft">
        <input type="checkbox" className="mt-0.5 accent-brand" {...register('agree')} />
        <span>Согласен с условиями договора-оферты и обработкой персональных данных</span>
      </label>
      {errors.agree && <p role="alert" className="-mt-1 text-xs text-red-600">{errors.agree.message}</p>}
      {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Создаём…' : 'Зарегистрироваться'}</Button>
      <p className="text-sm">Уже есть аккаунт? <Link to="/login" className="font-semibold text-brand hover:underline">Войти</Link></p>
    </form>
  )
}
