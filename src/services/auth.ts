import { supabase } from '@/libs/supabase'
import { Provider } from '@supabase/supabase-js'

export const signInWithProvider = async (provider: Provider) => {
  const { user, session, error } = await supabase.auth.signIn({
    provider,
  })

  console.log({ user, session, error })
}

export const signInWithEmail = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  })

  console.log({ user, error })
}

export const signUpWithEmail = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  })

  console.log({ user, error })
}
