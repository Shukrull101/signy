import { z } from 'zod'

/** Zod-схемы форм: одна схема = и валидация, и TypeScript-тип (z.infer). */
const name = z.string().trim().min(2, 'Минимум 2 символа').max(60, 'Слишком длинное имя')
const email = z.string().trim().min(1, 'Введите e-mail').email('Некорректный e-mail').max(120)
const phone = z
  .string()
  .trim()
  .min(1, 'Введите телефон')
  .regex(/^\+?[0-9\s()-]{9,18}$/, 'Некорректный номер телефона')
const message = z.string().trim().min(5, 'Минимум 5 символов').max(1000, 'Максимум 1000 символов')
const password = z
  .string()
  .min(8, 'Минимум 8 символов')
  .regex(/[A-Za-zА-Яа-я]/, 'Нужна хотя бы одна буква')
  .regex(/[0-9]/, 'Нужна хотя бы одна цифра')

export const demoSchema = z.object({ name, email, phone })
export const contactSchema = z.object({ name, email, phone, message })
export const faqSchema = z.object({ name, email, subject: z.string().trim().min(3, 'Укажите тему').max(120), message })
export const subscribeSchema = z.object({ email })
export const loginSchema = z.object({ email, password: z.string().min(1, 'Введите пароль') })
export const registerSchema = z
  .object({
    name,
    email,
    phone,
    password,
    confirm: z.string().min(1, 'Повторите пароль'),
    agree: z.literal(true, { errorMap: () => ({ message: 'Необходимо согласие' }) }),
  })
  .refine((v) => v.password === v.confirm, { path: ['confirm'], message: 'Пароли не совпадают' })

export type DemoValues = z.infer<typeof demoSchema>
export type ContactValues = z.infer<typeof contactSchema>
export type FaqValues = z.infer<typeof faqSchema>
export type SubscribeValues = z.infer<typeof subscribeSchema>
export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
