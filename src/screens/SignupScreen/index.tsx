import { Input, VStack } from '@/components'
import { useAuth } from '@/hooks/useAuth'
import { FontAwesome5 } from '@expo/vector-icons'
import { Button, Icon, Text } from 'native-base'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export const SignupScreen = () => {
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signUpWithEmailHandler, loading } = useAuth()

  return (
    <VStack flex="1" space={'6'}>
      <VStack alignItems={'center'} space={'1'}>
        <VStack>
          <Text>メールアドレス</Text>
          <Input placeholder="email" onChangeText={(email) => setEmail(email)} />
        </VStack>
        <VStack>
          <Text>パスワード</Text>
          <Input
            type={visible ? 'text' : 'password'}
            placeholder="password"
            onChangeText={(password) => setPassword(password)}
            rightElement={<Icon
              as={FontAwesome5}
              name={visible ? 'eye' : 'eye-slash'}
              onPress={() => setVisible(!visible)}
              mr="2"
            />}
          />
        </VStack>
        <VStack>
          <Text>パスワード(再入力)</Text>
          <Input
            type={visible ? 'text' : 'password'}
            placeholder="password"
            rightElement={<Icon
              as={FontAwesome5}
              name={visible ? 'eye' : 'eye-slash'}
              onPress={() => setVisible(!visible)}
              mr="2"
            />}
          />
        </VStack>
      </VStack>
      <VStack alignItems={'center'}>
        <Button
          isLoading={loading}
          width={'3/5'}
          onPress={() =>
            signUpWithEmailHandler(email, password).then(
              (error) => error && navigation.push('home')
            )}
        >
          新規登録
        </Button>
      </VStack>
    </VStack>
  )
}
