import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'

const DataContext = createContext()

const STORAGE_KEY = 'ekskul-rpl-data-v1'

const defaultData = {
  // Data umum kegiatan ekskul
  kegiatan: [
    {
      id: 1,
      bidang: 'Robotic',
      judul: 'Dasar Elektronika & Mikrokontroler',
      deskripsi:
        'Belajar dasar elektronika, sensor, aktuator, dan pemrograman mikrokontroler untuk membangun robot.',
      gambar:
        'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      bidang: 'Robotic',
      judul: 'Merakit Robot Line Follower',
      deskripsi:
        'Merakit robot pengikut garis menggunakan sensor infrared dan motor DC, siap untuk lomba.',
      gambar:
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      bidang: 'Website',
      judul: 'Dasar HTML, CSS & JavaScript',
      deskripsi:
        'Membangun landing page statis pertama dengan HTML, CSS, dan interaksi dasar JavaScript.',
      gambar:
        'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      bidang: 'Website',
      judul: 'Framework React & Deployment',
      deskripsi:
        'Mengenal komponen React, state, routing, dan proses deployment aplikasi ke hosting gratis.',
      gambar:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      bidang: 'Desain Grafis',
      judul: 'Desain Poster & Media Sosial',
      deskripsi:
        'Membuat poster dan konten media sosial yang menarik menggunakan prinsip desain modern.',
      gambar:
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      bidang: 'Desain Grafis',
      judul: 'Identitas Visual & Logo',
      deskripsi:
        'Merancang logo dan identitas visual dengan pemilihan warna, tipografi, dan tata letak yang tepat.',
      gambar:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    },
  ],

  // Jadwal latihan per bidang
  jadwal: [
    { id: 1, bidang: 'Robotic', hari: 'Senin', waktu: '15.00 - 17.00', tempat: 'Lab Komputer 1' },
    { id: 2, bidang: 'Website', hari: 'Rabu', waktu: '15.00 - 17.00', tempat: 'Lab Komputer 2' },
    { id: 3, bidang: 'Desain Grafis', hari: 'Jumat', waktu: '15.00 - 17.00', tempat: 'Ruang Multimedia' },
  ],

  // Pengumuman
  pengumuman: [
    {
      id: 1,
      judul: 'Penerimaan Anggota Baru Dibuka',
      isi: 'Pendaftaran anggota baru Ekstrakulikuler RPL tahun ajaran ini telah dibuka. Segera daftarkan dirimu sebelum kuota penuh!',
      tanggal: '2025-01-10',
    },
    {
      id: 2,
      judul: 'Latihan Gabungan Antar Bidang',
      isi: 'Akan diadakan latihan gabungan antara bidang Robotic, Website, dan Desain Grafis dalam rangka persiapan pameran sekolah.',
      tanggal: '2025-01-20',
    },
  ],

// Grup WhatsApp per bidang
  groupLinks: {
    'Robotic': 'https://chat.whatsapp.com/robotic-rpl',
    'Website': 'https://chat.whatsapp.com/website-rpl',
    'Desain Grafis': 'https://chat.whatsapp.com/desain-rpl',
  },

  // Data pendaftar / anggota
  pendaftar: [],

  // Kontak & sosmed
  kontak: {
    email: 'ekskul.robotik@sekolah.sch.id',
    telepon: '0812-3456-7890',
    alamat: 'Jl. Kyai Mojo, Wonoayu, Sidoarjo',
  },
  sosmed: {
    instagram: 'https://instagram.com/ekskul.rpl',
    youtube: 'https://youtube.com/@ekskulrpl',
    tiktok: 'https://tiktok.com/@ekskul.rpl',
    github: 'https://github.com/ekskul-rpl',
  },

  // Galeri kegiatan
  galeri: [
    {
      id: 1,
      judul: 'Latihan Robotika',
      bidang: 'Robotic',
      gambar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      judul: 'Workshop Web',
      bidang: 'Website',
      gambar: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      judul: 'Sesi Desain Grafis',
      bidang: 'Desain Grafis',
      gambar: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      judul: 'Uji Coba Robot',
      bidang: 'Robotic',
      gambar: 'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      judul: 'Tim Pengembang Web',
      bidang: 'Website',
      gambar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      judul: 'Karya Desain Siswa',
      bidang: 'Desain Grafis',
      gambar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    },
  ],

  // Modul Artikel Bidang Sains, Teknologi & Desain (PRD Section 3.4)
  artikel: [
    {
      id: 1,
      bidang: 'Robotik',
      judul: 'Panduan Merakit Robot Line Follower Berbasis Arduino Uno',
      summary: 'Eksplorasi sensor infrared, kalibrasi driver motor L298N, dan logika mikrokontroler untuk robot pengikut garis berkecepatan tinggi.',
      konten: 'Robot Line Follower adalah gerbang awal bagi siswa untuk memahami integrasi mekanika, elektronika analog, dan logika kode mikrokontroler. Dalam proyek ini, kita menggunakan modul mikrokontroler Arduino Uno, sensor photodioda TCRT5000, serta motor DC berkecepatan tinggi. Siswa belajar menghitung pembacaan analog dan menerapkan algoritma kontrol untuk merespons garis lintasan secara presisi.',
      penulis: 'Divisi Robotik RPL',
      tanggal: '2025-02-24',
      gambar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-robot',
    },
    {
      id: 2,
      bidang: 'Website & Pemrograman',
      judul: 'Membangun Aplikasi Web Modern dengan React dan Tailwind CSS',
      summary: 'Langkah praktis membangun antarmuka web responsif, modularitas komponen, hingga teknik deployment ke layanan cloud hosting.',
      konten: 'Pengembangan web saat ini menitikberatkan pada kecepatan, kebersihan arsitektur komponen, serta konsistensi desain sistem. Siswa diajarkan bagaimana merancang tata letak berbasis flexbox dan grid, mengelola state dengan React Hooks, serta memastikan tampilan website ramah bagi pengguna mobile maupun desktop.',
      penulis: 'Divisi Web RPL',
      tanggal: '2025-02-22',
      gambar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-code',
    },
    {
      id: 3,
      bidang: 'Desain Grafis',
      judul: 'Prinsip Hierarki Tipografi & Tata Letak Poster Karya Siswa',
      summary: 'Kiat memilih jenis huruf geometris, proporsi kontras warna solid, dan tata letak visual untuk menciptakan publikasi yang berdaya tarik.',
      konten: 'Desain visual yang efektif berawal dari pemahaman kuat tentang hierarki informasi. Melalui modul ini, anggota desain grafis mempelajari kombinasi jenis huruf Space Grotesk dan Plus Jakarta Sans, pengaturan whitespace, serta pemilihan palet warna solid untuk kebutuhan branding dan poster ekstrakurikuler.',
      penulis: 'Divisi Desain RPL',
      tanggal: '2025-02-20',
      gambar: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-palette',
    },
    {
      id: 4,
      bidang: 'Robotik',
      judul: 'Implementasi Sensor Suhu & Kelembapan IoT Menggunakan ESP32',
      summary: 'Proyek pemantauan kondisi lingkungan laboratorium secara real-time via jaringan nirkabel dan dashboard interaktif.',
      konten: 'Internet of Things (IoT) membuka wawasan siswa mengenai konektivitas perangkat keras ke internet. Proyek ini mendemokan pemanfaatan sensor DHT22 dengan ESP32 untuk mengirimkan data telemetri suhu secara periodik.',
      penulis: 'Divisi Robotik RPL',
      tanggal: '2025-02-18',
      gambar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-robot',
    },
  ],
}

