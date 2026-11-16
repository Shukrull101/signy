import { z } from 'zod'

/** Модель угроз: всё, что пришло по сети, — недоверенное до проверки. Парсим Zod'ом на границе. */
export const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
})
export const postsSchema = z.array(postSchema)

export const commentSchema = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
})
export const commentsSchema = z.array(commentSchema)

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  company: z.object({ name: z.string() }).partial().optional(),
})
export const usersSchema = z.array(userSchema)

export const createdSchema = z.object({ id: z.number() }).passthrough()

export type Post = z.infer<typeof postSchema>
export type Comment = z.infer<typeof commentSchema>
export type User = z.infer<typeof userSchema>
