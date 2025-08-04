import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_url_here' &&
  supabaseAnonKey !== 'your_supabase_anon_key_here';

// Only create client if properly configured
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Warning for development
if (!isSupabaseConfigured && process.env.NODE_ENV === 'development') {
  console.log('ℹ️ Supabase not configured - using mock data for development');
}

// Error for production
if (!isSupabaseConfigured && process.env.NODE_ENV === 'production') {
  console.error('❌ Supabase configuration required for production');
} 