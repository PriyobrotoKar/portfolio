import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { type Message } from '@/lib/types'
import { Button } from './ui/button'
import { RiGoogleFill } from 'react-icons/ri'

interface ChatMessageGroupProps {
  messages: Message[]
  details: {
    profile_picture: {
      url: string
    }
  }
}

export default function ChatMessageGroup({
  messages,
  details
}: ChatMessageGroupProps): React.JSX.Element {
  const [msgs, setMsgs] = useState([messages[0]])

  const nextMessage = () => {
    setInterval(() => {
      if (msgs.length < messages.length) {
        setMsgs([...msgs, messages[msgs.length]])
      }
    }, 500)
  }

  return (
    <motion.div layout={'preserve-aspect'} className="flex p-4 gap-4">
      <div>
        <img
          src={details.profile_picture.url}
          width="48"
          height="48"
          alt="/"
          className="rounded-full"
        />
      </div>
      <div className="space-y-1">
        {msgs.map((message, ind) => {
          const isLast = messages.length - 1 === ind && messages.length > 1
          const notLast = messages.length - 1 !== ind && messages.length > 1
          return (
            <ChatMessage
              message={message}
              className={[
                isLast && 'rounded-tl-none  mt-1',
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
  message: Message
  nextMessage: () => void
}

const ChatMessage = ({ className, message, nextMessage }: ChatMessageProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      nextMessage()
    }, 800)

    return () => {
      clearInterval(timeout)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('bg-card rounded-lg px-4 py-3 max-w-sm w-fit', className)}
    >
      <RichMessage message={message} />
    </motion.div>
  )
}

const RichMessage = ({ message }: { message: Message }) => {
  if (typeof message === 'string') {
    return <p>{message}</p>
  }

  if (message.type === 'LOGIN') {
    return (
      <div className="space-y-2 pb-1">
        <p>{message.message}</p>
        <Button>
          <RiGoogleFill />
          Login with Google
        </Button>
      </div>
    )
  }
  return <p>{message.message}</p>
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
