import { getDateString } from '@/service/dateFns'
import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

type Props = {
  date: Date
  onPress: () => void
}

const CalendarHeader = ({ date, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{getDateString(date, 'yyyy年MM月')}</Text>
    </TouchableOpacity>
  )
}

export default CalendarHeader

const styles = StyleSheet.create({})
