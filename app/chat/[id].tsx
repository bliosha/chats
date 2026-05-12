import { useLocalSearchParams } from 'expo-router'
import { ArrowUpIcon, VideoCameraIcon } from 'phosphor-react-native'
import { useState } from 'react'
import { FlatList, Text, View } from 'react-native'

import { MessageBubble } from '@/src/components/MessageBubble'
import { useChatMessages } from '@/src/hooks/useChatMessages'
import { AppInput } from '@/src/ui/AppInput'
import { Avatar } from '@/src/ui/Avatar'
import { IconButton } from '@/src/ui/Button/IconButton'
import { KeyboardAwareScroll } from '@/src/ui/KeyboardAwareScroll'
import { TypingIndicator } from '@/src/ui/TypingIndicator'

export default function Chat() {
  const { id, name: contactName } = useLocalSearchParams<{ id: string; name: string }>()
  const { messages, isTyping, sendMessage } = useChatMessages(id)
  const [inputText, setInputText] = useState('')

  const handleSend = () => {
    sendMessage(inputText)
    setInputText('')
  }

  return (
    <View className="flex-1">
      <KeyboardAwareScroll>
        <View className="items-center pb-4 border-b-2 border-blue-500">
          <Avatar name={contactName} />
          <Text className="text-xl font-bold text-gray-900">{contactName}</Text>
          <Text className="text-sm text-gray-400 mt-0.5">Typically replies within 2 hours</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16, gap: 16 }}
          renderItem={({ item }) => <MessageBubble msg={item} contactName={contactName} />}
          ListFooterComponent={isTyping ? <TypingIndicator /> : null}
        />

        <View className="flex-row items-center px-4 py-3 gap-3 border-t-2 border-gray-200">
          <IconButton icon={<VideoCameraIcon size={24} color="#6b7280" />} />
          <AppInput
            placeholder="Message your coach..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />

          <IconButton variant="dark" onPress={handleSend} icon={<ArrowUpIcon size={20} color="white" />} />
        </View>
      </KeyboardAwareScroll>
    </View>
  )
}
