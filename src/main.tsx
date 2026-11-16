import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from '@/app/router'
import { AuthProvider } from '@/features/auth/AuthContext'
import { DemoProvider } from '@/features/demo/DemoContext'
import { preventFraming } from '@/shared/security/csrf'
import { initTrustedTypes } from '@/shared/security/trustedTypes'
import { LanguageProvider } from '@/shared/i18n/LanguageContext'

preventFraming()
initTrustedTypes()

const root = document.getElementById('root')
if (!root) throw new Error('#root не найден')

createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <DemoProvider>
        <LanguageProvider><RouterProvider router={router} /></LanguageProvider>
      </DemoProvider>
    </AuthProvider>
  </StrictMode>,
)
