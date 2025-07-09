import { atom } from 'jotai'
import type { Message } from './types'
import type { testimonial } from '@prisma/client'
import { messages } from '@/constants'

export const currentQuestionAtom = atom<
  | keyof Omit<testimonial, 'id' | 'createdAt' | 'updatedAt' | 'email' | 'name'>
  | undefined
>(undefined)

export const chatMessagesAtom = atom<Message[][]>([messages[0]])
