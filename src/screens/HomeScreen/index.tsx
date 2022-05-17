import { View } from '@/components'
import { signOut } from '@/services/auth'
import { Button } from 'native-base'

export const HomeScreen = () => {
  return (
    <View>
      <Button onPress={() => signOut()}>ログアウト</Button>
    </View>
  )
}
