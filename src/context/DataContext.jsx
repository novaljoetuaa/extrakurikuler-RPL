import { createContext, useContext, useEffect, useState } from 'react'

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
      gambar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      judul: 'Workshop Web',
      gambar: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      judul: 'Sesi Desain Grafis',
      gambar: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      judul: 'Uji Coba Robot',
      gambar: 'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      judul: 'Tim Pengembang Web',
      gambar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      judul: 'Karya Desain Siswa',
      gambar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 7,
      judul: 'Praktik Sensor Robot',
      gambar: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 8,
      judul: 'Kolaborasi Antarbidang',
      gambar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    },
  ],
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return { ...defaultData, ...JSON.parse(raw) }
    }
  } catch (e) {
    console.error('Gagal memuat data dari localStorage', e)
  }
  return defaultData
}

export function DataProvider({ children }) {
  const [data, setData] = useState(loadData)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.error('Gagal menyimpan data ke localStorage', e)
    }
  }, [data])

  // Generic CRUD helpers
  const addItem = (key, item) => {
    setData((prev) => ({
      ...prev,
      [key]: [{ ...item, id: Date.now() }, ...prev[key]],
    }))
  }

  const updateItem = (key, id, updated) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].map((item) => (item.id === id ? { ...item, ...updated } : item)),
    }))
  }

  const removeItem = (key, id) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item.id !== id),
    }))
  }

  // Kontak & sosmed
  const updateKontak = (kontak) => setData((prev) => ({ ...prev, kontak }))
  const updateSosmed = (sosmed) => setData((prev) => ({ ...prev, sosmed }))

  // Reset semua data ke default
  const resetData = () => {
    setData(defaultData)
  }

  const value = {
    data,
    addItem,
    updateItem,
    removeItem,
    updateKontak,
    updateSosmed,
    resetData,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(DataContext)

