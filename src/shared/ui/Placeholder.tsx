import photo1 from '@/shared/assets/workspace-devices.jpg'
import photo2 from '@/shared/assets/digital-workspace.jpg'
import photo3 from '@/shared/assets/developer-laptop.jpg'
import photo4 from '@/shared/assets/laptop-closeup.jpg'
import photo5 from '@/shared/assets/team-meeting.jpg'
import photo6 from '@/shared/assets/team-work.jpg'
import photo7 from '@/shared/assets/office-team.jpg'
import photo8 from '@/shared/assets/documents-stack.jpg'
import photo9 from '@/shared/assets/tablet-desk.png'
const PHOTOS=[photo1,photo2,photo3,photo4,photo5,photo6,photo7,photo8,photo9]
export function Placeholder({id,className=''}:{id:number;className?:string}) {
 const src=PHOTOS[Math.abs(id)%PHOTOS.length]??photo1
 return <img src={src} alt="Рабочее пространство и цифровые технологии" loading="lazy" className={`${className} h-full w-full object-cover`}/>
}
