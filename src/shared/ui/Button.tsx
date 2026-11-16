import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/shared/lib/cn'

type Variant = 'primary' | 'outline'
const cls: Record<Variant, string> = { primary: 'btn-primary', outline: 'btn-outline' }

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; children: ReactNode }
export function Button({ variant = 'primary', className, children, type = 'button', ...rest }: BtnProps) {
  return <button type={type} className={cn(cls[variant], className)} {...rest}>{children}</button>
}

interface LinkBtnProps extends LinkProps { variant?: Variant }
export function LinkButton({ variant = 'primary', className, ...rest }: LinkBtnProps) {
  return <Link className={cn(cls[variant], className)} {...rest} />
}
