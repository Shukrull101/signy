import { redirect, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import { loadSession } from '@/features/auth/authStorage'
import { Button } from '@/shared/ui/Button'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'

/** Защищённый маршрут: нет сессии → редирект на /login (проверка в loader до рендера). */
export const authLoader = (): null => { if (!loadSession()) throw redirect('/login'); return null }

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  if (!user) return null
  return (
    <div className="container-x pb-14">
      <Breadcrumbs items={[{ label: 'Личный кабинет' }]} />
      <h1 className="mb-6 mt-4 text-3xl sm:text-4xl">Здравствуйте, {user.name}!</h1>
      <dl className="mb-8 grid max-w-md gap-3 rounded-lg bg-sky-soft p-6 text-sm">
        <div><dt className="text-xs text-ink-soft">E-mail</dt><dd className="font-semibold">{user.email}</dd></div>
        {user.phone && <div><dt className="text-xs text-ink-soft">Телефон</dt><dd className="font-semibold">{user.phone}</dd></div>}
        <div><dt className="text-xs text-ink-soft">ID</dt><dd className="font-semibold">{user.id}</dd></div>
      </dl>
      <Button variant="outline" onClick={() => { logout(); navigate('/') }}>Выйти</Button>
    </div>
  )
}
