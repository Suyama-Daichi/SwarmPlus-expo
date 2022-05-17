import { HomeScreen, LoginScreen } from '@/screens'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

export const Navigation = () => {
  const RootStack = createStackNavigator()
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="login">
        <RootStack.Screen name="login" component={LoginScreen} />
        <RootStack.Screen name="home" component={HomeScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
