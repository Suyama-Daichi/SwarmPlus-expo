import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { ActivityIndicator, ColorSchemeName } from 'react-native'

import { RootStackParamList } from '@/types'
import BottomTabNavigator from '@/navigation/BottomTabNavigator'
import LinkingConfiguration from '@/navigation/LinkingConfiguration'
import { DarkTheme, DefaultTheme } from '@/constants/Theme'
import AppOnboarding from '@/screens/Onboarding'
import SignInByFoursquare from '@/screens/SignInByFoursquare'
import { useState, useEffect, useRef } from 'react'
import storage from '../service/reactNativeStorage'
import { FOURSQUARE_ACCESS_TOKEN } from '../constants/StorageKeys'
import { setCurrentScreen } from '../hooks/useAnalytics'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const navigationRef = useRef<NavigationContainerRef>()
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const { name: routeName, params } = navigationRef.current?.getCurrentRoute() as {
          name: string
          params: { [k: string]: string }
        }
        void setCurrentScreen(routeName, params)
      }}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  const [accessToken, setAccessToken] = useState<string | void>()
  const [loading, setLoading] = useState(true)

  const getAccessToken = async () => {
    // storage.remove({ key: FOURSQUARE_ACCESS_TOKEN })
    const accessToken = await storage
      .load<string>({ key: FOURSQUARE_ACCESS_TOKEN })
      .catch(() => setLoading(false))
    setAccessToken(accessToken)
    setLoading(false)
  }

  useEffect(() => {
    void getAccessToken()
  }, [])

  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {accessToken ? (
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Root" component={AppOnboarding} />
          <Stack.Screen
            name="Auth"
            component={SignInByFoursquare}
            options={{ headerShown: true, title: '認証', headerLeft: () => null }}
          />
          <Stack.Screen name="Main" component={BottomTabNavigator} />
        </>
      )}
    </Stack.Navigator>
  )
}
