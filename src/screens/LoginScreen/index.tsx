import { Input, SocialLoginButton, VStack } from '@/components'
import { FontAwesome5 } from '@expo/vector-icons'
import { Button, Divider, Icon, Text } from 'native-base'
import { useState } from 'react'

export const LoginScreen = () => {
  const [visible, setVisible] = useState(false)

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
          <Input placeholder="email" />
        </VStack>
        <VStack>
          <Text>パスワード</Text>
          <Input
            type={visible ? 'text' : 'password'}
            placeholder="password"
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
        <Button width={'3/5'}>ログイン</Button>
      </VStack>
    </VStack>
  )
}
