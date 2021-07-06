import { commonStyles } from '@/styles/styles'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const NoCheckin = () => {
  return (
    <View style={commonStyles.bk_white}>
      <Text>この日のチェックインはありません</Text>
    </View>
  )
}

export default NoCheckin
