import type { SVGProps } from 'react'
const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const
type P = SVGProps<SVGSVGElement>
export const IconPlay = (p: P) => <svg {...base} fill="currentColor" stroke="none" {...p}><path d="M8 5v14l11-7z" /></svg>
export const IconClose = (p: P) => <svg {...base} {...p}><path d="M5 5l14 14M19 5L5 19" /></svg>
export const IconMenu = (p: P) => <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
export const IconShield = (p: P) => <svg {...base} {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
export const IconZap = (p: P) => <svg {...base} {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>
export const IconCoin = (p: P) => <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M9 9.5c0-1 1-1.8 3-1.8s3 .8 3 1.8-1 1.6-3 2-3 1-3 2 1 1.8 3 1.8 3-.8 3-1.8M12 6v1.7M12 16.3V18" /></svg>
export const IconPhone = (p: P) => <svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>
export const IconMail = (p: P) => <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
export const IconPin = (p: P) => <svg {...base} {...p}><path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
export const IconShare = (p: P) => <svg {...base} {...p}><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.2 11l7.6-4M8.2 13l7.6 4" /></svg>
export const IconUp = (p: P) => <svg {...base} {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
