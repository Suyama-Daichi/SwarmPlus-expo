import { COLORS } from '@/constants/Colors'
import useColorScheme from '@/hooks/useColorScheme'
import { useUtils } from '@/hooks/useUtils'
import React from 'react'
import { View } from 'react-native'
import { Image } from 'react-native-elements'
import { Icon } from '../../types/Foursquare'

type Props = {
  icon: Icon
  size: 24 | 32 | 40 | 48
}

const CategoryIcon = ({ icon, size }: Props) => {
  const { generateImageUrl } = useUtils()
  const colorScheme = useColorScheme()
  const { prefix, suffix } = icon

  return (
    <View style={[{ backgroundColor: COLORS[colorScheme].backgroundSecond }]}>
      <Image
        source={{
          uri: generateImageUrl(prefix, suffix, '32'),
        }}
        style={{ width: size, height: size }}
      />
    </View>
  )
}

export default CategoryIcon
