import { UserIcon } from 'phosphor-react-native'
import { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'

export function TypingIndicator() {
  const dots = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current

  useEffect(() => {
    const animations = dots.map(dot =>
      Animated.sequence([
        Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: false }),
        Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: false }),
      ]),
    )

    const loop = Animated.loop(Animated.stagger(150, animations))
    loop.start()

    return () => loop.stop()
  }, [dots])

  return (
    <View className="items-start gap-3">
      <View className="w-6 h-6 rounded-full bg-gray-200 items-center justify-center">
        <UserIcon size={13} color="#9ca3af" />
      </View>
      <View className="bg-white rounded-2xl px-4 py-2 border border-gray-100 flex-row">
        <View className="flex-row gap-1 items-center" style={{ height: 21 }}>
          {dots.map((dot, i) => (
            <Animated.View
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 100,
                backgroundColor: dot.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['#9ca3af', '#374151'],
                }),
              }}
            />
          ))}
        </View>
      </View>
    </View>
  )
}
