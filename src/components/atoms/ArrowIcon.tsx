import { FontAwesome5 } from '@expo/vector-icons'
import { Icon } from 'native-base'
import React from 'react'

type Props = {
  direction: 'right' | 'left' | 'up' | 'down'
}

const ArrowIcon = ({ direction }: Props) => {
  return <Icon as={FontAwesome5} name={`chevron-${direction}`} size="lg" />
}

export default ArrowIcon
