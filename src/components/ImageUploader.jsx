import { useRef, useState } from 'react'
import { IconImage, IconX, IconUpload } from './icons'
import { supabase } from '../lib/supabase'

function compressImage(file, maxDim = 900, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        let { width, height } = img
        const scale = Math.min(1, maxDim / Math.max(width, height))
        width = Math.max(1, Math.round(width * scale))
        height = Math.max(1, Math.round(height * scale))
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = reject
      img.src = reader.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function ImageUploader({ value = '', onChange }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return
    const file = files[0]
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (JPG, PNG, dll).')
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Ukuran file maksimal 8MB.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const dataUrl = await compressImage(file)
      if (!supabase) {
        throw new Error('Supabase belum dikonfigurasi.')
      }

      const imageBlob = await fetch(dataUrl).then((response) => response.blob())
      const filePath = `kegiatan/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`
      const { error: uploadError } = await supabase.storage
        .from('activity-images')
        .upload(filePath, imageBlob, { contentType: 'image/jpeg', upsert: false })
      if (uploadError) throw uploadError

      const { data: publicUrl } = supabase.storage.from('activity-images').getPublicUrl(filePath)
      onChange(publicUrl.publicUrl)
    } catch (e) {
      setError('Gagal mengunggah gambar. Pastikan bucket Supabase sudah dikonfigurasi.')
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink">Gambar Kegiatan</label>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-all duration-300 ${
          dragging
            ? 'border-brand-500 bg-brand-50 scale-[1.01]'
            : 'border-stone-300 bg-cream hover:border-brand-400 hover:bg-brand-50/50'
        }`}
      >
        {loading ? (
          <>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
              <svg className="h-7 w-7 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
              </svg>
            </span>
            <p className="text-sm font-semibold text-ink">Memproses gambar...</p>
          </>
        ) : (
          <>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <IconUpload className="h-7 w-7" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">
                <span className="text-brand-700">Klik untuk pilih</span> atau seret gambar ke sini
              </p>
              <p className="mt-1 text-xs text-stone-400">JPG atau PNG · maks. 8MB</p>
            </div>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { handleFiles(e.target.files); e.target.value = '' }}
        />
      </div>

      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}

      {/* Preview */}
      {value && (
        <div className="relative mt-3 overflow-hidden rounded-2xl border border-stone-200 shadow-soft">
          <img src={value} alt="Preview" className="h-44 w-full object-cover" />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange('') }}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 shadow transition hover:bg-red-600 hover:text-white"
            title="Hapus gambar"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Input URL manual alt */}
      <div className="mt-3 flex items-center gap-2 text-xs text-stone-400">
        <IconImage className="h-4 w-4 shrink-0" />
        <input
          type="url"
          value={value.startsWith('data:') ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="atau tempel URL gambar di sini..."
          className="w-full rounded-lg border border-dashed border-stone-300 bg-white px-3 py-1.5 text-xs text-stone-700 placeholder-stone-400 focus:border-brand-400 focus:outline-none"
        />
      </div>
    </div>
  )
}

