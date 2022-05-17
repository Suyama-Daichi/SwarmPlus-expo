import { SocialLoginButton, VStack } from '@/components'

export const LoginScreen = () => {
  return (
    <VStack flex={1} alignItems="center" space={'1'}>
      <SocialLoginButton.Twitter />
      <SocialLoginButton.Facebook />
      <SocialLoginButton.Google />
      <SocialLoginButton.Apple />
    </VStack>
  )
}
