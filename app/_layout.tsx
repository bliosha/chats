import { Stack } from 'expo-router'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import '../global.css'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="contacts" options={{ headerShown: false }} />
          <Stack.Screen name="chat/[id]" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
      </KeyboardProvider>
    </SafeAreaProvider>
  )
}
