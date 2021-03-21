import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CheckinsItem } from '../../interface/Foursquare.type'
import window from '../../constants/Layout'

export const Checkin = ({ item }: { item: CheckinsItem }) => {
  return (
    <View style={[styles.container, { borderColor: '#707070', borderWidth: 0.3 }]}>
      <Text>{item?.venue.name}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 80,
    width: window.window.width - 16,
    marginVertical: 4,
    padding: 4,
    marginLeft: 8,
  },
  border: {
    borderWidth: 0.5,
    borderColor: 'gray',
  },
})
