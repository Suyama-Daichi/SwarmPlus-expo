import { MapParamList } from '@/types'
import { useRoute } from '@react-navigation/core'
import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const MapScreen = () => {
  const route = useRoute<RouteProp<MapParamList, 'Map'>>()
  const date = new Date(route.params.dateISOString)
  return (
    <View>
      <Text>ベニューマップ</Text>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})
