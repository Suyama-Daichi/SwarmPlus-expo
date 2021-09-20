import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import { Image } from 'react-native-elements'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { ImageSourcePropType } from 'react-native'
import CalendarImage from '../../../assets/images/calendar-view.png'

const AppOnboarding = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  return (
    <Onboarding
      bottomBarColor={'orange'}
      onDone={() => {
        navigation.navigate('Auth')
      }}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={CalendarImage as ImageSourcePropType} />,
          title: 'SwarmPlus',
          subtitle: 'あの日を振り返ろう',
        },
      ]}
    />
  )
}

export default AppOnboarding
