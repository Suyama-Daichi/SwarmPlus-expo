import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Agenda, DateObject } from 'react-native-calendars'
import { useDate } from '@/hooks/useDate'
import { useFoursquare } from '@/hooks/useFoursquare'
import { useUtils } from '@/hooks/useUtils'
import { COLORS } from '@/constants/Colors'
import type { Checkin } from '@/types/Foursquare'
import { Timeline } from '@/components/templates/Timeline'
import useColorScheme from '@/hooks/useColorScheme'
import { logEvent } from '@/hooks/useAnalytics'
import useAsyncFn from 'react-use/lib/useAsyncFn'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useRecoil } from '@/hooks/useRecoil'
import NoCheckin from '@/components/NoCheckin'

const CheckinCalender = () => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()

  const { getDateString, getStartEndOfMonth, timestamp2Date } = useDate()
  const { fetchUserCheckins, fetchUser } = useFoursquare()
  const { convertAgendaObject, generateImageUrl } = useUtils()
  const { setUser } = useRecoil()
  /**
   * 月ごとのチェックインを取得する
   * @param dateObject DateObject
   */
  const [fetchMonthlyCheckinState, fetchMonthlyCheckin] = useAsyncFn(
    async (dateObject: DateObject) => {
      const period = getStartEndOfMonth(dateObject)
      const checkins = await fetchUserCheckins(period)
      return convertAgendaObject(checkins.items)
    },
    []
  )

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
  }

  useEffect(() => {
    void fetchSetData()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Agenda<Checkin>
        items={fetchMonthlyCheckinState.value}
        // NOTE: loadItemsForMonth()だとonDayPress時にも発火する問題への対応
        // https://github.com/wix/react-native-calendars/issues/769
        onVisibleMonthsChange={(dateObject: DateObject[]) => {
          void fetchMonthlyCheckin(dateObject[0])
        }}
        onDayPress={() => {
          void logEvent('DayPressed')
        }}
        displayLoadingIndicator={fetchMonthlyCheckinState.loading}
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
