import type {VideoItem} from '@/entities/video'
import {Placeholder} from '@/shared/ui/Placeholder'
import {Tilt} from '@/shared/ui/Tilt'
import {IconPlay} from '@/shared/ui/Icons'
import {cn} from '@/shared/lib/cn'
export function PlayButton({big=false}:{big?:boolean}) {return <span className={cn('flex items-center justify-center rounded-full bg-white/95 text-brand shadow-card transition group-hover:scale-110',big?'h-20 w-20':'h-12 w-12')}><IconPlay width={big?32:20} height={big?32:20} className="ml-0.5"/></span>}
export function VideoCard({v,onPlay,big=false}:{v:VideoItem;onPlay:(v:VideoItem)=>void;big?:boolean}) {
 const thumb=v.youtubeId?`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`:null
 return <Tilt max={4}><button type="button" onClick={()=>onPlay(v)} aria-label={`Смотреть: ${v.title}`} className="group block w-full text-left">
  <span className={cn('relative block overflow-hidden rounded-lg bg-ink',big?'aspect-[16/8]':'aspect-video')}>{thumb?<img src={thumb} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>:<Placeholder id={v.id} className="h-full w-full"/>}<span className="absolute inset-0 flex items-center justify-center bg-ink/20"><PlayButton big={big}/></span>{!v.youtubeId&&<span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[10px] font-semibold text-white">YOUTUBE MEME</span>}</span>
  <span className="mt-2 block text-sm font-semibold group-hover:text-brand">{v.title}</span><span className="block text-xs text-ink-soft">{v.date} · {v.duration}</span><span className="mt-1 block text-xs text-ink-soft">{v.description}</span>
 </button></Tilt>
}
