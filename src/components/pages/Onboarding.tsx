import React from 'react'
import { StyleSheet } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import CalendarImage from '../../../assets/images/calendar-view.png'

const AppOnboarding = () => {
  const navigation = useNavigation()
  return (
    <Onboarding
      onDone={() => {
        navigation.navigate('Auth')
      }}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={CalendarImage} />,
          title: 'SwarmPlus',
          subtitle: 'あの日を振り返ろう',
        },
      ]}
    />
  )
}

export default AppOnboarding
