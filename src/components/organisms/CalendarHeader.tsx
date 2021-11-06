import { addMonth, getDateString } from '@/service/dateFns'
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

type Props = {
  date: Date
  setCurrentDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

const CalendarHeader = ({ date, setCurrentDate }: Props) => {
  useEffect(() => {
    setCurrentDate(addMonth(new Date(date)))
  }, [date])

  return (
    <View style={{ flexDirection: 'row' }}>
      <Text>{getDateString(date, 'yyyy / MM')}</Text>
    </View>
  )
}

export default CalendarHeader
