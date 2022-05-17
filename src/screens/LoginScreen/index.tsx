import { Input, SocialLoginButton, VStack } from '@/components'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Button, Divider, Icon, Text } from 'native-base'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export const LoginScreen = () => {
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signInWithEmailHandler, loading } = useAuth()

  return (
    <VStack flex={1} space="10">
      <VStack alignItems={'center'} space={1}>
        <SocialLoginButton.Twitter />
        <SocialLoginButton.Facebook />
        <SocialLoginButton.Google />
        <SocialLoginButton.Apple />
      </VStack>
      <VStack alignItems={'center'}>
        <Text>または</Text>
        <Divider thickness={'1.5'} />
      </VStack>
      <VStack alignItems={'center'}>
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
            rightElement={
              <Icon
                as={FontAwesome5}
                name={visible ? 'eye' : 'eye-slash'}
                onPress={() => setVisible(!visible)}
                mr="2"
              />
            }
          />
        </VStack>
      </VStack>
      <VStack alignItems={'center'}>
        <Button
          isLoading={loading}
          width={'3/5'}
          onPress={() => signInWithEmailHandler(email, password)}
        >
          ログイン
        </Button>
        <Button variant={'link'} onPress={() => navigation.push('signup')}>
          新規登録
        </Button>
      </VStack>
    </VStack>
  )
}
