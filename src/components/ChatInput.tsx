import { RiArrowUpLine, RiEmojiStickerLine } from 'react-icons/ri'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useAtom } from 'jotai'
import { chatMessagesAtom, currentQuestionAtom } from '@/lib/atoms'
import { useEffect, useRef, useState } from 'react'
import type { testimonial } from '@prisma/client'
import type { Message } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import { messages as MSGS } from '@/constants'
import type { Session } from '@auth/core/types'

const MAX_LIMIT = 80

interface ChatInputProps {
  testimonialId: string
  session: Session | null
}

export default function ChatInput({
  testimonialId,
  session
}: ChatInputProps): React.JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [messages, setMessages] = useAtom(chatMessagesAtom)
  const [currentQuestion] = useAtom(currentQuestionAtom)
  const [input, setInput] = useState('')
  const [data, setData] = useState<
    Record<
      keyof Omit<
        testimonial,
        'id' | 'createdAt' | 'updatedAt' | 'email' | 'name'
      >,
      string
    >
  >({
    designation: '',
    message: '',
    profilePicture: session?.user?.image || ''
  })

  const isQuestion = messages[messages.length - 1][0].type === 'QUESTION'

  const handleSubmit = () => {
    if (!currentQuestion) return
    setData((prev) => {
      return {
        ...prev,
        [currentQuestion]: input
      }
    })
    const newMessage: Message = {
      message: () => input,
      type: 'ANSWER',
      field: currentQuestion
    }
    setMessages([...messages, [newMessage]])
    setInput('')
  }

  const submitTestimonial = async () => {
    const response = await fetch(`/api/testimonial/${testimonialId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    if (result.status === 'error') {
      console.error(result.message)
      return
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [textareaRef, input])

  useEffect(() => {
    const isAllQuestionsAnswered = () => {
      return Object.entries(data).every(([key, value]) => {
        return value !== ''
      })
    }

    if (isAllQuestionsAnswered()) {
      submitTestimonial()
    }
  }, [data])

  return (
    <div className="mb-8 bg-card rounded-lg w-full relative z-20 border border-border shadow-[0px_12px_24px_0px_var(--tw-shadow-color)] shadow-black/80">
      <Textarea
        ref={textareaRef}
        placeholder="Type a new message..."
        className="focus-visible:ring-0 resize-none min-h-fit"
        value={input}
        disabled={!isQuestion}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex justify-between px-4 pb-4 items-end">
        <div className="flex gap-2 items-center">
          <RiEmojiStickerLine />
          <span className={cn(input.length > MAX_LIMIT && 'text-destructive')}>
            {input.length} / {MAX_LIMIT}
          </span>
        </div>
        <Button
          disabled={!isQuestion || input.length > MAX_LIMIT}
          onClick={handleSubmit}
          size={'icon'}
        >
          <RiArrowUpLine />{' '}
        </Button>
      </div>
    </div>
  )
}
