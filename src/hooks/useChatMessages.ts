import { useCallback, useMemo, useRef, useState } from 'react'

type MessageBase = { id: string; time?: string }

export type ReceivedMessage = MessageBase & {
  type: 'received'
  text: string
}

export type SentMessage = MessageBase & {
  type: 'sent'
  text: string
}

export type EventMessage = MessageBase & {
  type: 'event'
  title: string
  subtitle: string
}

export type Message = ReceivedMessage | SentMessage | EventMessage

const RANDOM_RESPONSES: string[] = [
  'Keep up the great work! Consistency is the key to progress.',
  'How are you feeling after the last session?',
  'Remember to stay hydrated throughout the day.',
  "Don't skip your warm-up today.",
  'Your progress this week has been impressive.',
  'Recovery is training too.',
  "New week, new goals. Let's crush it!",
]

const EXTRA_USER_MESSAGES = [
  'Today felt much stronger than last session.',
  'Should I increase the weight next week?',
  'My recovery has been way better lately.',
  'Cardio felt easier today.',
  'I focused on technique instead of weight.',
  'Nutrition has been consistent this week.',
]

const EXTRA_COACH_MESSAGES = [
  'That is exactly the mindset we want.',
  'Focus on consistency over intensity.',
  'Technique first, weight second.',
  'Your recovery metrics look solid.',
  'Keep tracking your sleep and hydration.',
  'You are progressing faster than expected.',
]

const BASE_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      type: 'received',
      text: 'Welcome to Foundations of Strength!',
      time: '9:00 AM',
    },
    {
      id: '2',
      type: 'sent',
      text: 'Thanks coach! Excited to start.',
      time: '9:05 AM',
    },
  ],

  '2': [
    {
      id: '1',
      type: 'received',
      text: 'Your squat form looks solid.',
      time: '2:00 PM',
    },
  ],

  '3': [
    {
      id: '1',
      type: 'received',
      text: "Don't forget to log your meals today.",
      time: '11:00 AM',
    },
  ],
}

function generateMessages(base: Message[], total: number): Message[] {
  const messages = [...base]

  while (messages.length < total) {
    const id = String(messages.length + 1)

    const shouldAddEvent = messages.length % 12 === 0

    if (shouldAddEvent) {
      messages.push({
        id,
        type: 'event',
        title: 'Workout completed',
        subtitle: `Session ${Math.ceil(messages.length / 12)} completed`,
      })

      continue
    }

    const isUser = messages.length % 2 === 0

    if (isUser) {
      messages.push({
        id,
        type: 'sent',
        text: EXTRA_USER_MESSAGES[Math.floor(Math.random() * EXTRA_USER_MESSAGES.length)],
        time: getTime(),
      })
    } else {
      messages.push({
        id,
        type: 'received',
        text: EXTRA_COACH_MESSAGES[Math.floor(Math.random() * EXTRA_COACH_MESSAGES.length)],
        time: getTime(),
      })
    }
  }

  return messages
}

const getTime = () =>
  new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

export const useChatMessages = (contactId: string) => {
  const initialMessages = useMemo(() => generateMessages(BASE_MESSAGES[contactId] ?? [], 200), [contactId])

  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const [isTyping, setIsTyping] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return

    const sent: SentMessage = {
      id: Date.now().toString(),
      type: 'sent',
      text: text.trim(),
      time: getTime(),
    }

    setMessages(prev => [...prev, sent])

    if (timerRef.current) return

    setIsTyping(true)

    timerRef.current = setTimeout(() => {
      const responseText = RANDOM_RESPONSES[Math.floor(Math.random() * RANDOM_RESPONSES.length)]

      const received: ReceivedMessage = {
        id: (Date.now() + 1).toString(),
        type: 'received',
        text: responseText,
        time: getTime(),
      }

      setMessages(prev => [...prev, received])

      setIsTyping(false)
      timerRef.current = null
    }, 5000)
  }, [])

  return {
    messages,
    isTyping,
    sendMessage,
  }
}
