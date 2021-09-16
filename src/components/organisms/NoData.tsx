import React from 'react'
import { Text, View } from 'react-native'

export const NoData = () => {
  return (
    <View
      style={[
        { backgroundColor: 'white' },
        { justifyContent: 'center', alignItems: 'center', flex: 1 },
      ]}
    >
      <Text>データがありません</Text>
    </View>
  )
}
