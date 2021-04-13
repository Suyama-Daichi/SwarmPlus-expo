import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Agenda, DateObject, AgendaItemsMap } from 'react-native-calendars'
import { useDate } from '../hooks/useDate'
import { useFoursquare } from '../hooks/useFoursquare'
import { useUtils } from '../hooks/useUtils'
import { CheckinsItem } from '../interface/Foursquare.type'
import { Timeline } from '../components/Timeline.component'
import { useRecoil } from '../hooks/useRecoil'

export default function CheckinCalander() {
  const { getDateString, getStartEndOfMonth, getStartEndOfDay } = useDate()
  const { setUser, user } = useRecoil()
  const { fetchUserCheckins, fetchCheckinDetails, fetchUser } = useFoursquare()
  const { convertAgendaObject } = useUtils()
  const [items, setItems] = useState({})
  const [loading, setLoading] = useState(false)

  /**
   * 月ごとのチェックインを取得する
   * @param dateObject DateObject
   */
  const fetchCheckinForMonth = async (dateObject: DateObject) => {
    setLoading(true)
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
    if (!user.id) {
      fetchUser().then((result) => {
        setUser(result)
      })
    }
    return () => {}
  }, [])

  useEffect(() => {
    // Object.keys(items).forEach((f) => {
    //   if (f === '2021-03-27') console.log(items[f])
    // })
    setLoading(false)
    return () => {}
  }, [items])

  return (
    <View style={{ height: '100%' }}>
      <Agenda
        items={items}
        loadItemsForMonth={(dateObject) => {
          fetchCheckinForMonth(dateObject)
        }}
        onDayPress={(dateObject) => {
          fetchCheckinForDay(dateObject)
        }}
        displayLoadingIndicator={loading}
        maxDate={getDateString()}
        futureScrollRange={1}
        renderDay={(date, item: CheckinsItem) => (
          <Timeline dateObject={date} item={item}></Timeline>
        )}
      />
    </View>
  )
}
