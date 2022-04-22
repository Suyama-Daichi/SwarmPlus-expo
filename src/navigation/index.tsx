import React from 'react'
import { AppOnboarding, Login } from '@/components/pages'
import { AppNavigatorParamList } from '@/RouteParamList'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabsNavigator from '@/navigation/BottomTabNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { useInitialize } from '@/hooks/useInitialize'

import { ActivityIndicator } from 'react-native'

const Navigation = () => {
  const { isNewUser, loading } = useInitialize()
  const Stack = createStackNavigator()

  if (loading) return <ActivityIndicator />

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isNewUser ? 'InitialOnboarding' : 'AppNavigator'}
      >
        <Stack.Screen name="AppNavigator" component={AppNavigator} />
        <Stack.Screen name="InitialOnboarding" component={AppOnboarding} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const AppNavigator = () => {
  const Stack = createStackNavigator<AppNavigatorParamList>()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabsNavigator" component={BottomTabsNavigator} />
    </Stack.Navigator>
  )
}
export default Navigation
