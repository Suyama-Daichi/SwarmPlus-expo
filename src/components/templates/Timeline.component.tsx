import React from 'react'
import { View } from 'react-native'
import { DateObject } from 'react-native-calendars'
import type { Checkin } from '@/types/Foursquare'
import { CheckinCard } from '@/components/card/CheckinCard'
import { DividerByDate } from '@/components/organisms/DividerByDate'

type Props = {
  dateObject: DateObject
  item: Checkin
}

export const Timeline = React.memo(({ dateObject, item }: Props) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      {!!item && <DividerByDate dateObject={dateObject} />}
      {item && <CheckinCard item={item} />}
    </View>
  )
})
