import { getDateString } from '@/service/dateFns'
import React from 'react'
import { View, Text } from 'react-native'

type Props = {
  date: Date
}

const CalendarHeader = ({ date }: Props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text>{getDateString(date, 'yyyy / MM')}</Text>
    </View>
  )
}

export default CalendarHeader
