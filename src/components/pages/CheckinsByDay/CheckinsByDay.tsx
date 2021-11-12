import { CheckinCard } from '@/components/card/CheckinCard'
import { CheckinCalendarParamList } from '@/types'
import { RouteProp, useRoute } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { useCheckin } from '@/hooks/useCheckin'
import { dateObj2Date, getDateString, getStartEndOfDay } from '@/service/dateFns'
import { Checkin } from '@/types/Foursquare'
import { useNavigation } from '@/hooks/useNavigation'

const CheckinsByDay = () => {
  const { params } = useRoute<RouteProp<CheckinCalendarParamList, 'CheckinsByDay'>>()
  const { dateObject } = params
  const navigation = useNavigation()
  const { checkins } = useCheckin()
  const { afterTimestamp, beforeTimestamp } = getStartEndOfDay(dateObject)
  const displayCheckins = checkins.filter(
    (checkin) => afterTimestamp <= checkin.createdAt && checkin.createdAt < beforeTimestamp
  )

  useEffect(() => {
    navigation.setOptions({ headerTitle: getDateString(dateObj2Date(dateObject), 'yyyy/MM/dd(E)') })
  }, [])

  const renderItem = ({ item }: { item: Checkin }) => {
    return <CheckinCard key={item.id} item={item} />
  }

  return (
    <FlatList style={{ backgroundColor: 'white' }} data={displayCheckins} renderItem={renderItem} />
  )
}

export default CheckinsByDay
