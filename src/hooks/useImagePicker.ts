import * as ImagePicker from 'expo-image-picker'
import { useCallback } from 'react'
import { Alert, Linking } from 'react-native'

export const useImagePicker = () => {
  const pickImage = useCallback(async (): Promise<string | null> => {
    const current = await ImagePicker.getMediaLibraryPermissionsAsync()

    let granted = current.granted

    if (!granted && current.canAskAgain) {
      const requested = await ImagePicker.requestMediaLibraryPermissionsAsync()
      granted = requested.granted
    }

    if (!granted) {
      Alert.alert(
        'Photo access required',
        'Allow access to your photos in Settings to send images.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      )
      return null
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    })

    if (result.canceled) return null

    return result.assets[0].uri
  }, [])

  return { pickImage }
}
