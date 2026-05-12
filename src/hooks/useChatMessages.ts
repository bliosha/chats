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
    { id: '1', type: 'received', text: "Welcome to Foundations of Strength! I'm Coach Sarah and I'll be guiding you through your program. Feel free to send me form check videos anytime — I'm here to help.", time: '9:00 AM' },
    { id: '2', type: 'sent', text: 'Thanks Coach Sarah! Excited to get started. Quick question — should I go lighter on the bench press for the first week?', time: '9:15 AM' },
    { id: '3', type: 'received', text: "Great question. Yes, start with a weight you can comfortably control for all 4 sets. We'll build up over the next few weeks.", time: '10:30 AM' },
    { id: '4', type: 'event', title: 'Workout completed', subtitle: 'Day 1: Upper Push — 45 min, 6 exercises' },
    { id: '5', type: 'sent', text: 'Day 1 done! Bench felt good at 60kg, overhead press was tough on the last set though.', time: '6:45 PM' },
    { id: '6', type: 'received', text: "That's totally normal — overhead press is a humbling movement for most people. Don't chase the weight, chase the technique.", time: '7:02 PM' },
    { id: '7', type: 'sent', text: 'Got it. Should I be doing any extra cardio on rest days?', time: '7:05 PM' },
    { id: '8', type: 'received', text: "Light walking or 20 min of zone 2 cardio is fine on rest days. Nothing that spikes your heart rate above 130. The goal right now is recovery, not extra volume.", time: '7:18 PM' },
    { id: '9', type: 'event', title: 'Workout completed', subtitle: 'Day 2: Lower — 50 min, 5 exercises' },
    { id: '10', type: 'sent', text: 'Squats felt heavy today. My lower back was a bit sore after the deadlifts last session — is that normal?', time: '11:20 AM' },
    { id: '11', type: 'received', text: "Some soreness in the erectors is expected, especially in week 1. If it's a sharp pain or stays past 48 hours, let me know. Otherwise it's just your body adapting.", time: '11:45 AM' },
    { id: '12', type: 'sent', text: "It's more of a dull ache, not sharp. I'll keep an eye on it.", time: '11:48 AM' },
    { id: '13', type: 'received', text: 'Perfect. Make sure you warm up with some cat-cow and hip circles before your next lower session. 5 minutes makes a big difference.', time: '12:01 PM' },
    { id: '14', type: 'sent', text: "Will do! Also, I've been sleeping about 6 hours a night — is that enough?", time: '8:30 PM' },
    { id: '15', type: 'received', text: "Honestly? No. 6 hours is where performance starts to drop. Aim for 7.5–8. I know life gets busy but sleep is when you actually grow stronger — not in the gym.", time: '8:44 PM' },
    { id: '16', type: 'sent', text: "Fair point. I'll try going to bed earlier this week.", time: '8:46 PM' },
    { id: '17', type: 'event', title: 'Workout completed', subtitle: 'Day 3: Upper Pull — 48 min, 6 exercises' },
    { id: '18', type: 'received', text: "Nice work this week! You've completed 3 out of 4 sessions. How are you feeling overall?", time: '9:00 AM' },
    { id: '19', type: 'sent', text: "Pretty good actually! More tired than I expected but motivated. Rows felt strong today.", time: '9:12 AM' },
    { id: '20', type: 'received', text: "Love to hear it. Week 2 we'll add a small amount of volume — nothing dramatic. Your body is just starting to adapt so let's keep riding that momentum.", time: '9:25 AM' },
    { id: '21', type: 'sent', text: "Sounds good. One more thing — my protein intake has been around 120g a day. Is that enough for my weight?", time: '9:28 AM' },
    { id: '22', type: 'received', text: "You told me you're 80kg, right? Aim for 0.8–1g per pound of bodyweight, so roughly 140–175g. 120g is a decent start but try to add a shake or Greek yogurt to push it higher.", time: '9:40 AM' },
    { id: '23', type: 'sent', text: "I didn't realize it was that high. I'll track more carefully this week.", time: '9:42 AM' },
    { id: '24', type: 'event', title: 'Week 1 complete', subtitle: '4/4 workouts done · Great consistency!' },
  ],
  '2': [
    { id: '1', type: 'received', text: "Your form on the squat looks solid! Keep that chest up and you'll be good to go.", time: '2:00 PM' },
    { id: '2', type: 'sent', text: "Thanks! I've been working on keeping my torso more upright. Low bar or high bar for the main sets?", time: '2:14 PM' },
    { id: '3', type: 'received', text: "Stick with high bar for now — it'll reinforce the upright torso we want. Low bar is great for powerlifting but less transferable to your goals right now.", time: '2:30 PM' },
    { id: '4', type: 'sent', text: 'Makes sense. My knees track inward a bit on the way up — what cues help with that?', time: '2:33 PM' },
    { id: '5', type: 'received', text: '"Spread the floor" — imagine pushing the ground apart with your feet as you stand up. Also try slightly pointing your toes out at 30 degrees. That alone fixes a lot of knee cave.', time: '2:48 PM' },
    { id: '6', type: 'sent', text: 'Tried it on my next set — way better! Felt more stable too.', time: '3:05 PM' },
    { id: '7', type: 'received', text: "Exactly! Once you feel that stability it becomes second nature. Send me a video next session and we'll check the depth too.", time: '3:10 PM' },
    { id: '8', type: 'event', title: 'Workout completed', subtitle: 'Legs — 55 min, 5 exercises' },
    { id: '9', type: 'sent', text: 'Here is the squat video from today. First set was at 80kg.', time: '5:20 PM' },
    { id: '10', type: 'received', text: "Good depth! I can see you're hitting just below parallel which is exactly where we want to be. The only thing I'd tweak is your breathing — brace harder before you unrack.", time: '5:45 PM' },
    { id: '11', type: 'sent', text: 'Oh interesting — I thought I was bracing enough. How hard should it be?', time: '5:47 PM' },
    { id: '12', type: 'received', text: 'Think of it like someone is about to punch you in the stomach. Take a big breath, fill your belly, then squeeze everything hard. Your brace should be almost uncomfortable.', time: '6:02 PM' },
    { id: '13', type: 'sent', text: 'Haha okay that mental image works. Will try next time!', time: '6:04 PM' },
    { id: '14', type: 'event', title: 'Workout completed', subtitle: 'Legs — 52 min, 5 exercises' },
    { id: '15', type: 'received', text: "How did the squat feel with the bracing cue today?", time: '7:00 PM' },
    { id: '16', type: 'sent', text: "Much more solid. Went up to 87.5kg which is a 5kg PR! Felt controlled the whole way.", time: '7:08 PM' },
    { id: '17', type: 'received', text: "That's a big jump in one session — nice work! That's what happens when technique clicks. Don't rush the weight now though, let that form groove in.", time: '7:15 PM' },
  ],
  '3': [
    { id: '1', type: 'received', text: "Don't forget to log your meals today. Nutrition is key this week.", time: '11:00 AM' },
    { id: '2', type: 'sent', text: 'Logged breakfast and lunch! Dinner will be chicken and rice — does that work?', time: '1:30 PM' },
    { id: '3', type: 'received', text: "Perfect combo. Add some greens and a bit of fat like olive oil or avocado and you've got a complete meal.", time: '1:45 PM' },
    { id: '4', type: 'sent', text: "I've been struggling with late night snacking — any tips?", time: '10:15 PM' },
    { id: '5', type: 'received', text: "Super common. Usually it's either boredom, habit, or undereating during the day. Try having a high-protein snack before 9pm — cottage cheese or Greek yogurt works well. It blunts the craving without wrecking your deficit.", time: '10:28 PM' },
    { id: '6', type: 'sent', text: "I think it's boredom honestly. I'll try the cottage cheese idea.", time: '10:30 PM' },
    { id: '7', type: 'event', title: 'Check-in submitted', subtitle: 'Week 2 · Weight: 78.4 kg' },
    { id: '8', type: 'received', text: "Down 0.6kg from last week — that's right in the sweet spot. How is your energy during workouts?", time: '9:00 AM' },
    { id: '9', type: 'sent', text: 'Good! Maybe slightly less on the last set of big lifts but nothing major.', time: '9:18 AM' },
    { id: '10', type: 'received', text: "That's expected at a slight deficit. Make sure you're eating enough carbs around training — a banana or some rice 1–2 hours before works well.", time: '9:30 AM' },
    { id: '11', type: 'sent', text: 'I usually train fasted in the morning. Should I change that?', time: '9:33 AM' },
    { id: '12', type: 'received', text: "If it works for you and your performance is fine, you don't have to. But if you start feeling flat during sessions, try a small meal 45 min before — even just oats with a scoop of protein.", time: '9:50 AM' },
    { id: '13', type: 'event', title: 'Check-in submitted', subtitle: 'Week 3 · Weight: 77.9 kg' },
    { id: '14', type: 'sent', text: "Dropped another 0.5kg! Feeling really good this week.", time: '8:05 AM' },
    { id: '15', type: 'received', text: "Excellent! Steady progress is the name of the game. Your consistency with logging has made a big difference — keep it up.", time: '8:20 AM' },
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
