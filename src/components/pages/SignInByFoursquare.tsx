import { config } from '@/service/config'
import React from 'react'
import { StyleSheet } from 'react-native'
import { WebView, WebViewNavigation } from 'react-native-webview'
import { useFoursquare } from '@/hooks/useFoursquare'
import { useNavigation } from '@react-navigation/native'
import { FOURSQUARE_ACCESS_TOKEN } from '@/constants/StorageKeys'
import { setUserId, logEvent } from '@/hooks/useAnalytics'
import { useUtils } from '@/hooks/useUtils'
import storage from '@/service/reactNativeStorage'

const SignInByFoursquare = () => {
  const { parseURLParams } = useUtils()
  const { fetchAccessToken, fetchUser } = useFoursquare()
  const { CLIENT_ID, REDIRECT_URI } = config()
  const navigation = useNavigation()

  const onNavigationStateChange = async (navigationState: WebViewNavigation) => {
    const { url, loading } = navigationState
    const code = parseURLParams(url, 'code')
    if (code && !loading) {
      const accessToken = await fetchAccessToken(code)
      await storage.save({ key: FOURSQUARE_ACCESS_TOKEN, data: accessToken })
      const user = await fetchUser()
      void setUserId(user.id)
      await logEvent('login')
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

const styles = StyleSheet.create({})
