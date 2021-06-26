import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

import { RootStackParamList } from '@/types'
import BottomTabNavigator from '@/navigation/BottomTabNavigator'
import LinkingConfiguration from '@/navigation/LinkingConfiguration'
import { DarkTheme, DefaultTheme } from '@/constants/Theme'
import AppOnboarding from '@/screens/Onboarding'
import SignInByFoursquare from '@/screens/SignInByFoursquare'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
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
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={AppOnboarding} />
      <Stack.Screen
        name="Auth"
        component={SignInByFoursquare}
        options={{ headerShown: true, title: '認証', headerLeft: () => null }}
      />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  )
}
