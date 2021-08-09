import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import ArrowIcon from '../atoms/ArrowIcon'

const BackButton = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
      <ArrowIcon direction={'left'} />
    </TouchableOpacity>
  )
}

export default BackButton
