import { RegisterForm } from '@/features/auth/RegisterForm'
import { AuthShell } from './AuthShell'

export function RegisterPage() {
  return <AuthShell crumb="Регистрация" title="Регистрация" subtitle="Создайте аккаунт и подпишите первый документ за три клика"><RegisterForm /></AuthShell>
}