const collectionKeys = ['kegiatan', 'jadwal', 'pengumuman', 'pendaftar', 'galeri', 'artikel']

// Kolom yang diizinkan pada tabel `pendaftar` Supabase.
// Field di luar daftar ini (mis. field form tambahan) tidak dikirim agar INSERT tidak gagal.
const PENDAFTAR_SYNC_FIELDS = [
  'id',
  'nomorRegistrasi',
  'nama',
  'kelas',
  'nohp',
  'email',
  'bidang',
  'alasanMasuk',
  'karyaPortofolio',
  'status',
  'tanggalDaftar',
]

// Buat nomor registrasi unik berformat RPL-XXXXXX yang tidak bentrok
// dengan pendaftar yang sudah ada.
function generateNomorRegistrasi(existing = []) {
  const taken = new Set(existing.map((p) => p?.nomorRegistrasi).filter(Boolean))
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  for (let attempt = 0; attempt < 50; attempt += 1) {
    let suffix = ''
    for (let i = 0; i < 6; i += 1) {
      suffix += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    const candidate = `RPL-${suffix}`
    if (!taken.has(candidate)) return candidate
  }
  // Fallback deterministik yang praktis mustahil bentrok
  return `RPL-${Date.now().toString(36).toUpperCase().slice(-6)}`
}

function createDefaultData() {
  return JSON.parse(JSON.stringify(defaultData))
}

function normalizeData(saved) {
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return createDefaultData()

  const defaults = createDefaultData()
  return {
    ...defaults,
    ...saved,
    ...Object.fromEntries(
      collectionKeys.map((key) => [key, Array.isArray(saved[key]) ? saved[key] : defaults[key]]),
    ),
    kontak: { ...defaults.kontak, ...(saved.kontak && typeof saved.kontak === 'object' ? saved.kontak : {}) },
    sosmed: { ...defaults.sosmed, ...(saved.sosmed && typeof saved.sosmed === 'object' ? saved.sosmed : {}) },
    groupLinks: { ...defaults.groupLinks, ...(saved.groupLinks && typeof saved.groupLinks === 'object' ? saved.groupLinks : {}) },
  }
}

function loadData() {
  try {
    if (typeof window === 'undefined') return createDefaultData()
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? normalizeData(JSON.parse(raw)) : createDefaultData()
  } catch (e) {
    console.error('Gagal memuat data dari localStorage', e)
    return createDefaultData()
  }
}

export function DataProvider({ children }) {
  const [data, setData] = useState(loadData)
  const { user } = useAuth()
  const [newPendaftarCount, setNewPendaftarCount] = useState(0)
  const READ_KEY = STORAGE_KEY + ':read_pendaftar'
  const loadReadSet = () => {
    try {
      if (typeof window === 'undefined') return new Set()
      const raw = window.localStorage.getItem(READ_KEY)
      return raw ? new Set(JSON.parse(raw)) : new Set()
    } catch (e) {
      return new Set()
    }
  }
  const [readPendaftarIds, setReadPendaftarIds] = useState(loadReadSet)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.error('Gagal menyimpan data ke localStorage', e)
    }
    try {
      const ids = new Set((data.pendaftar || []).map((p) => String(p.id)))
      const unread = [...ids].filter((id) => !readPendaftarIds.has(id)).length
      setNewPendaftarCount(unread)
    } catch (e) {
      // ignore
    }
  }, [data, readPendaftarIds])

  useEffect(() => {
    if (!supabase) return undefined

    let active = true
    supabase
      .from('site_data')
      .select('data')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data: remoteData, error }) => {
        if (!error && remoteData?.data && active) setData(normalizeData(remoteData.data))
      })

    return () => {
      active = false
    }
  }, [])

  const saveToCloud = useCallback(
    (nextData) => {
      if (!supabase) return
      // Sinkronkan ke Supabase tanpa tergantung pada user agar perubahan dari
      // Admin Panel tetap disebarkan ke perangkat lain.
      supabase
        .from('site_data')
        .upsert({ id: 1, data: nextData, updated_at: new Date().toISOString() })
        .then(({ error }) => {
          if (error) console.error('Gagal menyinkronkan data ke Supabase', error)
        })
    },
    [],
  )

  // Helper: sinkronisasi pendaftar ke tabel terpisah di Supabase.
  // HANYA dipanggil dari addItem('pendaftar', ...) agar satu pendaftaran
  // selalu menghasilkan tepat satu INSERT ke Supabase.
  let lastPendaftarSync = null
  const syncPendaftarAdd = async (record) => {
    if (!supabase) return { ok: false, error: new Error('Supabase belum dikonfigurasi.') }
    const payload = PENDAFTAR_SYNC_FIELDS.reduce((acc, field) => {
      if (record[field] !== undefined && record[field] !== null) acc[field] = record[field]
      return acc
    }, {})
    try {
      const { error } = await supabase.from('pendaftar').insert(payload)
      if (error) throw error
      return { ok: true }
    } catch (e) {
      console.error('Gagal menyimpan pendaftar ke Supabase', e)
      return { ok: false, error: e }
    }
  }

  const syncPendaftarUpdate = async (id, updated) => {
    if (!supabase) return { ok: false, error: new Error('Supabase belum dikonfigurasi.') }
    try {
      const { error } = await supabase.from('pendaftar').update(updated).eq('id', id)
      if (error) throw error
      return { ok: true }
    } catch (e) {
      console.error('Gagal memperbarui pendaftar di Supabase', e)
      return { ok: false, error: e }
    }
  }

  const syncPendaftarRemove = async (id) => {
    if (!supabase) return { ok: false, error: new Error('Supabase belum dikonfigurasi.') }
    try {
      const { error } = await supabase.from('pendaftar').delete().eq('id', id)
      if (error) throw error
      return { ok: true }
    } catch (e) {
      console.error('Gagal menghapus pendaftar di Supabase', e)
      return { ok: false, error: e }
    }
  }

  // Saat inisialisasi, ambil data pendaftar dari tabel Supabase jika tersedia
  useEffect(() => {
    if (!supabase) return undefined
    let active = true
    supabase
      .from('pendaftar')
      .select('*')
      .then(({ data: rows, error }) => {
        if (!error && rows && active) {
          setData((prev) => ({ ...prev, pendaftar: Array.isArray(rows) ? rows : prev.pendaftar }))
        }
      })
    return () => {
      active = false
    }
  }, [])

  const commit = (updater) => {
    setData((prev) => {
      const next = updater(prev)
      saveToCloud(next)
      return next
    })
  }

  // Generic CRUD helpers
  const addItem = (key, item) => {
    if (!collectionKeys.includes(key)) return null
    const id = item.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const record = { ...item, id }
    commit((prev) => {
      const next = {
        ...prev,
        [key]: [record, ...prev[key]],
      }
      // Jika menambah kegiatan, juga tambahkan ke galeri agar tampil di halaman Galeri
      if (key === 'kegiatan') {
        const galItem = { id, judul: item.judul || '', bidang: item.bidang || 'Umum', gambar: item.gambar || '' }
        next.galeri = [galItem, ...prev.galeri]
      }
      return next
    })
    // Jika menambah pendaftar, lakukan SATU insert ke tabel Supabase terpisah
    if (key === 'pendaftar') {
      const syncPromise = syncPendaftarAdd(record)
      lastPendaftarSync = syncPromise
      const idStr = String(record.id)
      if (!readPendaftarIds.has(idStr)) {
        setNewPendaftarCount((c) => c + 1)
      }
    }
    return id
  }

  const registerPendaftar = async (payload) => {
    const id = payload.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const record = {
      ...payload,
      id,
      nomorRegistrasi: payload.nomorRegistrasi || generateNomorRegistrasi(data.pendaftar || []),
      status: payload.status || 'Menunggu Verifikasi',
      tanggalDaftar: payload.tanggalDaftar || new Date().toISOString().slice(0, 10),
      bidang: payload.bidang || 'Robotic',
    }

    // addItem('pendaftar', ...) menangani: commit lokal + SATU kali
    // syncPendaftarAdd ke Supabase. Tunggu hasilnya agar error bisa dilaporkan
    // tanpa melakukan INSERT kedua.
    const localResult = addItem('pendaftar', record)
    let remoteError = null
    if (supabase) {
      const result = await (lastPendaftarSync || Promise.resolve({ ok: true }))
      if (!result?.ok) remoteError = result?.error || new Error('Gagal menyimpan pendaftaran.')
    } else {
      remoteError = new Error('Supabase belum dikonfigurasi.')
    }

    return { ok: !remoteError, error: remoteError, id: localResult ?? id, nomorRegistrasi: record.nomorRegistrasi }
  }

  const updateItem = (key, id, updated) => {
    if (!collectionKeys.includes(key)) return
    commit((prev) => {
      const next = {
        ...prev,
        [key]: prev[key].map((item) => (item.id === id ? { ...item, ...updated } : item)),
      }
      // Jika mengubah kegiatan, sinkronkan perubahan ke galeri
      if (key === 'kegiatan') {
        next.galeri = prev.galeri.map((g) =>
          g.id === id ? { ...g, judul: updated.judul ?? g.judul, bidang: updated.bidang ?? g.bidang, gambar: updated.gambar ?? g.gambar } : g,
        )
      }
      return next
    })
    // Jika mengubah pendaftar, perbarui juga di Supabase
    if (key === 'pendaftar') syncPendaftarUpdate(id, updated)
  }

  const removeItem = (key, id) => {
    if (!collectionKeys.includes(key)) return
    commit((prev) => {
      const next = {
        ...prev,
        [key]: prev[key].filter((item) => item.id !== id),
      }
      // Jika menghapus kegiatan, hapus juga dari galeri
      if (key === 'kegiatan') {
        next.galeri = prev.galeri.filter((g) => g.id !== id)
      }
      return next
    })
    // Jika menghapus pendaftar, hapus juga dari Supabase
    if (key === 'pendaftar') syncPendaftarRemove(id)
  }

  const persistReadPendaftar = (ids) => {
    try {
      const arr = Array.from(ids)
      window.localStorage.setItem(READ_KEY, JSON.stringify(arr))
    } catch (e) {
      // ignore
    }
  }

  const markAllPendaftarRead = () => {
    const ids = new Set((data.pendaftar || []).map((p) => String(p.id)))
    setReadPendaftarIds(ids)
    persistReadPendaftar(ids)
    setNewPendaftarCount(0)
  }

  const clearPendaftarNotif = () => markAllPendaftarRead()

  // Kontak & sosmed
  const updateKontak = (kontak) => commit((prev) => ({ ...prev, kontak }))
  const updateSosmed = (sosmed) => commit((prev) => ({ ...prev, sosmed }))

  // Reset semua data ke default
  const resetData = () => {
    const next = createDefaultData()
    setData(next)
    saveToCloud(next)
  }

  const value = {
    data,
    addItem,
    registerPendaftar,
    updateItem,
    removeItem,
    updateKontak,
    updateSosmed,
    resetData,
    newPendaftarCount,
    clearPendaftarNotif,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(DataContext)

