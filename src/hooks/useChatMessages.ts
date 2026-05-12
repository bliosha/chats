import { useCallback, useRef, useState } from 'react'

type MessageBase = { id: string; time?: string }
export type ReceivedMessage = MessageBase & { type: 'received'; text: string }
export type SentMessage = MessageBase & { type: 'sent'; text: string }
export type EventMessage = MessageBase & { type: 'event'; title: string; subtitle: string }
export type Message = ReceivedMessage | SentMessage | EventMessage

const RANDOM_RESPONSES: string[] = [
  'Keep up the great work! Consistency is the key to progress.',
  'How are you feeling after the last session?',
  "Remember to stay hydrated throughout the day — it's more important than most think.",
  "Don't skip your warm-up today, especially on leg day.",
  'Your progress this week has been impressive. Keep pushing!',
  'Try to get at least 8 hours of sleep tonight — recovery is training too.',
  "New week, new goals. Let's crush it!",
]

const INITIAL_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      type: 'received',
      text: "Welcome to Foundations of Strength! I'm Coach Sarah and I'll be guiding you through your program. Feel free to send me form check videos anytime — I'm here to help.",
      time: '9:00 AM',
    },
    {
      id: '2',
      type: 'sent',
      text: 'Thanks Coach Sarah! Excited to get started. Quick question — should I go lighter on the bench press for the first week?',
      time: '9:15 AM',
    },
    {
      id: '3',
      type: 'received',
      text: "Great question. Yes, start with a weight you can comfortably control for all 4 sets. We'll build up over the next few weeks.",
      time: '10:30 AM',
    },
    {
      id: '4',
      type: 'event',
      title: 'Workout completed',
      subtitle: 'Day 1: Upper Push — 45 min, 6 exercises',
    },
  ],
  '2': [
    {
      id: '1',
      type: 'received',
      text: "Your form on the squat looks solid! Keep that chest up and you'll be good to go.",
      time: '2:00 PM',
    },
  ],
  '3': [
    {
      id: '1',
      type: 'received',
      text: "Don't forget to log your meals today. Nutrition is key this week.",
      time: '11:00 AM',
    },
  ],
}

const getTime = () =>
  new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

export const useChatMessages = (contactId: string) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES[contactId] ?? [])
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

  return { messages, isTyping, sendMessage }
}
