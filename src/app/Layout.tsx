import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { Header } from '@/widgets/header/Header'
import { Footer } from '@/widgets/footer/Footer'
import { DemoPopup } from '@/features/demo/DemoPopup'
import { CookieNotice } from '@/features/cookie/CookieNotice'

export function Layout() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(decodeURIComponent(hash.slice(1)))
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-white focus:px-3 focus:py-2">К содержимому</a>
      <Header />
      <main id="main" className="flex-1"><Outlet /></main>
      <Footer />
      <DemoPopup />
      <CookieNotice />
      <ScrollRestoration getKey={(l) => l.pathname} />
    </div>
  )
}
