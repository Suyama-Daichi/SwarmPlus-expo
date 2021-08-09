import { COLORS } from '@/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'

type Props = {
  direction: 'right' | 'left' | 'up' | 'down'
  color?: string
}

const ArrowIcon = ({ direction, color = COLORS.common.primaryOrange }: Props) => {
  return (
    <FontAwesome5
      name={`chevron-${direction}`}
      style={{
        color: color,
        fontWeight: '500',
      }}
      size={24}
      solid
    />
  )
}

export default ArrowIcon
