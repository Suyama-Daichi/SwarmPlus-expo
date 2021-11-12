import { ParamListBase, useNavigation as un } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

export const useNavigation = () => {
  const navigation = un<StackNavigationProp<ParamListBase>>()
  return navigation
}
