import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants/Colors'

type Props = {
  buttons: { label: string; onPress?: () => void }[]
}

const ToolBar = ({ buttons }: Props) => {
  return (
    <View
      style={[
        { flexDirection: 'row' },
        { justifyContent: buttons.length === 1 ? 'flex-end' : 'center' },
      ]}
    >
      {buttons.map(({ label, onPress }) => (
        <TouchableOpacity
          key={label}
          style={{ padding: 8 }}
          onPress={() => typeof onPress === 'function' && onPress()}
        >
          <Text style={{ fontSize: 20, color: COLORS.common.textSub, fontWeight: 'bold' }}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default ToolBar
