import {useEffect,useState} from 'react'
import udi from '@/shared/assets/partner-udi.png'
import nova from '@/shared/assets/partner-novaposhta.png'
import hlib from '@/shared/assets/partner-hlib.png'
import nix from '@/shared/assets/partner-nix.png'
import {SectionTitle} from '@/shared/ui/Section'
const PARTNERS=[{name:'Ukrainian Defense Industry',src:udi},{name:'Нова Пошта',src:nova},{name:'Хліб',src:hlib},{name:'N-iX',src:nix}]
function useCols():number {
 const calc=()=>window.innerWidth>=1024?4:window.innerWidth>=640?2:1
 const [cols,setCols]=useState(calc)
 useEffect(()=>{const onResize=()=>setCols(calc());window.addEventListener('resize',onResize);return()=>window.removeEventListener('resize',onResize)},[])
 return cols
}
export function PartnersSlider({title='Друзья Signy'}:{title?:string}) {
 const cols=useCols(),pages=Math.ceil(PARTNERS.length/cols)
 const [page,setPage]=useState(0)
 useEffect(()=>setPage(0),[cols])
 useEffect(()=>{const timer=setInterval(()=>setPage(p=>(p+1)%pages),4000);return()=>clearInterval(timer)},[pages])
 const shown=PARTNERS.slice(page*cols,page*cols+cols)
 return <div><SectionTitle>{title}</SectionTitle>
  <ul className="grid min-h-24 items-center gap-6" style={{gridTemplateColumns:`repeat(${cols},minmax(0,1fr))`}}>
   {shown.map(p=><li key={p.name} className="flex h-24 items-center justify-center rounded-xl border border-black/5 bg-white p-5 transition hover:-translate-y-1 hover:shadow-card"><img src={p.src} alt={p.name} loading="lazy" className="max-h-14 max-w-full object-contain"/></li>)}
  </ul>
  <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Страницы слайдера">{Array.from({length:pages},(_,i)=><button key={i} type="button" role="tab" aria-selected={i===page} aria-label={`Слайд ${i+1}`} onClick={()=>setPage(i)} className={`h-2.5 w-2.5 rounded-full transition ${i===page?'bg-brand':'bg-brand/25 hover:bg-brand/50'}`}/>)}</div>
 </div>
}
