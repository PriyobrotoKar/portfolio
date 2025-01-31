import { type Message } from '@/lib/types'
import ChatMessageGroup from './ChatMessageGroup'
import type { Session } from '@auth/core/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import {} from 'auth-astro/client'
import { motion } from 'framer-motion'
import { chatMessagesAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
import { errorMessage, messages } from '@/constants'

interface ChatScreenProps {
  details: {
    profile_picture: {
      url: string
    }
    name: string
    clientEmail: string
  }
  session: Session | null
}

export default function ChatScreen({
  details,
  session
}: ChatScreenProps): React.JSX.Element {
  const chatScreenRef = useRef<HTMLDivElement>(null)
  const [groupInd, setGroupInd] = useState(1)
  const [msgs, setMessages] = useAtom(chatMessagesAtom)

  const nextGroup = useCallback(() => {
    if (groupInd < messages.length) {
      if (session?.user?.email !== details.clientEmail) {
        console.log('error', details.clientEmail)
        setMessages([...msgs, [errorMessage]])
        return
      }
      setMessages([...msgs, messages[groupInd]])
      setGroupInd(groupInd + 1)
    }
  }, [msgs, messages])

  useEffect(() => {
    const isQuestion = msgs[msgs.length - 1][0].type === 'QUESTION'
    const isError = msgs[msgs.length - 1][0].type === 'ERROR'

    const interval = setInterval(() => {
      nextGroup()
    }, 2000)

    if (!session) {
      clearInterval(interval)
    }

    if (isQuestion || isError) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [msgs, messages])

  const scrollToBottom = () => {
    if (!chatScreenRef.current) {
      return
    }
    const scrollHeight = chatScreenRef.current.scrollHeight
    const screenHeight = document.documentElement?.clientHeight - 200

    if (scrollHeight > screenHeight) {
      console.log('scrolling')

      chatScreenRef.current.scrollTo({
        top: chatScreenRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.div
      ref={chatScreenRef}
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      className="overflow-y-scroll mt-auto  flex-col justify-end w-full"
    >
      {msgs.map((messages, ind) => (
        <ChatMessageGroup
          groupInd={groupInd}
          key={ind}
          scrollToBottom={scrollToBottom}
          details={details}
          messages={messages}
          session={session}
        />
      ))}
    </motion.div>
  )
}
