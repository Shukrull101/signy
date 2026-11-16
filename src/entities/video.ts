export interface VideoItem {id:number;title:string;date:string;duration:string;youtubeId?:string;searchQuery?:string;description:string}
export const VIDEOS:readonly VideoItem[]=[
{id:101,title:'JavaScript за 100 секунд',date:'Fireship',duration:'01:40',youtubeId:'DHjqpvDnNGE',description:'Быстрый обзор языка JavaScript.'},
{id:102,title:'CSS за 100 секунд',date:'Fireship',duration:'01:40',youtubeId:'OEV8gMkCHXQ',description:'Стили, каскад и магия CSS.'},
{id:103,title:'React за 100 секунд',date:'Fireship',duration:'01:40',youtubeId:'Tn6-PIqc4UM',description:'Компоненты, props и hooks.'},
{id:104,title:'Когда CSS опять не слушается',date:'YouTube подборка',duration:'Мемы',searchQuery:'frontend developer memes CSS not working compilation',description:'Подборка мемов о верстке и CSS.'},
{id:105,title:'Жизнь junior frontend-разработчика',date:'YouTube подборка',duration:'Мемы',searchQuery:'junior developer programming memes compilation',description:'Знакомые ситуации из жизни начинающего разработчика.'},
{id:106,title:'Когда на проде всё работает',date:'YouTube подборка',duration:'Мемы',searchQuery:'programmer memes production bug compilation',description:'Юмор про баги, дедлайны и релизы.'}
]
