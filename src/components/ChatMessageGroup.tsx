import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { type Message } from '@/lib/types'
import { Button } from './ui/button'
import { RiGoogleFill } from 'react-icons/ri'
import { signIn } from 'auth-astro/client'
import type { Session } from '@auth/core/types'
import { useAtom } from 'jotai'
import { currentQuestionAtom } from '@/lib/atoms'

interface ChatMessageGroupProps {
  groupInd: number
  scrollToBottom: () => void
  messages: Message[]
  session: Session | null
  details: {
    name: string
    profile_picture: {
      url: string
    }
    clientEmail: string
  }
}

export default function ChatMessageGroup({
  scrollToBottom,
  groupInd,
  messages,
  details,
  session
}: ChatMessageGroupProps): React.JSX.Element {
  const initialMessages = session
    ? groupInd === 1
      ? messages
      : messages.slice(0, 1)
    : [messages[0]]
  const [msgs, setMsgs] = useState(initialMessages)
  const isAnswer = messages.filter((msg) => msg.type === 'ANSWER').length > 0

  const nextMessage = () => {
    if (msgs.length < messages.length) {
      setMsgs([...msgs, messages[msgs.length]])
    }
  }

  console.log(session?.user?.image)

  return (
    <motion.div
      layout="preserve-aspect"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex p-4 gap-4', isAnswer && ' flex-row-reverse')}
    >
      <div>
        <img
          src={
            isAnswer ? session?.user?.image || '' : details.profile_picture.url
          }
          width="48"
          height="48"
          alt="/"
          className="rounded-full"
        />
      </div>
      <div>
        {msgs.map((message, ind) => {
          const isLast = messages.length - 1 === ind && messages.length > 1
          const notLast = messages.length - 1 !== ind && messages.length > 1
          return (
            <ChatMessage
              key={ind}
              scrollToBottom={scrollToBottom}
              session={session}
              message={message}
              details={details}
              className={[
                isLast && 'rounded-tl-none mt-1 ',
                notLast && 'rounded-bl-none'
              ]}
              nextMessage={nextMessage}
            />
          )
        })}
      </div>
    </motion.div>
  )
}

interface ChatMessageProps {
  className?: string | (string | boolean)[]
  scrollToBottom: () => void
  message: Message
  details: {
    name: string
    profile_picture: {
      url: string
    }
    clientEmail: string
  }
  session: Session | null
  nextMessage: () => void
}

const ChatMessage = ({
  className,
  message,
  scrollToBottom,
  nextMessage,
  session,
  details
}: ChatMessageProps) => {
  useEffect(() => {
    scrollToBottom()
    const timeout = setTimeout(() => {
      nextMessage()
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout="preserve-aspect"
      className={cn('bg-card rounded-lg px-4 py-3 max-w-sm w-fit', className)}
    >
      <RichMessage message={message} session={session} details={details} />
    </motion.div>
  )
}

const RichMessage = ({
  message,
  session,
  details
}: {
  message: Message
  session: Session | null
  details: {
    name: string
    profile_picture: {
      url: string
    }
    clientEmail: string
  }
}) => {
  const setCurrentQuestion = useAtom(currentQuestionAtom)[1]

  if (message.type === 'LOGIN') {
    return (
      <div className="space-y-2 pb-1">
        <p>{message.message()}</p>
        <Button
          disabled={!!session && session.user?.email === details.clientEmail}
          onClick={async () => {
            await signIn('google')
          }}
        >
          <RiGoogleFill />
          Login with Google
        </Button>
      </div>
    )
  }
  if (message.type === 'QUESTION') {
    useEffect(() => {
      setCurrentQuestion(message.field)
    }, [])

    return (
      <div className="space-y-2 pb-1">
        <p>{message.message()}</p>
      </div>
    )
  }
  return <p>{message.message(details.name.split(' ')[0])}</p>
}

const TypingIndicator = () => {
  return (
    <div className="flex gap-1 items-center pt-2 pb-1">
      <div className="animate-typing size-2 rounded-full bg-muted-foreground"></div>
      <div className="animate-typing size-2 delay-75 rounded-full bg-gray-500"></div>
      <div className="animate-typing size-2 delay-100 bg-gray-500 rounded-full"></div>
    </div>
  )
}
