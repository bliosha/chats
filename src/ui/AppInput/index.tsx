import { FC } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'

import { cn } from '@/src/utils/cn'

type AppInputProps = TextInputProps & {
  className?: string
}

export const AppInput: FC<AppInputProps> = ({ className, ...props }) => {
  return (
    <View className={cn('flex-1 bg-gray-200 rounded-full px-4 py-2.5', className)}>
      <TextInput placeholderTextColor="#374151" className="text-gray-900" {...props} />
    </View>
  )
}
