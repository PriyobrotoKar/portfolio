import { type Message } from '@/lib/types'
import ChatMessageGroup from './ChatMessageGroup'
import type { Session } from '@auth/core/types'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {} from 'auth-astro/client'
import { motion } from 'framer-motion'
import { chatMessagesAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
import { messages } from '@/constants'

interface ChatScreenProps {
  details: {
    profile_picture: {
      url: string
    }
    name: string
  }
  session: Session | null
}

export default function ChatScreen({
  details,
  session
}: ChatScreenProps): React.JSX.Element {
  const [groupInd, setGroupInd] = useState(1)
  const [msgs, setMessages] = useAtom(chatMessagesAtom)

  console.log('group', msgs, messages)
  const nextGroup = useCallback(() => {
    if (groupInd < messages.length) {
      setMessages([...msgs, messages[groupInd]])
      setGroupInd(groupInd + 1)
    }
  }, [msgs, messages])

  useEffect(() => {
    const isQuestion = msgs[msgs.length - 1][0].type === 'QUESTION'

    const interval = setInterval(() => {
      nextGroup()
    }, 3000)

    if (!session) {
      console.log('clearing interval')
      clearInterval(interval)
    }

    if (isQuestion) {
      console.log('clearing interval')
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [msgs, messages])

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      className=" mt-auto  flex-col justify-end w-full"
    >
      {msgs.map((messages, ind) => (
        <ChatMessageGroup
          key={ind}
          details={details}
          messages={messages}
          session={session}
        />
      ))}
    </motion.div>
  )
}
