import { useCallback } from 'react'
import { WebView, WebViewNavigation } from 'react-native-webview'
import {
  NavigationProp,
  ParamListBase,
  StackActions,
  useNavigation,
} from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import { foursquareConfig } from '@/libs/foursquare'
import { logEvent } from '@/hooks/useAnalytics'
import { parseURLParams } from '@/utils/utilFns'
import { fetchAccessToken, fetchUser } from '@/api/foursquareApi'
import { getCustomToken, signInWithCustomToken } from '@/services/auth.firebase'

export const LoginScreen = () => {
  const { CLIENT_ID, REDIRECT_URI } = foursquareConfig
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const onNavigationStateChange = useCallback(
    async (navigationState: WebViewNavigation) => {
      const { url, loading } = navigationState
      const code = parseURLParams(url, 'code')
      if (code && !loading) {
        const accessToken = await fetchAccessToken(code)
        const user = await fetchUser(accessToken)
        if (!user) return
        const token = (await getCustomToken(user.id, accessToken)).data.customToken
        const userCredential = await signInWithCustomToken(token)
        logEvent('user_login')
        navigation.dispatch(StackActions.replace('home'))
      }
    },
    [navigation]
  )

  return (
    <>
      <SafeAreaView />
      <WebView
        incognito={false}
        source={{
          uri: `https://foursquare.com/oauth2/authenticate?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`,
        }}
        onNavigationStateChange={onNavigationStateChange}
      />
    </>
  )
}
