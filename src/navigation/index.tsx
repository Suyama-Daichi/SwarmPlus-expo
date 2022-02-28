import * as React from 'react'
import AppOnboarding from '@/components/pages/Onboarding'
import { AppNavigatorParamList } from '@/RouteParamList'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabsNavigator from '@/navigation/BottomTabNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { useInitialize } from '@/hooks/useInitialize'

const Navigation = () => {
  const { isNewUser } = useInitialize()
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isNewUser ? 'InitialOnboarding' : 'AppNavigator'}
      >
        <Stack.Screen name="AppNavigator" component={AppNavigator} />
        <Stack.Screen name="InitialOnboarding" component={AppOnboarding} />
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
