import React from 'react'
import { View } from 'react-native'

type Props = {
  children: React.ReactNode
}

const HeaderRight = ({ children }: Props) => {
  return <View style={{ marginRight: 16 }}>{children}</View>
}

export default HeaderRight
