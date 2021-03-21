import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CheckinsItem } from '../../interface/Foursquare.type'

export const Checkin = ({ item }: { item: CheckinsItem }) => {
  return (
    <View style={styles.border}>
      <Text>{item.venue.name}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'gray',
  },
})
