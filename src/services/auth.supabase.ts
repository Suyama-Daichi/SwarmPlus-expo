import { supabase } from '@/libs/supabase'
import { Provider } from '@supabase/supabase-js'

export const signInWithProvider = async (provider: Provider) => {
  const { user, session, error } = await supabase.auth.signIn({
    provider,
  })
  return user
}

export const signInWithEmail = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  })
  return user
}

export const signUpWithEmail = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return user
}

export const getSessionUser = () => {
  const user = supabase.auth.user()
  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
}
