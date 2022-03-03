import { useEffect, useCallback, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { fetchCurrentAuth } from '@/api/auth'
import { useAuth } from '@/hooks/useAuth'
import jwtDecode from 'jwt-decode'

export const useInitialize = () => {
  const { fetchSetUser } = useUser()
  const { setAuthUser, authUser, logout, setAccessToken } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)

  const initialize = useCallback(async () => {
    const currentAuth = await fetchCurrentAuth()
    if (!currentAuth) return
    const accessToken = jwtDecode<string>(currentAuth['stsTokenManager'].accessToken)
      .accessToken as string
    if (typeof accessToken !== 'string') return
    setAccessToken(accessToken)
    setAuthUser(currentAuth)
  }, [setAccessToken, setAuthUser])

  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    if (authUser !== undefined) return
    setLoading(false)
  }, [authUser])

  useEffect(() => {
    if (!authUser) return
    fetchSetUser()
  }, [authUser, fetchSetUser, logout])

  return { loading, isNewUser: !authUser }
}
