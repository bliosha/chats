import { Image } from 'expo-image'
import { CheckIcon, UserIcon } from 'phosphor-react-native'
import { useState } from 'react'
import { Text, View, useWindowDimensions } from 'react-native'

import { type Message } from '@/src/hooks/useChatMessages'
import { cn } from '@/src/utils/cn'

const LIST_PADDING = 16
const MAX_BUBBLE_RATIO = 0.78

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
      <View className="items-end gap-1.5">
        <Text className="text-xs text-gray-400">{msg.time}</Text>

        <View
          className={cn(
            'bg-gray-900 rounded-2xl px-4 py-2 max-w-[78%] overflow-hidden',
            {
              'px-0 pt-0': msg.imageUri,
            },
            { 'pb-0': !msg.text },
          )}
        >
          {msg.imageUri && <MessageImage uri={msg.imageUri} />}
          {msg.text && (
            <Text className={cn('text-white text-base leading-6', { 'px-4 pt-2': msg.imageUri })}>{msg.text}</Text>
          )}
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

const MessageImage = ({ uri }: { uri: string }) => {
  const { width } = useWindowDimensions()
  const [aspectRatio, setAspectRatio] = useState(1)

  const imageWidth = (width - LIST_PADDING * 2) * MAX_BUBBLE_RATIO

  return (
    <Image
      source={{ uri }}
      contentFit="cover"
      onLoad={({ source }) => setAspectRatio(source.width / source.height)}
      style={{ width: imageWidth, aspectRatio, backgroundColor: '#f3f4f6' }}
    />
  )
}
