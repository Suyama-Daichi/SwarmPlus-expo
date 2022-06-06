import { useState } from 'react'
import {
  getSessionUser,
  signInWithEmail,
  signInWithProvider,
  signUpWithEmail,
} from '@/services/auth.firebase'
import { AuthProvider, User } from '@firebase/auth'
import { atom, useRecoilState } from 'recoil'
import jwtDecode from 'jwt-decode'
import { signOut } from '@/services/auth.firebase'

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

  const setFoursquareAccessToken = (sessionUser: User | null) => {
    if (!sessionUser) return
    const accessToken = jwtDecode<string>(sessionUser['stsTokenManager'].accessToken)
      .accessToken as string
    setAccessToken(accessToken)
    return accessToken
  }

  const logout = async () => {
    await signOut()
  }

  return {
    signInWithProviderHandler,
    signInWithEmailHandler,
    signUpWithEmailHandler,
    setFoursquareAccessToken,
    sessionUser,
    accessToken,
    loading,
    logout,
  }
}
