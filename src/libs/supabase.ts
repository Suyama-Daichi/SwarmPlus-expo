import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants';

const supabaeConfig = Constants.manifest?.extra?.supabase

const supabaseUrl = supabaeConfig.supabaseUrl
const supabaseAnonKey = supabaeConfig.supabaseAnonKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
})