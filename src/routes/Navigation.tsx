import { HomeScreen, LoginScreen, SignupScreen } from '@/screens'
import { getSessionUser } from '@/services/auth'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

export const Navigation = () => {
  const RootStack = createStackNavigator()
  const user = getSessionUser()

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {user ? (
          <RootStack.Screen name="home" component={HomeScreen} />
        ) : (
          <>
            <RootStack.Screen name="login" component={LoginScreen} />
            <RootStack.Screen name="signup" component={SignupScreen} />
            <RootStack.Screen name="home" component={HomeScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
