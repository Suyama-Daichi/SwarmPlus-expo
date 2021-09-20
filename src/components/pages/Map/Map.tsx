import { Venue } from '@/types/Foursquare'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type Props = {
  venue: Venue[]
}

const MapScreen = ({ venue }: Props) => {
  return (
    <View>
      <Text>ベニューマップ</Text>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})
