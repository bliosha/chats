import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ArrowLeftIcon, ArrowUpIcon, CameraIcon, XIcon } from 'phosphor-react-native'
import { useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ChatMessageList } from '@/src/components/ChatMessageList'
import { useChatMessages } from '@/src/hooks/useChatMessages'
import { useImagePicker } from '@/src/hooks/useImagePicker'
import { AppInput } from '@/src/ui/AppInput'
import { Avatar } from '@/src/ui/Avatar'
import { IconButton } from '@/src/ui/Button/IconButton'

export default function Chat() {
  const { id, name: contactName } = useLocalSearchParams<{ id: string; name: string }>()
  const { messages, isTyping, sendMessage } = useChatMessages(id)
  const { pickImage } = useImagePicker()
  const [inputText, setInputText] = useState('')
  const [pendingImage, setPendingImage] = useState<string | null>(null)
  const { top } = useSafeAreaInsets()
  const router = useRouter()
  const flatListRef = useRef<FlatList>(null)

  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
  }

  const handleSend = () => {
    if (!inputText.trim() && !pendingImage) return

    sendMessage(inputText, pendingImage ?? undefined)
    setInputText('')
    setPendingImage(null)
    scrollToBottom()
  }

  const handlePickImage = async () => {
    const uri = await pickImage()
    if (!uri) return

    setPendingImage(uri)
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

      <View className="border-t-2 border-gray-200">
        {pendingImage && (
          <View className="px-4 py-3">
            <View className="w-20 h-20">
              <Image
                source={{ uri: pendingImage }}
                contentFit="cover"
                style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: '#f3f4f6' }}
              />
              <IconButton
                onPress={() => setPendingImage(null)}
                className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-gray-900 items-center justify-center"
                icon={<XIcon size={14} color="white" weight="bold" />}
              />
            </View>
          </View>
        )}

        <View className="flex-row items-center px-4 py-3 gap-3">
          <IconButton onPress={handlePickImage} icon={<CameraIcon size={24} color="#6b7280" />} />
          <AppInput placeholder="Message your coach..." value={inputText} onChangeText={setInputText} />
          <IconButton variant="dark" onPress={handleSend} icon={<ArrowUpIcon size={20} color="white" />} />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
