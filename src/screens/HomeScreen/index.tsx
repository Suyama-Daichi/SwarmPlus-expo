import { View } from '@/components'
import { signOut } from '@/services/auth'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'native-base'

export const HomeScreen = () => {
  const navigation = useNavigation()
  const logoutHandler = async () => {
    await signOut()
    navigation.push('login')
  }

  return (
    <View>
      <Button onPress={logoutHandler}>ログアウト</Button>
    </View>
  )
}
