import { supabase } from '@/libs/supabase'
import { Provider } from '@supabase/supabase-js'

export const signInWithProvider = async (provider: Provider) => {
  const { user, session, error } = await supabase.auth.signIn({
    provider,
  })
  console.log({ user, session, error })
  return user
}

export const signInWithEmail = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  })
  console.log({ user, error })
  return user
}

export const signUpWithEmail = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  })
  console.log({ user, error })
  return user
}

export const getSessionUser = () => {
  const user = supabase.auth.user()
  console.log(user)
  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  console.log(error)
}
