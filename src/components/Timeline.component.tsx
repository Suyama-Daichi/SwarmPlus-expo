import React from 'react'
import { View } from 'react-native'
import { DateObject } from 'react-native-calendars'
import type { Checkin } from '@/types/Foursquare'
import { CheckinCard } from '@/components/card/CheckinCard'
import { DividerDate } from '@/components/divider/divider.component'

type Props = {
  dateObject: DateObject | undefined
  item: Checkin
}

export const Timeline = React.memo(({ dateObject, item }: Props) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      {!!item && <DividerDate dateObject={dateObject} />}
      {item && <CheckinCard item={item} />}
    </View>
  )
})
