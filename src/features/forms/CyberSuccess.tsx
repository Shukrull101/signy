export function CyberSuccess({onAgain,compact=false}:{onAgain?:()=>void;compact?:boolean}) {
 return <div role="status" aria-live="polite" className={`cyber-success relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-[#061321] p-6 text-center text-white ${compact?'':'min-h-64'}`}>
  <div className="cyber-grid absolute inset-0 opacity-40"/>
  <div className="relative mx-auto flex max-w-sm flex-col items-center">
   <div className="cyber-orbit relative mb-4 flex h-28 w-28 items-center justify-center rounded-full border border-cyan-300/50">
    <span className="absolute h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_5px_rgba(34,211,238,.8)]"/>
    <svg viewBox="0 0 64 64" className="cyber-rocket h-14 w-14 text-cyan-200" fill="none" stroke="currentColor" strokeWidth="2"><path d="M32 5C20 14 18 28 18 39l14 12 14-12C46 28 44 14 32 5Z"/><path d="m24 37 8 7 8-7M27 22h10M32 51l-5 8m5-8 5 8" strokeLinecap="round"/><circle cx="32" cy="29" r="4"/></svg>
   </div>
   <p className="font-mono text-[10px] uppercase tracking-[.35em] text-cyan-300">Transmission complete · 200 OK</p>
   <h3 className="mt-2 text-xl font-bold">Сообщение доставлено!</h3>
   <p className="mt-2 text-sm text-white/65">Пакет успешно прошёл через цифровой канал. Мы скоро свяжемся с вами.</p>
   {onAgain&&<button type="button" onClick={onAgain} className="mt-5 rounded-full border border-cyan-300/50 px-5 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-300/10">Отправить ещё</button>}
  </div>
 </div>
}
