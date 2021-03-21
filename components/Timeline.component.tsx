import React from 'react'
import { View, StyleSheet } from 'react-native'
import { DateObject } from 'react-native-calendars'
import { CheckinsItem } from '../interface/Foursquare.type'
import { Checkin } from './card/checkin.component'
import { DividerDate } from './divider/divider.component'

export const Timeline = ({
  dateObject,
  item,
}: {
  dateObject: DateObject | undefined
  item: CheckinsItem
}) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <DividerDate dateObject={dateObject} />
      <Checkin item={item} />
    </View>
  )
}
const styles = StyleSheet.create({})
