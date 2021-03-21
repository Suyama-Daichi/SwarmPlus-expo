import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Agenda, DateObject, AgendaItemsMap } from 'react-native-calendars'
import { Checkin } from '../components/card/checkin.component'
import { DividerDate as DividerDate } from '../components/divider/divider.component'
import { useDate } from '../hooks/useDate'
import { useFoursquare } from '../hooks/useFoursquare'
import { useUtils } from '../hooks/useUtils'
import { CheckinsItem } from '../interface/Foursquare.type'
import window from '../constants/Layout'
import { Timeline } from '../components/Timeline.component'

export default function CheckinCalander() {
  const { getDateString, getStartEndOfMonth, getStartEndOfDay } = useDate()
  const { fetchUserCheckins, fetchCheckinDetails } = useFoursquare()
  const { convertAgendaObject } = useUtils()
  const [items, setItems] = useState({})

  /**
   * 月ごとのチェックインを取得する
   * @param dateObject DateObject
   */
  const fetchCheckinForMonth = async (dateObject: DateObject) => {
    const checkins = await fetchUserCheckins(getStartEndOfMonth(dateObject))
    setItems(convertAgendaObject(checkins))
  }

  /**
   * 日ごとのチェックインを取得する
   * @param dateObject DateObject
   */
  const fetchCheckinForDay = async (dateObject: DateObject) => {
    // const checkins = await fetchUserCheckins(getStartEndOfDay(dateObject))
    // console.log(checkins)
  }

  useEffect(() => {
    return () => {}
  }, [])

  useEffect(() => {
    // Object.keys(items).forEach((f) => {
    //   console.log(f, items[f].length)
    // })
    return () => {}
  }, [items])

  const getCHeckinDetails = async (checkinId = '5d6a8b251a95e30008248a6a') => {
    const checkins = await fetchCheckinDetails(checkinId)
    console.log(checkins)
  }

  return (
    <View style={{ height: window.window.height }}>
      <Agenda
        items={items}
        loadItemsForMonth={(dateObject) => {
          fetchCheckinForMonth(dateObject)
        }}
        onDayPress={(dateObject) => {
          fetchCheckinForDay(dateObject)
        }}
        maxDate={getDateString()}
        futureScrollRange={1}
        renderDay={(date, item: CheckinsItem) => (
          <Timeline dateObject={date} item={item}></Timeline>
        )}
        renderEmptyData={() => (
          <View>
            <Text>チェックインはありません</Text>
          </View>
        )}
      />
    </View>
  )
}
