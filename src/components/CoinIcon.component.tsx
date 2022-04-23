import React from 'react'
import { View } from 'react-native'
import { COLORS } from '@/constants/Colors'

const CoinIcon = () => {
  return (
    <View
      style={[
        { backgroundColor: COLORS['light'].coinCrown, borderRadius: 25 },
        { width: 16, height: 16 },
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <View
        style={[
          { borderColor: COLORS['light'].primaryOrange, borderWidth: 1, borderRadius: 25 },
          { width: 12, height: 12 },
        ]}
      ></View>
    </View>
  )
}

export default CoinIcon
