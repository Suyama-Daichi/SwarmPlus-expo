import { useState } from 'react'
import { signInWithEmail, signInWithProvider, signUpWithEmail } from '@/services/auth'
import { Provider } from '@supabase/supabase-js'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)

  const signInWithProviderHandler = async (provider: Provider) => {
    setLoading(true)
    signInWithProvider(provider).finally(() => setLoading(false))
  }

  const signInWithEmailHandler = async (email: string, password: string) => {
    setLoading(true)
    signInWithEmail(email, password).finally(() => setLoading(false))
  }

  const signUpWithEmailHandler = async (email: string, password: string) => {
    setLoading(true)
    signUpWithEmail(email, password).finally(() => setLoading(false))
  }

  return { signInWithProviderHandler, signInWithEmailHandler, signUpWithEmailHandler, loading }
}
