import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key || url === 'your_supabase_project_url') {
    return null
  }
  return createClient(url, key)
}

export async function GET() {
  const supabase = getClient()
  if (!supabase) {
    return NextResponse.json([], { status: 200 })
  }

  const { data, error } = await supabase
    .from('condolences')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = getClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured yet' }, { status: 503 })
  }

  const body = await req.json()
  const { name, message } = body

  if (!name?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name and message are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('condolences')
    .insert([{ name: name.trim(), message: message.trim() }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
