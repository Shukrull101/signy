import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
export type Language = 'ru' | 'tj' | 'en'
const dictionaries: Record<Language, Record<string,string>> = {
ru:{about:'О нас',prices:'Цены',blog:'Блог',contacts:'Контакты',videos:'Видео и IT-мемы',login:'Вход',register:'Регистрация',profile:'Профиль',contactTitle:'Наши контакты',contactIntro:'Будем рады познакомиться, ответить на вопросы и обсудить сотрудничество.',writeUs:'Или напишите нам:',address:'Душанбе, ТЦ «Баракат»',academy:'Alif Academy',barakat:'ТЦ «Баракат»',footerText:'Цифровые решения и люди, которые создают будущее.',videoTitle:'Немного frontend-магии и программистского юмора',videoSubtitle:'Полезные видео и мемы для каждого, кто хоть раз открывал DevTools.',send:'Отправить',language:'Язык'},
tj:{about:'Дар бораи мо',prices:'Нархҳо',blog:'Блог',contacts:'Тамос',videos:'Видео ва IT-мемҳо',login:'Воридшавӣ',register:'Бақайдгирӣ',profile:'Профил',contactTitle:'Тамос бо мо',contactIntro:'Мо омодаем ба саволҳои шумо ҷавоб диҳем ва ҳамкориро муҳокима кунем.',writeUs:'Ё ба мо нависед:',address:'Душанбе, маркази савдои «Баракат»',academy:'Alif Academy',barakat:'Маркази савдои «Баракат»',footerText:'Роҳҳои рақамӣ ва одамоне, ки ояндаро месозанд.',videoTitle:'Ҷодуи frontend ва юмори барномасозон',videoSubtitle:'Видеоҳои муфид ва мемҳо барои ҳар касе, ки DevTools-ро кушодааст.',send:'Фиристодан',language:'Забон'},
en:{about:'About',prices:'Pricing',blog:'Blog',contacts:'Contacts',videos:'Videos & IT memes',login:'Log in',register:'Sign up',profile:'Profile',contactTitle:'Get in touch',contactIntro:'We would love to answer your questions and discuss working together.',writeUs:'Or send us a message:',address:'Dushanbe, Barakat Shopping Centre',academy:'Alif Academy',barakat:'Barakat Shopping Centre',footerText:'Digital solutions and people building what comes next.',videoTitle:'Frontend magic and programmer humour',videoSubtitle:'Useful videos and memes for everyone who has opened DevTools.',send:'Send message',language:'Language'}
}
type Ctx = {language:Language;setLanguage:(v:Language)=>void;t:(k:string)=>string}
const LanguageContext=createContext<Ctx|null>(null)
export function LanguageProvider({children}:{children:ReactNode}) {
 const [language,set]=useState<Language>(()=>{const v=localStorage.getItem('signy-language');return v==='tj'||v==='en'?v:'ru'})
 const setLanguage=(v:Language)=>{localStorage.setItem('signy-language',v);set(v)}
 const value=useMemo(()=>({language,setLanguage,t:(k:string)=>dictionaries[language][k]??dictionaries.ru[k]??k}),[language])
 return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
export function useLanguage(){const v=useContext(LanguageContext);if(!v)throw new Error('useLanguage must be used inside LanguageProvider');return v}
