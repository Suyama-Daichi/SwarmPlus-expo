import { COLORS } from '@/constants/Colors'
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
  return (
    <View style={[{ backgroundColor: COLORS['light'].backgroundSecond }, { width: size }]}>
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
