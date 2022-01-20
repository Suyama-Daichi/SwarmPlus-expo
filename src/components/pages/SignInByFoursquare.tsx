import { config } from '@/service/config'
import React from 'react'
import { WebView, WebViewNavigation } from 'react-native-webview'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { FOURSQUARE_ACCESS_TOKEN } from '@/constants/StorageKeys'
import { setUserId, logEvent } from '@/hooks/useAnalytics'
import storage from '@/service/reactNativeStorage'
import { parseURLParams } from '@/service/utilFns'
import { fetchAccessToken } from '@/service/foursquareApi'
import { useUser } from '../../hooks/useUser'

const SignInByFoursquare = () => {
  const { fetchSetUser } = useUser()
  const { CLIENT_ID, REDIRECT_URI } = config()
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const onNavigationStateChange = async (navigationState: WebViewNavigation) => {
    const { url, loading } = navigationState
    const code = parseURLParams(url, 'code')
    if (code && !loading) {
      const accessToken = await fetchAccessToken(code)
      await storage.save({ key: FOURSQUARE_ACCESS_TOKEN, data: accessToken })
      const user = await fetchSetUser()
      setUserId(user ? user.id : '')
      logEvent('user_login')
      navigation.navigate('Main')
    }
  }
  return (
    <WebView
      incognito={true}
      source={{
        uri: `https://foursquare.com/oauth2/authenticate?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`,
      }}
      onNavigationStateChange={onNavigationStateChange}
    />
  )
}

export default SignInByFoursquare
