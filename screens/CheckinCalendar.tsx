import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { useDate } from '../hooks/useDate'

export default function CheckinCalander() {
  const { getDateString } = useDate()
  /**
   * 月ごとのチェックインを取得する
   * @param month date-string
   */
  const fetchCheckinForMonth = (month: string) => {}
  /**
   * 日ごとのチェックインを取得する
   * @param day date-string
   */
  const fetchCheckinForDay = (day: string) => {}

  return (
    <View style={{ height: 600 }}>
      <Agenda
        items={{
          '2020-05-22': [{ name: 'item 1 - any js object' }],
          '2020-05-23': [{ name: 'item 2 - any js object', height: 20 }],
          '2020-05-24': [],
          '2021-03-01': [{ name: 'item 3 - any js object' }, { name: 'any js object' }],
        }}
        loadItemsForMonth={(month) => {
          fetchCheckinForMonth(month.dateString)
        }}
        onDayPress={(day) => {
          fetchCheckinForDay(day.dateString)
        }}
        maxDate={getDateString()}
        futureScrollRange={1}
        renderDay={(day, item) => {
          console.log(item)
          return <View></View>
        }}
        renderEmptyData={() => (
          <View>
            <Text>チェックインはありません</Text>
          </View>
        )}
      />
    </View>
  )
}
