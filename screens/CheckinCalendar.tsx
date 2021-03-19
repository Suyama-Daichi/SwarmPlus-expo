import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Agenda, DateObject } from 'react-native-calendars'
import { useDate } from '../hooks/useDate'
import { useFoursquare } from '../hooks/useFoursquare'

export default function CheckinCalander() {
  const { getDateString, getStartEndOfMonth } = useDate()
  const { fetchUserCheckins, fetchCheckinDetails } = useFoursquare()

  /**
   * 月ごとのチェックインを取得する
   * @param dateObject date-string
   */
  const fetchCheckinForMonth = async (dateObject: DateObject) => {
    const checkins = await fetchUserCheckins(getStartEndOfMonth(dateObject))
    console.log(checkins)
  }

  /**
   * 日ごとのチェックインを取得する
   * @param day date-string
   */
  const fetchCheckinForDay = (day: string) => {}
  useEffect(() => {
    return () => {}
  }, [])

  const getCHeckinDetails = async (checkinId = '5d6a8b251a95e30008248a6a') => {
    const checkins = await fetchCheckinDetails(checkinId)
    console.log(checkins)
  }

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
          fetchCheckinForMonth(month)
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
