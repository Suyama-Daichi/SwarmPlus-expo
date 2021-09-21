import { COLORS } from '@/constants/Colors'
import useColorScheme from '@/hooks/useColorScheme'
import React from 'react'
import { View } from 'react-native'
import { Image } from 'react-native-elements'
import { Icon } from '@/types/Foursquare'
import { generateImageUrl } from '@/service/utilFns'

type Props = {
  icon: Icon
  size: 24 | 32 | 40 | 48
}

const CategoryIcon = ({ icon, size }: Props) => {
  const colorScheme = useColorScheme()

  return (
    <View style={[{ backgroundColor: COLORS[colorScheme].backgroundSecond }, { width: size }]}>
      <Image
        source={{
          uri: generateImageUrl(icon, '32'),
        }}
        style={{ width: size, height: size }}
      />
    </View>
  )
}

export default CategoryIcon
