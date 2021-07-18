import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import ArrowIcon from '../atoms/ArrowIcon'

const HeaderBack = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <ArrowIcon direction={'right'} />
    </TouchableOpacity>
  )
}

export default HeaderBack
