import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Load .env and .env.local if present
dotenv.config()
dotenv.config({ path: '.env.local' })

// diagnostic helpers
console.log('cwd:', process.cwd())
const envPath = path.resolve(process.cwd(), '.env.local')
console.log('.env.local exists:', fs.existsSync(envPath), envPath)
try {
  console.log('.env.local contents:\n', fs.readFileSync(envPath, 'utf8'))
} catch (e) {
  console.log('read .env.local error:', e && e.message)
}

// Force-override environment from .env.local to avoid inherited placeholders
try {
  const parsed = dotenv.parse(fs.readFileSync(envPath, 'utf8'))
  Object.assign(process.env, parsed)
  console.log('process.env overridden from .env.local')
} catch (e) {
  console.log('failed to parse/override env from .env.local:', e && e.message)
}

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

console.log('VITE_SUPABASE_URL present:', Boolean(url))
console.log('VITE_SUPABASE_PUBLISHABLE_KEY present:', Boolean(key))
console.log('detected VITE_SUPABASE_URL:', url)

if (!url || !key) process.exit(1)

const supabase = createClient(url, key)

async function run() {
  try {
    const { data: site, error: e1 } = await supabase.from('site_data').select('id, updated_at').limit(1)
    if (e1) console.error('site_data error:', e1.message || e1)
    else console.log('site_data sample:', site)

    const { data: pendaftar, error: e2 } = await supabase.from('pendaftar').select('id,nama,email,kelas,bidang').limit(5)
    if (e2) console.error('pendaftar error:', e2.message || e2)
    else console.log('pendaftar sample (up to 5):', pendaftar)
  } catch (err) {
    console.error('unexpected error:', err)
  }
}

run()
