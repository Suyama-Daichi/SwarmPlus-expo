import { HomeScreen, LoginScreen, SignupScreen } from '../screens'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useInitialize } from '@/hooks/useInitialize'
import { ActivityIndicator } from '@/components/atoms/ActivityIndicator'

export const Navigation = () => {
  const RootStack = createStackNavigator()
  const { user, loading } = useInitialize()

  if (loading) return <ActivityIndicator />

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={user ? 'home' : 'login'}>
        <RootStack.Screen name="login" component={LoginScreen} />
        <RootStack.Screen name="signup" component={SignupScreen} />
        <RootStack.Screen name="home" component={HomeScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
