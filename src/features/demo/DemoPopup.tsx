import {useEffect} from 'react'
import {demoSchema,type DemoValues} from '@/shared/lib/formSchemas'
import {useModal} from '@/shared/hooks/useModal'
import {Button} from '@/shared/ui/Button'
import {Input} from '@/shared/ui/Field'
import {IconClose} from '@/shared/ui/Icons'
import {useLeadForm} from '@/features/forms/useLeadForm'
import {useDemo} from './DemoContext'
import {CyberSuccess} from '@/features/forms/CyberSuccess'
export function DemoPopup() {
 const {open,closeDemo}=useDemo()
 const {form:{register,formState:{errors}},status,serverError,submit,reset}=useLeadForm<DemoValues>(demoSchema,'demo')
 useModal(open,closeDemo)
 useEffect(()=>{if(!open){const timer=setTimeout(reset,300);return()=>clearTimeout(timer)}return undefined},[open])
 if(!open)return null
 const done=status==='done'
 return <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm" onMouseDown={e=>{if(e.target===e.currentTarget)closeDemo()}}>
  <div role="dialog" aria-modal="true" aria-labelledby="demo-title" className="perspective relative w-full max-w-sm">
   <div className="relative animate-fadeUp rounded-lg bg-sky-soft p-6 shadow-card sm:p-8">
    <button type="button" onClick={closeDemo} aria-label="Закрыть" className="absolute right-3 top-3 text-brand transition hover:rotate-90"><IconClose/></button>
    <h2 id="demo-title" className="mb-2 text-center text-xl">Запросить консультацию</h2>
    {done?<><CyberSuccess onAgain={reset} compact/><Button variant="outline" className="mt-5 w-full" onClick={closeDemo}>Закрыть</Button></>:<>
     <p className="mb-5 text-center text-xs text-ink-soft">Оставьте контакты — мы свяжемся с вами.</p>
     <form onSubmit={submit} noValidate className="flex flex-col gap-3">
      <Input label="Имя*" placeholder="Иван" autoComplete="name" error={errors.name?.message} {...register('name')}/>
      <Input label="Электронная почта*" type="email" placeholder="ivan@mail.com" autoComplete="email" error={errors.email?.message} {...register('email')}/>
      <Input label="Телефон*" type="tel" placeholder="+992 900 000 000" autoComplete="tel" error={errors.phone?.message} {...register('phone')}/>
      {serverError&&<p role="alert" className="text-xs text-red-600">{serverError}</p>}
      <Button type="submit" disabled={status==='sending'} className="mt-2 self-center">{status==='sending'?'Передача данных…':'Отправить'}</Button>
     </form>
    </>}
   </div>
  </div>
 </div>
}
