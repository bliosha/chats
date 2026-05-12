import { CheckIcon, UserIcon } from 'phosphor-react-native'
import { Text, View } from 'react-native'

import { type Message } from '@/src/hooks/useChatMessages'

type Props = {
  msg: Message
  contactName: string
}

export const MessageBubble = ({ msg, contactName }: Props) => {
  if (msg.type === 'received') {
    return (
      <View>
        <View className="flex-row items-center gap-2 mb-1.5">
          <View className="w-6 h-6 rounded-full bg-gray-200 items-center justify-center">
            <UserIcon size={13} color="#9ca3af" />
          </View>
          <Text className="text-xs text-gray-400">
            {contactName}
            {'  '}
            {msg.time}
          </Text>
        </View>
        <View
          className="self-start bg-white rounded-2xl px-4 py-2 max-w-[78%] border border-gray-100"
          style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } }}
        >
          <Text className="text-gray-900 text-base leading-6">{msg.text}</Text>
        </View>
      </View>
    )
  }

  if (msg.type === 'sent') {
    return (
      <View className="items-end">
        <Text className="text-xs text-gray-400 mb-1.5">{msg.time}</Text>
        <View className="bg-gray-900 rounded-2xl px-4 py-2 max-w-[78%]">
          <Text className="text-white text-base leading-6">{msg.text}</Text>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-2 gap-3">
      <View className="w-7 h-7 rounded-full bg-green-500 items-center justify-center">
        <CheckIcon size={16} color="white" />
      </View>
      <View>
        <Text className="text-green-600 font-semibold text-sm">{msg.title}</Text>
        <Text className="text-gray-500 text-sm">{msg.subtitle}</Text>
      </View>
    </View>
  )
}
