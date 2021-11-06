import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { COLORS } from '../../constants/Colors'

type Props = {
  onPress: () => void
  name: string
  label: string[]
  solid: boolean
}

const FAB = ({ onPress, name, label, solid = false }: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.float_button,
        solid
          ? styles.solid
          : { borderColor: COLORS.common.primaryOrange, backgroundColor: 'white' },
      ]}
      onPress={onPress}
    >
      <View style={{ alignItems: 'center' }}>
        <FontAwesome5 name={name} size={18} color={solid ? 'white' : COLORS.common.primaryOrange} />
        {label.map((m, i) => {
          return (
            <Text
              key={i}
              style={[styles.text, { color: solid ? 'white' : COLORS.common.primaryOrange }]}
            >
              {m}
            </Text>
          )
        })}
      </View>
    </TouchableOpacity>
  )
}

export default memo(FAB)

const styles = StyleSheet.create({
  float_button: {
    zIndex: 99,
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 128,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 0.5,
  },
  solid: {
    borderColor: COLORS.common.primaryOrange,
    backgroundColor: COLORS.common.primaryOrange,
  },
  text: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
  },
})
