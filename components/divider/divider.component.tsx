import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DateObject } from 'react-native-calendars'
import window from '../../constants/Layout'
import Colors from '../../constants/Colors'

export const DividerDate = ({ dateObject }: { dateObject: DateObject | undefined }) => {
  return (
    <View style={{ backgroundColor: 'white', width: window.window.width }}>
      {dateObject && (
        <View
          style={[
            {
              borderWidth: 1,
              borderLeftWidth: 0,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              width: window.window.width / 3,
              borderColor: Colors.light.backgroundSecond,
              backgroundColor: Colors.light.backgroundSecond,
            },
            { marginVertical: 8 },
          ]}
        >
          <Text>{dateObject?.dateString}</Text>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({})
