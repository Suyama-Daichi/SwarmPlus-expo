import { config } from '@/service/config'
import React, { useCallback } from 'react'
import { WebView, WebViewNavigation } from 'react-native-webview'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { logEvent } from '@/hooks/useAnalytics'
import { parseURLParams } from '@/service/utilFns'
import { fetchAccessToken, fetchUser } from '@/service/foursquareApi'
import { getCustomToken, signInWithCustomToken } from '@/api/auth'
import { useAuth } from '@/hooks/useAuth'
import { SafeAreaView } from 'react-native'

const Login = () => {
  const { setAuthUser, setAccessToken } = useAuth()
  const { CLIENT_ID, REDIRECT_URI } = config()
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const onNavigationStateChange = useCallback(
    async (navigationState: WebViewNavigation) => {
      const { url, loading } = navigationState
      const code = parseURLParams(url, 'code')
      if (code && !loading) {
        const accessToken = await fetchAccessToken(code)
        setAccessToken(accessToken)
        const user = await fetchUser(accessToken)
        if (!user) return
        const token = (await getCustomToken(user.id, accessToken)).data.customToken
        const userCredential = await signInWithCustomToken(token)
        setAuthUser(userCredential.user)
        logEvent('user_login')
        navigation.navigate('AppNavigator')
      }
    },
    [navigation, setAccessToken, setAuthUser]
  )

  return (
    <>
      <SafeAreaView />
      <WebView
        incognito={true}
        source={{
          uri: `https://foursquare.com/oauth2/authenticate?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`,
        }}
        onNavigationStateChange={onNavigationStateChange}
      />
    </>
  )
}

export default Login
