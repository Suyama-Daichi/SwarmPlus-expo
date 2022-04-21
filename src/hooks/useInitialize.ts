import { useEffect, useCallback, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { fetchCurrentAuth } from '@/api/auth'
import { useAuth } from '@/hooks/useAuth'
import jwtDecode from 'jwt-decode'

/** アプリのコールドスタート時の処理 */
export const useInitialize = () => {
  const { fetchSetUser } = useUser()
  const { setAuthUser, authUser, logout, setAccessToken, accessToken } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)

  const initialize = useCallback(async () => {
    const currentAuth = await fetchCurrentAuth()
    if (!currentAuth) return setLoading(false)
    const accessToken = jwtDecode<string>(currentAuth['stsTokenManager'].accessToken)
      .accessToken as string
    if (typeof accessToken !== 'string') return setLoading(false)
    setAccessToken(accessToken)
    setAuthUser(currentAuth)
  }, [])

  useEffect(() => {
    setLoading(true)
    initialize()
  }, [])

  useEffect(() => {
    if (!accessToken) return
    setLoading(false)
  }, [accessToken])

  return { loading, isNewUser: !authUser }
}
