import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Agenda, DateObject } from 'react-native-calendars'
import { useDate } from '../hooks/useDate'
import { useFoursquare } from '../hooks/useFoursquare'
import { useUtils } from '../hooks/useUtils'
import { CheckinsItem } from '../interface/Foursquare.type'
import { Timeline } from '../components/Timeline.component'
import { useRecoil } from '../hooks/useRecoil'

export default function CheckinCalander() {
  const { getDateString, getStartEndOfMonth } = useDate()
  const { setUser, user } = useRecoil()
  const { fetchUserCheckins, fetchUser } = useFoursquare()
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
