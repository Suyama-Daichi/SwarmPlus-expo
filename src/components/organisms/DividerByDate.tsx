import React from 'react'
import { View, Text } from 'react-native'
import window from '@/constants/Layout'
import { COLORS } from '@/constants/Colors'
import { getDateString, getDay } from '@/service/dateFns'
import useColorScheme from '@/hooks/useColorScheme'

type Props = {
  date: Date
}

export const DividerByDate = ({ date }: Props) => {
  const colorScheme = useColorScheme()

  return (
    <View style={{ backgroundColor: 'white', width: window.window.width }}>
      <View
        style={[
          {
            height: 30,
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            width: window.window.width / 3,
            borderColor: COLORS[colorScheme].primaryOrange,
            backgroundColor: COLORS[colorScheme].primaryOrange,
          },
          { marginVertical: 8 },
        ]}
      >
        <Text style={[{ color: 'white', fontWeight: 'bold' }, { paddingLeft: 8 }]}>
          {getDateString(date, 'yyyy/MM/dd')}({getDay(date)})
        </Text>
      </View>
    </View>
  )
}
