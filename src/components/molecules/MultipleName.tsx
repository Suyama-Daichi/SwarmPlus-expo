import { User } from '@/types/Foursquare'
import React, { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { other, fontColor } from '@/styles/styles'

type Props = {
  users: User[]
  label: ReactNode
  sum?: string
}

const MultipleName = ({ users, label, sum }: Props) => {
  const fullNames = users.map((user) => {
    if (user.lastName && user.firstName) return user.firstName + ' ' + user.lastName
    if (user.firstName) return user.firstName
    if (user.lastName) return user.lastName
  })
  return (
    <View style={[other.rowCenter]}>
      <Text style={fontColor.textSub}>
        <View>{label}</View> <Text>{fullNames.join('と') || sum}</Text>
      </Text>
    </View>
  )
}

export default MultipleName
