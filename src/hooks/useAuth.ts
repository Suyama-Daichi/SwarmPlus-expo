import { useState } from 'react'
import {
  getSessionUser, signInWithEmail, signInWithProvider, signUpWithEmail
} from '@/services/auth.firebase'
import { AuthProvider } from '@firebase/auth'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)

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

  return {
    signInWithProviderHandler,
    signInWithEmailHandler,
    signUpWithEmailHandler,
    sessionUser,
    loading }
}
