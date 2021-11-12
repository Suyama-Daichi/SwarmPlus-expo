import { CheckinCard } from '@/components/card/CheckinCard'
import { CheckinCalendarParamList } from '@/types'
import { RouteProp, useRoute } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { useCheckin } from '@/hooks/useCheckin'
import { dateObj2Date, getDateString, getStartEndOfDay } from '@/service/dateFns'
import { Checkin } from '@/types/Foursquare'
import { useNavigation } from '@/hooks/useNavigation'
import { Icon } from 'react-native-elements'
import { COLORS } from '@/constants/Colors'
import { useRecoil } from '@/hooks/useRecoil'

const CheckinsByDay = () => {
  const { params } = useRoute<RouteProp<CheckinCalendarParamList, 'CheckinsByDay'>>()
  const { dateObject } = params
  const navigation = useNavigation()
  const { checkins } = useCheckin()
  const { afterTimestamp, beforeTimestamp } = getStartEndOfDay(dateObject)
  const date = dateObj2Date(dateObject)
  const displayCheckins = checkins.filter(
    (checkin) => afterTimestamp <= checkin.createdAt && checkin.createdAt < beforeTimestamp
  )
  const { setSelectedDateOnMap } = useRecoil()

  const onPressMapIcon = () => {
    setSelectedDateOnMap(date)
    navigation.navigate('MapNavigator')
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: getDateString(date, 'yyyy/MM/dd(E)'),
      headerRight: () => (
        <View style={{ marginHorizontal: 8 }}>
          <Icon name={'map'} color={COLORS.common.primaryOrange} onPress={onPressMapIcon} />
        </View>
      ),
    })
  }, [])

  const renderItem = ({ item }: { item: Checkin }) => {
    return <CheckinCard key={item.id} item={item} />
  }

  return (
    <FlatList style={{ backgroundColor: 'white' }} data={displayCheckins} renderItem={renderItem} />
  )
}

export default CheckinsByDay
