import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { DateObject } from 'react-native-calendars'
import window from '@/constants/Layout'
import Colors from '@/constants/Colors'
import { useDate } from '@/hooks/useDate'
import useColorScheme from '@/hooks/useColorScheme'

type Props = {
  dateObject: DateObject | undefined
}

export const DividerDate = ({ dateObject }: Props) => {
  const colorScheme = useColorScheme()
  const { getDay, timestamp2Date } = useDate()
  const [day, setDay] = useState()

  useEffect(() => {
    setDay(getDay(timestamp2Date(dateObject?.timestamp)))
  }, [dateObject, getDay, timestamp2Date])

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
              borderColor: Colors[colorScheme].primaryOrange,
              backgroundColor: Colors[colorScheme].primaryOrange,
            },
            { marginVertical: 8 },
          ]}
        >
          <Text style={[{ color: 'white', fontWeight: 'bold' }, { paddingLeft: 8 }]}>
            {dateObject?.dateString}({day})
          </Text>
        </View>
      )}
    </View>
  )
}
