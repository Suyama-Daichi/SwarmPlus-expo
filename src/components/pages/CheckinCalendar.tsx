import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Agenda, DateObject } from 'react-native-calendars'
import { useDate } from '@/hooks/useDate'
import { useFoursquare } from '@/hooks/useFoursquare'
import { useUtils } from '@/hooks/useUtils'
import { COLORS } from '@/constants/Colors'
import type { Checkin } from '@/types/Foursquare'
import { Timeline } from '@/components/templates/Timeline.component'
import useColorScheme from '@/hooks/useColorScheme'
import { logEvent } from '@/hooks/useAnalytics'
import useAsyncFn from 'react-use/lib/useAsyncFn'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useRecoil } from '@/hooks/useRecoil'
import NoCheckin from '@/components/NoCheckin'

export default function CheckinCalender() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()

  const { getDateString, getStartEndOfMonth, timestamp2Date } = useDate()
  const { fetchUserCheckins, fetchUser } = useFoursquare()
  const { convertAgendaObject, generateImageUrl } = useUtils()
  const [items, setItems] = useState<{ [k: string]: Checkin[] }>()
  const [loading, setLoading] = useState(false)
  const { setUser } = useRecoil()
  const [userTemp, fetchUserTemp] = useAsyncFn(async () => await fetchUser(), [])

  /**
   * 月ごとのチェックインを取得する
   * @param dateObject DateObject
   */
  const fetchCheckinForMonth = async (dateObject: DateObject) => {
    setLoading(true)
    const checkins = await fetchUserCheckins(getStartEndOfMonth(dateObject))
    setItems(convertAgendaObject(checkins.items))
  }

  useEffect(() => {
    setLoading(false)
  }, [items])

  useEffect(() => {
    if (!userTemp.value) return
    setUser(userTemp.value)
    const uri = generateImageUrl(userTemp.value.photo.prefix, userTemp.value.photo.suffix, 24)

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
  }, [userTemp])

  useEffect(() => {
    void fetchUserTemp()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Agenda<Checkin>
        items={items}
        // NOTE: loadItemsForMonth()だとonDayPress時にも発火する問題への対応
        // https://github.com/wix/react-native-calendars/issues/769
        onVisibleMonthsChange={(dateObject: DateObject[]) => {
          void fetchCheckinForMonth(dateObject[0])
        }}
        onDayPress={() => {
          void logEvent('DayPressed')
        }}
        displayLoadingIndicator={loading}
        maxDate={getDateString()}
        futureScrollRange={1}
        renderEmptyData={() => <NoCheckin />}
        renderDay={(dateObject, item) => {
          return dateObject && <Timeline date={timestamp2Date(dateObject.timestamp)} item={item} />
        }}
        theme={{
          agendaKnobColor: COLORS[colorScheme].primaryOrange,
          dotColor: COLORS[colorScheme].primaryOrange,
        }}
      />
    </View>
  )
}
