import { Link } from 'react-router-dom'
import logo from '@/shared/assets/logo.png'

export function Logo({ className = 'h-8 w-auto', inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <Link to="/" aria-label="Signy — на главную" className="inline-flex shrink-0">
      <img src={logo} alt="Signy" width={131} height={40} className={`${className} ${inverse ? 'brightness-0 invert' : ''}`} />
    </Link>
  )
}
