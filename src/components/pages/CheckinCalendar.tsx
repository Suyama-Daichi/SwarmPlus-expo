import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Agenda, DateObject } from 'react-native-calendars'
import { dateObj2Date, getDateString, getStartEndOfMonth, timestamp2Date } from '@/service/dateFns'
import { useFoursquare } from '@/hooks/useFoursquare'
import { useUtils } from '@/hooks/useUtils'
import { COLORS } from '@/constants/Colors'
import type { Checkin } from '@/types/Foursquare'
import { Timeline } from '@/components/templates/Timeline'
import useColorScheme from '@/hooks/useColorScheme'
import { logEvent } from '@/hooks/useAnalytics'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useRecoil } from '@/hooks/useRecoil'
import NoCheckin from '@/components/NoCheckin'
import { useNavigation } from '@react-navigation/core'

const CheckinCalender = () => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()

  const { fetchUserCheckins, fetchUser } = useFoursquare()
  const { generateImageUrl } = useUtils()
  const [loading, setLoading] = useState(true)
  const { setUser, setCheckins, checkinAgenda, setFetchHistory, fetchHistory } = useRecoil()

  const fetchCheckin = async (date: Date) => {
    setLoading(true)
    const period = getStartEndOfMonth(date)
    const exists = fetchHistory.some((c) => c.valueOf() === date.valueOf())
    setFetchHistory(() => {
      if (fetchHistory.length === 0) return [date]
      return exists ? fetchHistory : [...fetchHistory, date]
    })
    if (exists) {
      setLoading(false)
      return
    }
    const checkins = await fetchUserCheckins(period)
    setCheckins((current) => {
      if (current.length === 0) return checkins.items
      return [...current, ...checkins.items.filter((f) => current.some((c) => c.id !== f.id))]
    })
    setLoading(false)
  }

  const fetchSetData = async () => {
    const user = await fetchUser()
    setUser(user)
    const uri = generateImageUrl(user.photo.prefix, user.photo.suffix, 24)
    navigation.setOptions({
      headerRight: () => (
        <Avatar
          source={{ uri }}
          rounded={true}
          containerStyle={{ marginRight: 16 }}
          onPress={() => navigation.navigate('UserProfile')}
        />
      ),
    })
    await fetchCheckin(new Date())
  }

  useEffect(() => {
    void fetchSetData()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Agenda<Checkin>
        items={checkinAgenda}
        // NOTE: loadItemsForMonth()だとonDayPress時にも発火する問題への対応
        // https://github.com/wix/react-native-calendars/issues/769
        onVisibleMonthsChange={(dateObject: DateObject[]) => {
          void fetchCheckin(dateObj2Date(dateObject[0]))
        }}
        onDayPress={() => {
          void logEvent('DayPressed')
        }}
        displayLoadingIndicator={loading}
        maxDate={getDateString()}
        futureScrollRange={1}
        renderEmptyData={() => <NoCheckin />}
        renderDay={(dateObject, item) => {
          return <Timeline date={timestamp2Date(dateObject?.timestamp)} item={item} />
        }}
        theme={{
          agendaKnobColor: COLORS[colorScheme].primaryOrange,
          dotColor: COLORS[colorScheme].primaryOrange,
        }}
      />
    </View>
  )
}

export default CheckinCalender
