import { supabase } from '@/libs/supabase'
import { Provider } from '@supabase/supabase-js'

export const signInWithProvider = async (provider: Provider) => {
  const { user, session, error } = await supabase.auth.signIn({
    provider,
  })

  console.log({ user, session, error })
}
