import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type Props = {
  buttons: { label: string; onPress: () => void }[]
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
        <TouchableOpacity key={label} style={{ padding: 8 }} onPress={() => onPress()}>
          <Text>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default ToolBar

const styles = StyleSheet.create({})
