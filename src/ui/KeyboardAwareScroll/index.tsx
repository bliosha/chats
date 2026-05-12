import { FC, PropsWithChildren } from 'react'
import { Dimensions, StyleProp, View, ViewStyle } from 'react-native'
import { KeyboardAwareScrollView as CustomKeyboardAwareScroll } from 'react-native-keyboard-controller'

interface KeyboardAwareScrollProps {
  contentContainerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  addTopPadding?: boolean
}

export const KeyboardAwareScroll: FC<PropsWithChildren<KeyboardAwareScrollProps>> = ({
  children,
  contentContainerStyle,
  style,
  addTopPadding,
}) => {
  const additionSpaceHeight = Dimensions.get('window').height * 0.21
  // Padding value for top spacing, calculated based on screen height @Bogdan
  const calculatedPaddingTop = additionSpaceHeight / 2

  return (
    <CustomKeyboardAwareScroll
      showsVerticalScrollIndicator={false}
      bottomOffset={20}
      style={style}
      contentContainerStyle={[contentContainerStyle, addTopPadding && { paddingTop: calculatedPaddingTop }]}
    >
      {children}
      {/* to make KeyboardAwareScrollView work smoother, without jerking on large screens @Bogdan */}
      <View style={{ height: additionSpaceHeight }} />
    </CustomKeyboardAwareScroll>
  )
}
