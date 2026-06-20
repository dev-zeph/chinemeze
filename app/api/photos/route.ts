import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const BUCKET = 'gallery'
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_BYTES = 10 * 1024 * 1024 // 10 MB

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key || url === 'your_supabase_project_url') return null
  return createClient(url, key)
}

export async function GET() {
  const supabase = getClient()
  if (!supabase) return NextResponse.json([], { status: 200 })

  const { data, error } = await supabase.storage.from(BUCKET).list('', {
    sortBy: { column: 'created_at', order: 'desc' },
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: { publicUrl: base } } = supabase.storage.from(BUCKET).getPublicUrl('')
  const baseUrl = base.replace(/\/$/, '')

  const photos = (data ?? [])
    .filter((f) => f.name !== '.emptyFolderPlaceholder')
    .map((f) => ({
      name: f.name,
      url: `${baseUrl}/${f.name}`,
      created_at: f.created_at,
    }))

  return NextResponse.json(photos)
}

export async function POST(req: NextRequest) {
  const supabase = getClient()
  if (!supabase) return NextResponse.json({ error: 'Storage not configured' }, { status: 503 })

  const formData = await req.formData()
  const file = formData.get('photo') as File | null

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, WebP and GIF images are allowed' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File must be under 10 MB' }, { status: 400 })
  }

  const ext = file.name.split('.').pop() ?? 'jpg'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await supabase.storage.from(BUCKET).upload(fileName, buffer, {
    contentType: file.type,
    upsert: false,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(fileName)

  return NextResponse.json({ name: fileName, url: publicUrl }, { status: 201 })
}
