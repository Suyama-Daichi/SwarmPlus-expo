import { useEffect, useState, useCallback } from 'react'
import { useUser } from '@/hooks/useUser'
import { setUserId } from '@/hooks/useAnalytics'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { FOURSQUARE_ACCESS_TOKEN } from '@/constants/StorageKeys'
import storage from '@/service/reactNativeStorage'

export const useInitialize = () => {
  const { fetchSetUser, authUser, fetchSetCurrentAuth } = useUser()
  const [loading, setLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState<boolean | undefined>(undefined)

  const initialize = useCallback(() => {
    fetchSetCurrentAuth()
  }, [])

  const initializeInLogin = useCallback(() => {
    if (!authUser) {
      setIsNewUser(!!authUser)
      return
    } else {
      const claims = jwtDecode<JwtPayload>(authUser.accessToken)
      storage.save({ key: FOURSQUARE_ACCESS_TOKEN, data: claims['accessToken'] })
      // // FoursquareUserを取得
      // // Firestoreから取得する
      fetchSetUser()
      setUserId(authUser.uid)
      setIsNewUser(!authUser)
    }
  }, [authUser, fetchSetUser])

  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    initializeInLogin()
  }, [authUser, initializeInLogin])

  return { loading, isNewUser }
}
