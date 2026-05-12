import { ArrowDownIcon } from 'phosphor-react-native'
import { FC, RefObject, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'

import { MessageBubble } from '@/src/components/MessageBubble'
import { Message } from '@/src/hooks/useChatMessages'
import { IconButton } from '@/src/ui/Button/IconButton'
import { TypingIndicator } from '@/src/ui/TypingIndicator'

const SCROLL_THRESHOLD = 100

type ChatMessageListProps = {
  messages: Message[]
  isTyping: boolean
  contactName: string
  onRef?: RefObject<FlatList | null>
}

export const ChatMessageList: FC<ChatMessageListProps> = ({ messages, isTyping, contactName, onRef }) => {
  const flatListRef = useRef<FlatList>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
  }

  return (
    <View className="flex-1">
      <FlatList
        ref={ref => {
          flatListRef.current = ref
          if (onRef) onRef.current = ref
        }}
        inverted
        data={[...messages].reverse()}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        renderItem={({ item }) => <MessageBubble msg={item} contactName={contactName} />}
        ListHeaderComponent={isTyping ? <TypingIndicator /> : null}
        onScroll={e => setShowScrollButton(e.nativeEvent.contentOffset.y > SCROLL_THRESHOLD)}
        scrollEventThrottle={16}
      />

      {showScrollButton && (
        <View className="absolute bottom-4 self-center">
          <IconButton variant="dark" onPress={scrollToBottom} icon={<ArrowDownIcon size={20} color="white" />} />
        </View>
      )}
    </View>
  )
}
