import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { ActivityIndicator } from 'react-native'

import { RootStackParamList } from '@/types'
import BottomTabNavigator from '@/navigation/BottomTabNavigator'
import LinkingConfiguration from '@/navigation/LinkingConfiguration'
import { DarkTheme, DefaultTheme } from '@/constants/Theme'
import AppOnboarding from '@/components/pages/Onboarding'
import SignInByFoursquare from '@/components/pages/SignInByFoursquare'
import { useState, useEffect, Suspense } from 'react'
import storage from '@/service/reactNativeStorage'
import { FOURSQUARE_ACCESS_TOKEN } from '@/constants/StorageKeys'
import { setCurrentScreen } from '@/hooks/useAnalytics'
import useColorScheme from '@/hooks/useColorScheme.web'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  const colorScheme = useColorScheme()
  const navigationRef = createNavigationContainerRef()
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const { name: routeName, params } = navigationRef.current?.getCurrentRoute() as {
          name: string
          params: { [k: string]: string }
        }
        setCurrentScreen(routeName, params)
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
  const [accessToken, setAccessToken] = useState<string>()
  const [loading, setLoading] = useState(true)

  const getAccessToken = async () => {
    const accessToken = await storage.load<string>({ key: FOURSQUARE_ACCESS_TOKEN }).catch(() => {
      setLoading(false)
      return undefined
    })
    setAccessToken(accessToken)
    setLoading(false)
  }

  useEffect(() => {
    getAccessToken()
  }, [])

  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={accessToken ? 'Main' : 'Root'}
    >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Root" component={AppOnboarding} />
      <Stack.Screen
        name="Auth"
        component={SignInByFoursquare}
        options={{ headerShown: true, title: 'ログイン', headerLeft: () => null }}
      />
    </Stack.Navigator>
  )
}
