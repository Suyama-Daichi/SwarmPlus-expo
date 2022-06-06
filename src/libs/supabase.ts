import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants'

const supabaseConfig = Constants.manifest?.extra?.supabase

const supabaseUrl = supabaseConfig.supabaseUrl
const supabaseAnonKey = supabaseConfig.supabaseAnonKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
})
