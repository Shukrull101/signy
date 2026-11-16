import { redirect } from 'react-router-dom'
import { LoginForm } from '@/features/auth/LoginForm'
import { loadSession } from '@/features/auth/authStorage'
import { AuthShell } from './AuthShell'

export const guestLoader = (): null => { if (loadSession()) throw redirect('/profile'); return null }

export function LoginPage() {
  return <AuthShell crumb="Вход" title="Вход" subtitle="Войдите в личный кабинет Signy"><LoginForm /></AuthShell>
}
