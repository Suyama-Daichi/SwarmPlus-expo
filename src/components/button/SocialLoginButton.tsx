import { Button, Icon } from 'native-base'
import { FontAwesome5 } from '@expo/vector-icons'
import { signInWithProvider } from '@/services/auth.supabase'

export const SocialLoginButton = {
  Twitter: () => {
    return (
      <Button
        onPress={() => signInWithProvider('twitter')}
        w={'3/5'}
        backgroundColor={'#1DA1F2'}
        leftIcon={<Icon as={FontAwesome5} name={'twitter'} color="white" />}
      >
        Twitterでログイン
      </Button>
    )
  },
  Facebook: () => {
    return (
      <Button
        w={'3/5'}
        backgroundColor={'#4267B2'}
        leftIcon={<Icon as={FontAwesome5} name={'facebook'} color="white" />}
      >
        Facebookでログイン
      </Button>
    )
  },
  Apple: () => {
    return (
      <Button
        w={'3/5'}
        backgroundColor={'#000000'}
        leftIcon={<Icon as={FontAwesome5} name={'apple'} color="white" />}
      >
        Appleでログイン
      </Button>
    )
  },
  Google: () => {
    return (
      <Button
        w={'3/5'}
        backgroundColor={'#DB4437'}
        leftIcon={<Icon as={FontAwesome5} name={'google'} color="white" />}
      >
        Googleでログイン
      </Button>
    )
  },
}
