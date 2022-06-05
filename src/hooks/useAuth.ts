import { useState } from 'react'
import {
  getSessionUser, signInWithEmail, signInWithProvider, signUpWithEmail
} from '@/services/auth.firebase'
import { AuthProvider } from '@firebase/auth'
import { atom, useRecoilState } from 'recoil'
import jwtDecode from 'jwt-decode'

const accessTokenAtom = atom<string | undefined>({
  key: 'accessToken',
  default: undefined,
})

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom)

  const signInWithProviderHandler = async (provider: AuthProvider) => {
    setLoading(true)
    return await signInWithProvider(provider).finally(() => setLoading(false))
  }

  const signInWithEmailHandler = async (email: string, password: string) => {
    setLoading(true)
    return await signInWithEmail(email, password).finally(() => setLoading(false))
  }

  const signUpWithEmailHandler = async (email: string, password: string) => {
    setLoading(true)
    return await signUpWithEmail(email, password).finally(() => setLoading(false))
  }

  const sessionUser = getSessionUser()

  const setFoursquareAccessToken = () => {
    if(!sessionUser)return
    const accessToken = jwtDecode<string>(sessionUser['stsTokenManager'].accessToken)
      .accessToken as string
    setAccessToken(accessToken)
    return accessToken
  }

  return {
    signInWithProviderHandler,
    signInWithEmailHandler,
    signUpWithEmailHandler,
    setFoursquareAccessToken,
    sessionUser,
    accessToken,
    loading }
}
