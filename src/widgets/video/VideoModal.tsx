import {useModal} from '@/shared/hooks/useModal'
import type {VideoItem} from '@/entities/video'
import {IconClose,IconPlay} from '@/shared/ui/Icons'
export function VideoModal({video,onClose}:{video:VideoItem|null;onClose:()=>void}) {
 useModal(!!video,onClose);if(!video)return null
 const url=video.youtubeId?`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`:`https://www.youtube.com/results?search_query=${encodeURIComponent(video.searchQuery??video.title)}`
 return <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
  <div role="dialog" aria-modal="true" aria-label={video.title} className="relative w-full max-w-4xl animate-fadeUp"><button type="button" onClick={onClose} aria-label="Закрыть" className="absolute -top-10 right-0 text-white"><IconClose width={28} height={28}/></button>
   <div className="overflow-hidden rounded-xl bg-black shadow-2xl">{video.youtubeId?<iframe title={video.title} src={url} className="aspect-video w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>:<div className="flex aspect-video flex-col items-center justify-center gap-4 p-8 text-center text-white"><IconPlay width={48} height={48}/><p className="text-xl font-semibold">{video.title}</p><p className="max-w-md text-sm text-white/70">{video.description}</p><a href={url} target="_blank" rel="noreferrer" className="btn-primary">Открыть мемы на YouTube ↗</a></div>}</div>
  </div>
 </div>
}
