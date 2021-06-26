import { config } from '@/service/config'
import React from 'react'
import { StyleSheet } from 'react-native'
import { WebView, WebViewNavigation } from 'react-native-webview'
import { useFoursquare } from '@/hooks/useFoursquare'
import { useUtils } from '../hooks/useUtils'

const SignInByFoursquare = () => {
  const { parseURLParams } = useUtils()
  const { fetchAccessToken } = useFoursquare()
  const onNavigationStateChange = async (navigationState: WebViewNavigation) => {
    const url = navigationState.url

    const code = parseURLParams(url, 'code')
    if (code) {
      const accessToken = await fetchAccessToken(code)
      console.log(accessToken)
    }
  }
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config()
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
