import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type Props = {
  page: string
  iconName: string
  color?: string
}

const HeaderRight = ({ page, iconName, color }: Props) => {
  const navigation = useNavigation()
  return (
    <Ionicons
      name={iconName}
      style={{ marginRight: 14 }}
      size={24}
      onPress={() => navigation.navigate(page)}
      color={color}
    />
  )
}

export default HeaderRight
