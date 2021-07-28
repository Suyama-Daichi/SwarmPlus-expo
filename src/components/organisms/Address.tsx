import { commonStyles } from '@/styles/styles'
import React from 'react'
import { Text } from 'react-native'
import { Location } from '@/types/Foursquare'

type Props = {
  isFull: boolean
  location: Location
  size: 'fontSmall' | 'fontMedium' | 'fontLarge'
}

const Address = ({ isFull, location, size }: Props) => {
  return isFull ? (
    <Text style={[commonStyles.textSub, commonStyles[size]]}>
      {`${location.state}${location.city || ''}${location.address || ''}`}
    </Text>
  ) : (
    <Text style={[commonStyles.textSub, commonStyles[size]]} numberOfLines={1}>
      {location.state}
      {location.city}
    </Text>
  )
}

export default Address
