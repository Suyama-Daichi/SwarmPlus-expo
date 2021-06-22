import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '@/constants/Colors'

const HeaderBack = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <FontAwesome5
        name={'chevron-left'}
        style={{
          color: Colors.light.primaryOrange,
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

const styles = StyleSheet.create({})
