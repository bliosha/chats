import { FC } from 'react'
import { Text, View } from 'react-native'

type AvatarProps = {
  name: string
  online: boolean
}

export const Avatar: FC<AvatarProps> = ({ name, online }) => {
  const initials =
    name
      .split(' ')
      .slice(1)
      .map(w => w[0])
      .join('')
      .toUpperCase() || name[0]

  return (
    <View className="relative">
      <View className="w-14 h-14 rounded-full bg-gray-200 items-center justify-center">
        <Text className="text-gray-500 text-xl font-semibold">{initials}</Text>
      </View>
      {online && (
        <View className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
      )}
    </View>
  )
}
