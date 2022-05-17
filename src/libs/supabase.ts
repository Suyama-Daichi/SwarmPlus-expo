import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants'

type Extra = {
  SUPABASE_URL: string
  SUPABASE_SECRET: string
}

const { SUPABASE_URL, SUPABASE_SECRET } = Constants.manifest?.extra as Extra

const supabaseUrl = SUPABASE_URL
const supabaseAnonKey = SUPABASE_SECRET

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
})
