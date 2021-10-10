import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Agenda, DateObject } from 'react-native-calendars'
import { dateObj2Date, getDateString, timestamp2Date } from '@/service/dateFns'
import { COLORS } from '@/constants/Colors'
import type { Checkin } from '@/types/Foursquare'
import { Timeline } from '@/components/templates/Timeline'
import useColorScheme from '@/hooks/useColorScheme'
import { logEvent } from '@/hooks/useAnalytics'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useRecoil } from '@/hooks/useRecoil'
import NoCheckin from '@/components/NoCheckin'
import { useNavigation } from '@react-navigation/core'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { generateImageUrl } from '@/service/utilFns'
import { useInitialize } from '@/hooks/useInitialize'
import { useCheckinCalendar } from './useCheckinCalendar'

const CheckinCalendar = () => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { fetchCheckin } = useCheckinCalendar()
  const { fetchInitialData, loading } = useInitialize()

  const { checkinAgenda, user } = useRecoil()

  const setHeaderRight = () => {
    navigation.setOptions({
      headerRight: () => (
        <Avatar
          source={{ uri: user && generateImageUrl(user.photo, 24) }}
          rounded={true}
          containerStyle={{ marginRight: 16 }}
          onPress={() => navigation.navigate('UserProfile')}
        />
      ),
    })
  }

  const renderDay = (dateObject: DateObject, item: Checkin) => {
    return <Timeline date={timestamp2Date(dateObject?.timestamp)} item={item} />
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    setHeaderRight()
  }, [user])

  if (loading) return <ActivityIndicator />

  return (
    <View style={{ flex: 1 }}>
      <Agenda<Checkin>
        items={checkinAgenda}
        // NOTE: loadItemsForMonth()だとonDayPress時にも発火する問題への対応
        // https://github.com/wix/react-native-calendars/issues/769
        // onVisibleMonthsChange={(dateObject: DateObject[]) => {
        //   fetchCheckin(dateObj2Date(dateObject[0]))
        // }}
        onDayPress={() => {
          logEvent('DayPressed')
        }}
        displayLoadingIndicator={loading}
        maxDate={getDateString()}
        futureScrollRange={1}
        renderEmptyData={() => <NoCheckin />}
        renderDay={renderDay}
        theme={{
          agendaKnobColor: COLORS[colorScheme].primaryOrange,
          dotColor: COLORS[colorScheme].primaryOrange,
        }}
      />
    </View>
  )
}

export default CheckinCalendar
