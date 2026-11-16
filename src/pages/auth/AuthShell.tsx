import type { ReactNode } from 'react'
import { Float3D } from '@/features/auth/Float3D'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'

export function AuthShell({ title, subtitle, crumb, children }: { title: string; subtitle: string; crumb: string; children: ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-sky-soft to-white">
      <div className="container-x pb-14">
        <Breadcrumbs items={[{ label: crumb }]} />
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-sm lg:mx-0">
            <h1 className="text-3xl sm:text-4xl">{title}</h1>
            <p className="mb-6 mt-2 text-sm text-ink-soft">{subtitle}</p>
            {children}
          </div>
          <div className="hidden sm:block"><Float3D /></div>
        </div>
      </div>
    </div>
  )
}
