import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema, type LoginValues } from '@/shared/lib/formSchemas'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Field'
import { DEMO_PASSWORD, useAuth } from './AuthContext'

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), mode: 'onTouched' })
  const [error, setError] = useState('')

  const onSubmit = handleSubmit(async (v) => {
    setError('')
    try { await login(v); navigate('/profile', { replace: true }) }
    catch (e) { setError(e instanceof Error ? e.message : 'Ошибка входа') }
  })

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full max-w-sm flex-col gap-4">
      <Input label="Электронная почта" type="email" autoComplete="email" placeholder="Sincere@april.biz" error={errors.email?.message} {...register('email')} />
      <Input label="Пароль" type="password" autoComplete="current-password" error={errors.password?.message} {...register('password')} />
      {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Входим…' : 'Войти'}</Button>
      <p className="text-xs text-ink-soft">Демо: e-mail любого пользователя jsonplaceholder (например <b>Sincere@april.biz</b>) и пароль <b>{DEMO_PASSWORD}</b>.</p>
      <p className="text-sm">Нет аккаунта? <Link to="/register" className="font-semibold text-brand hover:underline">Регистрация</Link></p>
    </form>
  )
}
