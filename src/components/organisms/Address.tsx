import { fontColor } from '@/styles/styles'
import React from 'react'
import { Text } from 'react-native'
import { Location } from '@/types/Foursquare'
import { fontSize } from '../../styles/styles'

type Props = {
  isFull: boolean
  location: Location
  size: 'fontSmall' | 'fontMedium' | 'fontLarge'
}

const Address = ({ isFull, location, size }: Props) => {
  return isFull ? (
    <Text style={[fontColor.textSub, fontSize[size]]}>
      {`${location.state}${location.city || ''}${location.address || ''}`}
    </Text>
  ) : (
    <Text style={[fontColor.textSub, fontSize[size]]} numberOfLines={1}>
      {location.state}
      {location.city}
    </Text>
  )
}

export default Address
