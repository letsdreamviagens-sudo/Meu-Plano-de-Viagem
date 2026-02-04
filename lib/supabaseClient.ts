import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // aqui é sb_publishable...

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    // ✅ força só apikey (NÃO manda Bearer sb_publishable)
    headers: {
      apikey: supabaseKey,
    },
  },
  auth: {
    // ✅ como você não está usando login ainda, evita sessão/callback
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
})
