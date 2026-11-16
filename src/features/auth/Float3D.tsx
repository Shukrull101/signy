/** 3D-композиция для страниц входа: слои-документы парят в перспективе и вращаются. Чистый CSS 3D. */
export function Float3D() {
  return (
    <div className="perspective relative mx-auto h-64 w-64 sm:h-80 sm:w-80" aria-hidden>
      <div className="preserve-3d absolute inset-0 animate-spin3d" style={{ transform: 'rotateX(-18deg)' }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="preserve-3d absolute inset-x-8 inset-y-6 rounded-xl border border-brand/30 bg-white/80 p-4 shadow-card"
            style={{ transform: `translateZ(${(i - 1.5) * 38}px) rotateY(${i * 6}deg)` }}>
            <div className="mb-3 h-2.5 w-1/2 rounded bg-brand/70" />
            <div className="mb-2 h-2 w-full rounded bg-sky-soft" /><div className="mb-2 h-2 w-5/6 rounded bg-sky-soft" /><div className="mb-2 h-2 w-4/6 rounded bg-sky-soft" />
            <svg viewBox="0 0 80 24" className="mt-5 h-6 w-20 text-brand" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M2 18c8-18 12 8 20-6s10 8 18-2 12 6 20-4" /></svg>
          </div>
        ))}
      </div>
      <div className="absolute -bottom-2 left-1/2 h-4 w-40 -translate-x-1/2 animate-float rounded-full bg-ink/10 blur-md" />
    </div>
  )
}
