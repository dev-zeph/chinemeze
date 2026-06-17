import { createClient } from '@supabase/supabase-js'

export type Condolence = {
  id: number
  name: string
  message: string
  created_at: string
}

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key || url === 'your_supabase_project_url') return null
  return createClient(url, key)
}
