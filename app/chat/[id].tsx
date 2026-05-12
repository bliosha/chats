import { useLocalSearchParams, useRouter } from 'expo-router'
import { ArrowLeftIcon, ArrowUpIcon, CameraIcon } from 'phosphor-react-native'
import { useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ChatMessageList } from '@/src/components/ChatMessageList'
import { useChatMessages } from '@/src/hooks/useChatMessages'
import { AppInput } from '@/src/ui/AppInput'
import { Avatar } from '@/src/ui/Avatar'
import { IconButton } from '@/src/ui/Button/IconButton'

export default function Chat() {
  const { id, name: contactName } = useLocalSearchParams<{ id: string; name: string }>()
  const { messages, isTyping, sendMessage } = useChatMessages(id)
  const [inputText, setInputText] = useState('')
  const { top } = useSafeAreaInsets()
  const router = useRouter()
  const flatListRef = useRef<FlatList>(null)

  const handleSend = () => {
    sendMessage(inputText)
    setInputText('')
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={top} className="flex-1">
      <View className="pb-4 border-b-2 border-blue-500 px-4">
        <IconButton variant="dark" icon={<ArrowLeftIcon size={24} color="white" />} onPress={() => router.back()} />
        <View className="items-center mt-2">
          <Avatar name={contactName} />
          <Text className="text-xl font-bold text-gray-900">{contactName}</Text>
          <Text className="text-sm text-gray-400 mt-0.5">Typically replies within 2 hours</Text>
        </View>
      </View>

      <ChatMessageList messages={messages} isTyping={isTyping} contactName={contactName} onRef={flatListRef} />

      <View className="flex-row items-center px-4 py-3 gap-3 border-t-2 border-gray-200">
        <IconButton icon={<CameraIcon size={24} color="#6b7280" />} />
        <AppInput placeholder="Message your coach..." value={inputText} onChangeText={setInputText} />
        <IconButton variant="dark" onPress={handleSend} icon={<ArrowUpIcon size={20} color="white" />} />
      </View>
    </KeyboardAvoidingView>
  )
}
