import { useRoute } from '@react-navigation/core'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const MapScreen = () => {
  const route = useRoute()
  console.log(route.params)
  return (
    <View>
      <Text>ベニューマップ</Text>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})
