import React from 'react'
import { View, Text } from 'react-native'
import window from '@/constants/Layout'
import { COLORS } from '@/constants/Colors'
import { getDateString, getDay } from '@/service/dateFns'
import useColorScheme from '@/hooks/useColorScheme'
import { Icon } from 'react-native-elements'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/core'
import { useRecoil } from '../../hooks/useRecoil'

type Props = {
  date: Date
}

export const DividerByDate = ({ date }: Props) => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { setSelectedDateOnMap } = useRecoil()

  const onPressMapIcon = () => {
    setSelectedDateOnMap(date)
    navigation.navigate('MapNavigator')
  }

  return (
    <View style={{ backgroundColor: 'white', width: window.window.width }}>
      <View
        style={[
          { justifyContent: 'center' },
          {
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            width: window.window.width / 2,
            borderColor: COLORS[colorScheme].primaryOrange,
            backgroundColor: COLORS[colorScheme].primaryOrange,
          },
          { marginVertical: 8, height: 30 },
        ]}
      >
        <View
          style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'stretch' }}
        >
          <Text
            style={[
              { color: 'white', fontWeight: 'bold' },
              { paddingLeft: 8, alignSelf: 'center' },
            ]}
          >
            {getDateString(date, 'yyyy/MM/dd')}({getDay(date)})
          </Text>
          <Icon name={'map'} color={'white'} onPress={onPressMapIcon} />
        </View>
      </View>
    </View>
  )
}
