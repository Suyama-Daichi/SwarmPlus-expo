import React from 'react'
import { View, StyleSheet } from 'react-native'
import { DateObject } from 'react-native-calendars'
import type { Checkin } from '../types/Foursquare'
import { CheckinCard } from './card/checkin.component'
import { DividerDate } from './divider/divider.component'

export const Timeline = ({
  dateObject,
  item,
}: {
  dateObject: DateObject | undefined
  item: Checkin
}) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      {!!item && <DividerDate dateObject={dateObject} />}
      {item && <CheckinCard item={item} />}
    </View>
  )
}
const styles = StyleSheet.create({})
