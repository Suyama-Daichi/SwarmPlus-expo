import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CheckinsItem } from '../../interface/Foursquare.type'
import { DateObject } from 'react-native-calendars'
import { Checkin } from '../card/checkin.component'
import window from '../../constants/Layout'
import Colors from '../../constants/Colors'

export const DividerDate = ({
  dateObject,
  item,
}: {
  dateObject: DateObject | undefined
  item: CheckinsItem
}) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      {dateObject && (
        <View
          style={{
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            width: window.window.width / 3,
            borderColor: Colors.light.backgroundSecond,
            backgroundColor: Colors.light.backgroundSecond,
          }}
        >
          <Text>{dateObject?.dateString}</Text>
        </View>
      )}
      <Checkin item={item} />
    </View>
  )
}
const styles = StyleSheet.create({})
