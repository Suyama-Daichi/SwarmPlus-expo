import { COLORS } from '@/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

export const MayorIcon = () => {
  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderRadius: 25,
          borderColor: COLORS.common.coinCrown,
          padding: 4,
        },
      ]}
    >
      <FontAwesome5 name={'crown'} size={16} color={COLORS.common.coinCrown} />
    </View>
  )
}
