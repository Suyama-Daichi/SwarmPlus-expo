import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '@/constants/Colors'
import useColorScheme from '@/hooks/useColorScheme'

const HeaderBack = () => {
  const colorScheme = useColorScheme()

  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <FontAwesome5
        name={'chevron-left'}
        style={{
          color: COLORS[colorScheme].primaryOrange,
          paddingLeft: 16,
          fontWeight: '500',
        }}
        size={24}
        solid
      />
    </TouchableOpacity>
  )
}

export default HeaderBack
