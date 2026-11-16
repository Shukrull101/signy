import { Link } from 'react-router-dom'
import { Section, SectionTitle } from '@/shared/ui/Section'

const QUESTIONS = [
  'Нужно ли что-то устанавливать для работы с сервисом?',
  'Какие документы можно подписывать электронной подписью?',
  'Как защищены мои документы и ключи?',
  'Можно ли подписывать с телефона?',
  'Сколько стоит подписание одного документа?',
] as const

export function PopularQuestions() {
  return (
    <Section tone="sky">
      <SectionTitle>Популярные вопросы и ответы на них</SectionTitle>
      <ul className="mx-auto max-w-2xl space-y-3 text-sm">
        {QUESTIONS.map((q) => (
          <li key={q} className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><Link to="/faq" className="transition hover:text-brand hover:underline">{q}</Link></li>
        ))}
      </ul>
    </Section>
  )
}
