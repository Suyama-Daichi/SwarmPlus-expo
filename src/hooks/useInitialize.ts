import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { setUserId } from '@/hooks/useAnalytics'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/service/firebase'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { FOURSQUARE_ACCESS_TOKEN } from '@/constants/StorageKeys'
import storage from '@/service/reactNativeStorage'

export const useInitialize = () => {
  const { fetchSetUser, setAuthUser } = useUser()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // authを取得
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (!user) return
        const claims = jwtDecode<JwtPayload>(user.accessToken)
        storage.save({ key: FOURSQUARE_ACCESS_TOKEN, data: claims['accessToken'] })
        setAuthUser({ ...user })
        // FoursquareUserを取得
        fetchSetUser()
        setUserId(user.uid)
      },
      (e) => {
        console.error(e)
      }
    )
    return () => {
      unsubscribe()
    }
  }, [fetchSetUser, setAuthUser])

  return { loading }
}
