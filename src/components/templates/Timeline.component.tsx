import React from 'react'
import { View } from 'react-native'
import type { Checkin } from '@/types/Foursquare'
import { CheckinCard } from '@/components/card/CheckinCard'
import { DividerByDate } from '@/components/organisms/DividerByDate'

type Props = {
  date: Date
  item: Checkin
}

export const Timeline = React.memo(({ date, item }: Props) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      {!!item && <DividerByDate date={date} />}
      {item && <CheckinCard item={item} />}
    </View>
  )
})
