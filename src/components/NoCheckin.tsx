import { other } from '@/styles/styles'
import React from 'react'
import { View, Text } from 'react-native'

const NoCheckin = () => {
  return (
    <View style={other.bk_white}>
      <Text>この日のチェックインはありません</Text>
    </View>
  )
}

export default NoCheckin
