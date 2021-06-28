import React from 'react'
import { StyleSheet } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

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
          image: <Image source={require('../../assets/images/calendar-view.png')} />,
          title: 'SwarmPlus',
          subtitle: 'あの日を振り返ろう',
        },
      ]}
    />
  )
}

export default AppOnboarding

const styles = StyleSheet.create({})
