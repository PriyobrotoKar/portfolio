import type { testimonial } from '@prisma/client'
import type { Omit } from '@prisma/client/runtime/library'
import { z } from 'astro/zod'

export const contactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required!' }),
  email: z.string().email().min(1, { message: 'Email is required.' }),
  message: z
    .string()
    .min(1, { message: 'A message is required' })
    .max(500, { message: 'Message cannot be more than 500 letters' })
})

export const testimonialSchema = z.object({
  name: z.string().min(1, { message: 'Name is required!' }),
  email: z.string().email().min(1, { message: 'Email is required.' })
})

export type ApiResponse = {
  status: 'error' | 'success'
  message: 'string'
}

export type Message = {
  message: (...args: string[]) => string
  type?: 'LOGIN' | 'QUESTION' | 'ANSWER'
  field?: keyof Omit<
    testimonial,
    'id' | 'createdAt' | 'updatedAt' | 'email' | 'name'
  >
}
